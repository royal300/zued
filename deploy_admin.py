import paramiko
import os
import sys

# Project root (where deploy_admin.py lives)
PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))
LOCAL_DIST = os.path.join(PROJECT_ROOT, 'dist')
LOCAL_API = os.path.join(PROJECT_ROOT, 'api')

VPS_HOST = os.environ.get('VPS_HOST', '93.127.206.52')
VPS_USER = os.environ.get('VPS_USER', 'root')
# Prefer env var for password: export VPS_PASS='yourpassword'
VPS_PASS = os.environ.get('VPS_PASS', 'Royal300@2026')

def main():
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(VPS_HOST, username=VPS_USER, password=VPS_PASS)

    # 1. Sync Frontend from GitHub
    print('\n=== Syncing Frontend from GitHub ===')
    run_ssh(client, 'cd /var/www/zued && git fetch origin && git reset --hard origin/main')

    # 2. Build Frontend on VPS
    print('\n=== Building Frontend on VPS ===')
    run_ssh(client, 'cd /var/www/zued && npm install && npm run build')

    # 3. Sync Backend (API) from GitHub
    print('\n=== Syncing Backend (API) from GitHub ===')
    run_ssh(client, 'cd /var/www/zued-api && git fetch origin && git reset --hard origin/main')
    run_ssh(client, 'cd /var/www/zued-api/api && npm install --omit=dev')
    
    # 4. Finalize & Restart
    print('\n=== Restarting Services ===')
    run_ssh(client, 'mkdir -p /var/www/zued/uploads && chmod 755 /var/www/zued/uploads')
    # Use absolute path for PM2 to avoid confusion
    run_ssh(client, 'pm2 delete zued-api || true')
    run_ssh(client, 'cd /var/www/zued-api/api && pm2 start server.js --name zued-api')
    run_ssh(client, 'pm2 save')

    # 5. Verify API health
    out, _ = run_ssh(client, 'curl -s http://127.0.0.1:3001/api/health')
    print('Health check:', out)

    client.close()
    print('\n=== Deploy complete ===')

def upload_dir(sftp, local_dir, remote_dir):
    try:
        sftp.mkdir(remote_dir)
    except Exception:
        pass
    for item in os.listdir(local_dir):
        local_path = os.path.join(local_dir, item)
        remote_path = remote_dir + '/' + item
        if os.path.isfile(local_path):
            sftp.put(local_path, remote_path)
            print(f'  Uploaded: {item}')
        elif os.path.isdir(local_path):
            upload_dir(sftp, local_path, remote_path)

def run_ssh(client, cmd):
    print(f'SSH: {cmd[:80]}...' if len(cmd) > 80 else f'SSH: {cmd}')
    stdin, stdout, stderr = client.exec_command(cmd)
    out = stdout.read().decode()
    err = stderr.read().decode()
    if out: print('OUT:', out[:400])
    if err: print('ERR:', err[:400])
    return out, err


if __name__ == '__main__':
    main()
