# PowerShell Self-Healing Script for Windows Home Lab
# Run this as a scheduled task every 5 minutes

$LogFile = "C:\todo-health.log"
$DockerComposeFile = "C:\Users\joshu\react\mytodo\docker-compose.yml"

function Write-Log {
    param($Message)
    $Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    "$Timestamp - $Message" | Tee-Object -FilePath $LogFile -Append
}

function Test-Service {
    param(
        [string]$ServiceName,
        [string]$Url,
        [string]$ContainerName
    )
    
    try {
        $Response = Invoke-WebRequest -Uri $Url -TimeoutSec 10 -UseBasicParsing
        if ($Response.StatusCode -eq 200) {
            Write-Log "✅ $ServiceName is healthy"
            return $true
        }
    }
    catch {
        Write-Log "❌ $ServiceName is down! Error: $($_.Exception.Message)"
        Write-Log "🔄 Attempting to restart $ContainerName..."
        
        # Restart the container
        docker restart $ContainerName
        Start-Sleep -Seconds 15
        
        # Test again
        try {
            $Response = Invoke-WebRequest -Uri $Url -TimeoutSec 10 -UseBasicParsing
            if ($Response.StatusCode -eq 200) {
                Write-Log "✅ $ServiceName restored successfully"
                return $true
            }
        }
        catch {
            Write-Log "🚨 CRITICAL: $ServiceName failed to restart! Manual intervention required"
            # Send email alert (optional)
            # Send-MailMessage -To "your-email@domain.com" -Subject "Todo App Alert" -Body "$ServiceName is down"
            return $false
        }
    }
}

function Check-SystemResources {
    # Check disk space
    $DiskSpace = Get-WmiObject -Class Win32_LogicalDisk -Filter "DeviceID='C:'" | 
                 Select-Object -ExpandProperty FreeSpace
    $DiskTotal = Get-WmiObject -Class Win32_LogicalDisk -Filter "DeviceID='C:'" | 
                 Select-Object -ExpandProperty Size
    $DiskUsagePercent = [math]::Round((($DiskTotal - $DiskSpace) / $DiskTotal) * 100, 2)
    
    if ($DiskUsagePercent -gt 80) {
        Write-Log "⚠️ Disk usage is $DiskUsagePercent% - cleaning up Docker..."
        docker system prune -f
    }
    
    # Check memory
    $Memory = Get-WmiObject -Class Win32_OperatingSystem
    $MemoryUsagePercent = [math]::Round((($Memory.TotalVisibleMemorySize - $Memory.FreePhysicalMemory) / $Memory.TotalVisibleMemorySize) * 100, 2)
    
    if ($MemoryUsagePercent -gt 85) {
        Write-Log "⚠️ Memory usage is $MemoryUsagePercent% - restarting services..."
        Set-Location -Path (Split-Path $DockerComposeFile)
        docker-compose restart
    }
}

# Main health check routine
Write-Log "🏥 Starting health check..."

# Test all services
Test-Service -ServiceName "Frontend" -Url "http://localhost:3000" -ContainerName "mytodo_frontend_1"
Test-Service -ServiceName "Backend" -Url "http://localhost:5000" -ContainerName "mytodo_backend_1"

# Check system resources
Check-SystemResources

# Check if Docker is running
$DockerService = Get-Service -Name "Docker Desktop Service" -ErrorAction SilentlyContinue
if ($DockerService.Status -ne "Running") {
    Write-Log "🚨 Docker Desktop is not running! Starting..."
    Start-Service -Name "Docker Desktop Service"
}

Write-Log "✅ Health check complete"