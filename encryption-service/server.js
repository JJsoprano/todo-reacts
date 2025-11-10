const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const mongoose = require('mongoose');
const helmet = require('helmet');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:3000', 'https://jjsoprano.github.io'],
  credentials: true
}));
app.use(express.json());

// 🔐 ENCRYPTION SETUP
const ENCRYPTION_KEY_PATH = path.join(__dirname, 'encryption.key');
const ALGORITHM = 'aes-256-gcm';

// Generate or load encryption key
function getEncryptionKey() {
  try {
    if (fs.existsSync(ENCRYPTION_KEY_PATH)) {
      return fs.readFileSync(ENCRYPTION_KEY_PATH);
    } else {
      const key = crypto.randomBytes(32);
      fs.writeFileSync(ENCRYPTION_KEY_PATH, key);
      console.log('🔑 Generated new encryption key');
      return key;
    }
  } catch (error) {
    console.error('❌ Error with encryption key:', error);
    throw error;
  }
}

const ENCRYPTION_KEY = getEncryptionKey();

// 🔐 ENCRYPTION FUNCTIONS
function encrypt(text) {
  if (!text || typeof text !== 'string') return text;
  
  try {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipher('aes-256-cbc', ENCRYPTION_KEY);
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    return iv.toString('hex') + ':' + encrypted;
  } catch (error) {
    console.error('❌ Encryption error:', error);
    return text; // Return original text if encryption fails
  }
}

function decrypt(encryptedText) {
  if (!encryptedText || typeof encryptedText !== 'string' || !encryptedText.includes(':')) {
    return encryptedText; // Return as-is if not encrypted format
  }
  
  try {
    const [ivHex, encrypted] = encryptedText.split(':');
    const decipher = crypto.createDecipher('aes-256-cbc', ENCRYPTION_KEY);
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  } catch (error) {
    console.error('❌ Decryption error:', error);
    return encryptedText; // Return encrypted text if decryption fails
  }
}

// 📊 MONGODB CONNECTION
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/todoapp')
  .then(() => console.log('🍃 Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// 📝 TODO SCHEMA (same as your backend)
const todoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  category: { type: String, default: 'General' },
  dueDate: { type: Date },
  tags: [String],
  description: String
}, {
  timestamps: true
});

const Todo = mongoose.model('Todo', todoSchema);

// 🌐 API ROUTES

// Health check
app.get('/', (req, res) => {
  res.json({ 
    status: 'healthy',
    service: 'Todo Encryption Service',
    encryption: 'AES-256-CBC',
    timestamp: new Date().toISOString()
  });
});

// Get all todos (with decryption)
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    
    // Decrypt the todo text before sending
    const decryptedTodos = todos.map(todo => ({
      ...todo.toObject(),
      text: decrypt(todo.text),
      description: decrypt(todo.description)
    }));
    
    console.log(`📖 Retrieved ${decryptedTodos.length} todos (decrypted)`);
    res.json(decryptedTodos);
  } catch (error) {
    console.error('❌ Error fetching todos:', error);
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// Create new todo (with encryption)
app.post('/todos', async (req, res) => {
  try {
    const { text, priority, category, dueDate, tags, description } = req.body;
    
    if (!text || text.trim() === '') {
      return res.status(400).json({ error: 'Todo text is required' });
    }
    
    // Encrypt sensitive fields
    const encryptedTodo = new Todo({
      text: encrypt(text),
      priority: priority || 'Medium',
      category: category || 'General',
      dueDate: dueDate ? new Date(dueDate) : undefined,
      tags: tags || [],
      description: description ? encrypt(description) : undefined,
      completed: false
    });
    
    const savedTodo = await encryptedTodo.save();
    
    // Return decrypted version to frontend
    const responseData = {
      ...savedTodo.toObject(),
      text: decrypt(savedTodo.text),
      description: decrypt(savedTodo.description)
    };
    
    console.log(`✅ Created encrypted todo: "${text}"`);
    res.status(201).json(responseData);
  } catch (error) {
    console.error('❌ Error creating todo:', error);
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

// Update todo (with encryption)
app.patch('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    // Encrypt text fields if they're being updated
    if (updates.text) {
      updates.text = encrypt(updates.text);
    }
    if (updates.description) {
      updates.description = encrypt(updates.description);
    }
    
    const updatedTodo = await Todo.findByIdAndUpdate(id, updates, { new: true });
    
    if (!updatedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    // Return decrypted version
    const responseData = {
      ...updatedTodo.toObject(),
      text: decrypt(updatedTodo.text),
      description: decrypt(updatedTodo.description)
    };
    
    console.log(`🔄 Updated todo: ${id}`);
    res.json(responseData);
  } catch (error) {
    console.error('❌ Error updating todo:', error);
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

// Delete todo
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findByIdAndDelete(id);
    
    if (!deletedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    console.log(`🗑️ Deleted todo: ${id}`);
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting todo:', error);
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

// Encryption status endpoint
app.get('/encryption/status', (req, res) => {
  res.json({
    encryption: 'enabled',
    algorithm: ALGORITHM,
    keyStatus: fs.existsSync(ENCRYPTION_KEY_PATH) ? 'loaded' : 'missing',
    timestamp: new Date().toISOString()
  });
});

// Test encryption endpoint
app.post('/encryption/test', (req, res) => {
  const { text } = req.body;
  
  if (!text) {
    return res.status(400).json({ error: 'Text is required for testing' });
  }
  
  try {
    const encrypted = encrypt(text);
    const decrypted = decrypt(encrypted);
    
    res.json({
      original: text,
      encrypted: encrypted,
      decrypted: decrypted,
      success: text === decrypted
    });
  } catch (error) {
    res.status(500).json({ error: 'Encryption test failed', details: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🔐 Encryption Service running on port ${PORT}`);
  console.log(`🔑 Encryption: AES-256-CBC with secure key`);
  console.log(`🌐 CORS enabled for React frontend`);
  console.log(`📊 MongoDB connected for secure storage`);
});