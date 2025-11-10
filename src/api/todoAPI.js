// Production/Development API configuration with ENCRYPTION SERVICE
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://todo-reacts.onrender.com'  // ✅ Your real Render backend URL (TODO: Deploy encryption service)
  : 'http://localhost:5001';  // 🔐 Encryption service on port 5001

class TodoAPI {
  /**
   * Fetches all todos from the API.
   * Returns a promise that resolves to an array of todos if successful, or rejects with an error if unsuccessful.
   * @returns {Promise<Array<any>>}
   * @throws {Error}
   */
  async fetchTodos() {
    try {
      const response = await fetch(`${API_BASE_URL}/todos`);  // 🔐 Updated to /todos for encryption service
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  }

  /**
   * Creates a new todo item in the API.
   * Returns a promise that resolves to the newly created todo item if successful, or rejects with an error if unsuccessful.
   * @param {string} text - The text of the new todo item.
   * @param {string} [priority='Medium'] - The priority of the new todo item.
   * @returns {Promise<any>}
   * @throws {Error}
   */
  async createTodo(text, priority = 'Medium') {
    try {
      const response = await fetch(`${API_BASE_URL}/todos`, {  // 🔐 Updated to /todos for encryption service
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, priority }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating todo:', error);
      throw error;
    }
  }

  /**
   * Updates a todo item with the given id and updates using the API.
   * Returns a promise that resolves to the updated todo item if successful, or rejects with an error if unsuccessful.
   * @param {number|string} id - The id of the todo item to be updated.
   * @param {Object} updates - An object containing the updated fields and their respective values.
   * @returns {Promise<any>}
   * @throws {Error}
   */
  async updateTodo(id, updates) {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {  // 🔐 Updated to /todos for encryption service
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    }
  }

  /**
   * Deletes a todo item with the given id using the API.
   * Returns a promise that resolves to an empty object if successful, or rejects with an error if unsuccessful.
   * @param {number|string} id - The id of the todo item to be deleted.
   * @returns {Promise<Object>}
   * @throws {Error}
   */
  async deleteTodo(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {  // 🔐 Updated to /todos for encryption service
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  }

  /**
   * Checks the health of the API by making a GET request to the /tasks endpoint.
   * Returns a promise that resolves to an empty object if the API is healthy, or rejects with an error if the API is not healthy.
   * @returns {Promise<Object>}
   * @throws {Error}
   */
  async healthCheck() {
    try {
      const response = await fetch(`${API_BASE_URL}/`);  // 🔐 Updated to root endpoint for encryption service health check
      return await response.json();
    } catch (error) {
      console.error('API health check failed:', error);
      throw error;
    }
  }
}

export default new TodoAPI();