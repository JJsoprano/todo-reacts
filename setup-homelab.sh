#!/bin/bash

# Self-Healing Home Lab Setup Script
# This script sets up monitoring and auto-healing for your Todo app

echo "🏠 Setting up Self-Healing Home Lab for Todo App..."

# Create monitoring directory
mkdir -p monitoring

# Create Prometheus config
cat > monitoring/prometheus.yml << 'EOF'
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'todo-frontend'
    static_configs:
      - targets: ['localhost:3000']
    metrics_path: '/metrics'
    scrape_interval: 30s

  - job_name: 'todo-backend'
    static_configs:
      - targets: ['localhost:5000']
    metrics_path: '/metrics'
    scrape_interval: 30s

  - job_name: 'mongodb'
    static_configs:
      - targets: ['localhost:27017']

  - job_name: 'node-exporter'
    static_configs:
      - targets: ['localhost:9100']
EOF

# Create Grafana dashboard config
cat > monitoring/grafana-dashboard.json << 'EOF'
{
  "dashboard": {
    "title": "Todo App Self-Healing Dashboard",
    "panels": [
      {
        "title": "Frontend Health",
        "type": "stat",
        "targets": [
          {
            "expr": "up{job=\"todo-frontend\"}"
          }
        ]
      },
      {
        "title": "Backend Health", 
        "type": "stat",
        "targets": [
          {
            "expr": "up{job=\"todo-backend\"}"
          }
        ]
      },
      {
        "title": "Database Health",
        "type": "stat", 
        "targets": [
          {
            "expr": "up{job=\"mongodb\"}"
          }
        ]
      }
    ]
  }
}
EOF

# Create health check script
cat > health-check.sh << 'EOF'
#!/bin/bash

# Health check and auto-healing script
LOG_FILE="/var/log/todo-health.log"

log() {
    echo "$(date): $1" | tee -a $LOG_FILE
}

check_service() {
    local service_name=$1
    local url=$2
    local container_name=$3
    
    if curl -f $url > /dev/null 2>&1; then
        log "✅ $service_name is healthy"
        return 0
    else
        log "❌ $service_name is down! Attempting restart..."
        docker restart $container_name
        sleep 10
        
        if curl -f $url > /dev/null 2>&1; then
            log "✅ $service_name restored successfully"
            # Send success notification (optional)
            # curl -X POST https://your-webhook-url -d "Service $service_name restored"
        else
            log "🚨 $service_name failed to restart! Manual intervention required"
            # Send alert notification
            # curl -X POST https://your-alert-webhook -d "CRITICAL: $service_name failed to restart"
        fi
    fi
}

# Check all services
check_service "Frontend" "http://localhost:3000/health" "mytodo_frontend_1"
check_service "Backend" "http://localhost:5000/" "mytodo_backend_1"
check_service "Database" "http://localhost:27017" "mytodo_mongo_1"

# Check disk space
DISK_USAGE=$(df / | awk 'NR==2 {print $5}' | sed 's/%//')
if [ $DISK_USAGE -gt 80 ]; then
    log "⚠️ Disk usage is ${DISK_USAGE}% - cleaning up..."
    docker system prune -f
fi

# Check memory usage
MEMORY_USAGE=$(free | grep Mem | awk '{printf "%.0f", $3/$2 * 100.0}')
if [ $MEMORY_USAGE -gt 85 ]; then
    log "⚠️ Memory usage is ${MEMORY_USAGE}% - restarting services..."
    docker-compose restart
fi
EOF

chmod +x health-check.sh

# Create systemd service for auto-healing
cat > /etc/systemd/system/todo-health.service << 'EOF'
[Unit]
Description=Todo App Health Monitor
After=docker.service

[Service]
Type=simple
ExecStart=/path/to/your/health-check.sh
Restart=always
RestartSec=60

[Install]
WantedBy=multi-user.target
EOF

# Create systemd timer
cat > /etc/systemd/system/todo-health.timer << 'EOF'
[Unit]
Description=Run Todo Health Check every 2 minutes
Requires=todo-health.service

[Timer]
OnCalendar=*:0/2
Persistent=true

[Install]
WantedBy=timers.target
EOF

echo "✅ Self-healing setup complete!"
echo ""
echo "🚀 To start your self-healing lab:"
echo "1. Run: docker-compose up -d"
echo "2. Enable health monitoring: sudo systemctl enable todo-health.timer"
echo "3. Start monitoring: sudo systemctl start todo-health.timer" 
echo "4. View logs: tail -f /var/log/todo-health.log"
echo ""
echo "📊 Access monitoring:"
echo "- App: http://localhost:3000"
echo "- API: http://localhost:5000" 
echo "- Uptime Kuma: http://localhost:3001"
echo "- MongoDB: localhost:27017"