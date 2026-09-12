@echo off
setlocal
cd /d "%~dp0.."

powershell -NoProfile -ExecutionPolicy Bypass -Command "$client = $null; $open = $false; try { $client = New-Object Net.Sockets.TcpClient('127.0.0.1', 5173); $open = $client.Connected } catch {} finally { if ($client) { $client.Close() } }; if (-not $open) { Start-Process cmd.exe -ArgumentList '/c', 'npm run dev -- --host 127.0.0.1' -WorkingDirectory '%~dp0..' }; for ($i = 0; $i -lt 40; $i++) { try { $client = New-Object Net.Sockets.TcpClient('127.0.0.1', 5173); if ($client.Connected) { $client.Close(); break } } catch {} Start-Sleep -Milliseconds 250 }; Start-Process 'http://127.0.0.1:5173/'"

endlocal