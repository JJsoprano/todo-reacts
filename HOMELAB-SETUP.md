# 🏠 Self-Healing Home Lab Setup Guide

## Quick Start (Docker Compose - Recommended)

### Prerequisites
- Docker Desktop installed
- Git installed
- At least 4GB RAM available

### 1. Clone and Setup
```bash
git clone https://github.com/JJsoprano/todo-reacts.git
cd todo-reacts
```

### 2. Start Self-Healing Stack
```bash
# Start all services with auto-restart
docker-compose up -d

# View logs
docker-compose logs -f
```

### 3. Access Your Services
- **Todo App**: http://localhost:3000
- **API**: http://localhost:5000
- **Database**: localhost:27017
- **Monitoring**: http://localhost:3001

### 4. Enable Automated Health Monitoring

#### On Windows:
```powershell
# Run PowerShell as Administrator
# Create scheduled task to run every 5 minutes
$Action = New-ScheduledTaskAction -Execute "PowerShell.exe" -Argument "-File C:\Users\joshu\react\mytodo\health-monitor.ps1"
$Trigger = New-ScheduledTaskTrigger -RepetitionInterval (New-TimeSpan -Minutes 5) -Once -At (Get-Date)
Register-ScheduledTask -TaskName "TodoHealthMonitor" -Action $Action -Trigger $Trigger
```

#### On Linux/Mac:
```bash
# Make script executable
chmod +x health-check.sh

# Add to crontab (runs every 2 minutes)
echo "*/2 * * * * /path/to/your/health-check.sh" | crontab -
```

## 🔧 Self-Healing Features

### Automatic Recovery
- **Container Failures**: Containers restart automatically
- **Health Checks**: Services are monitored every 30 seconds
- **Resource Management**: Auto-cleanup when disk/memory is high
- **Database Persistence**: MongoDB data survives container restarts

### Monitoring & Alerts
- **Uptime Kuma**: Visual monitoring dashboard
- **Health Endpoints**: Built-in health checks for all services
- **Log Monitoring**: Centralized logging
- **Resource Monitoring**: CPU, Memory, Disk usage tracking

### Scaling Options
- **Horizontal Scaling**: Add more frontend/backend replicas
- **Load Balancing**: Nginx distributes traffic
- **Database Clustering**: MongoDB replica sets (advanced)

## 🚀 Advanced Setups

### Kubernetes (Advanced)
```bash
# Apply Kubernetes manifests
kubectl apply -f k8s/

# Enable auto-scaling
kubectl autoscale deployment todo-frontend --cpu-percent=50 --min=1 --max=10
```

### Monitoring Stack
```bash
# Add Prometheus + Grafana
docker-compose -f docker-compose.yml -f docker-compose.monitoring.yml up -d
```

## 🔍 Troubleshooting

### Check Service Health
```bash
# Check all containers
docker-compose ps

# View specific service logs
docker-compose logs backend

# Check health status
curl http://localhost:5000/
curl http://localhost:3000/health
```

### Manual Recovery
```bash
# Restart specific service
docker-compose restart backend

# Rebuild and restart
docker-compose up -d --build

# Clean restart
docker-compose down && docker-compose up -d
```

## 📊 Monitoring Endpoints

- **Frontend Health**: `http://localhost:3000/health`
- **Backend Health**: `http://localhost:5000/`
- **Database Status**: `http://localhost:27017` (requires mongo client)
- **Uptime Dashboard**: `http://localhost:3001`

## 🎯 Benefits of This Setup

✅ **Zero Downtime**: Services auto-restart on failure  
✅ **Data Persistence**: Database survives restarts  
✅ **Resource Optimization**: Auto-cleanup prevents resource exhaustion  
✅ **Easy Scaling**: Add more replicas with one command  
✅ **Monitoring**: Visual dashboards and alerts  
✅ **Backup Ready**: Easy to add automated backups  

## 🔄 Maintenance

### Daily
- Check Uptime Kuma dashboard
- Review health logs

### Weekly  
- Update Docker images: `docker-compose pull && docker-compose up -d`
- Check disk space and clean up if needed

### Monthly
- Backup MongoDB data
- Update Docker Desktop
- Review and rotate logs

Your Todo app is now running in a self-healing environment! 🎉