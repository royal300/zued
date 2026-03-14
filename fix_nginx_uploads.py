import paramiko
import os

VPS_HOST = '93.127.206.52'
VPS_USER = 'root'
VPS_PASS = 'Royal300@2026'

def run_ssh(client, cmd):
    print(f'SSH: {cmd}')
    stdin, stdout, stderr = client.exec_command(cmd)
    out = stdout.read().decode()
    err = stderr.read().decode()
    if out: print('OUT:', out)
    if err: print('ERR:', err)
    return out, err

def main():
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(VPS_HOST, username=VPS_USER, password=VPS_PASS)

    # 1. Read the config
    print('\n=== Reading Nginx Config ===')
    out, err = run_ssh(client, 'cat /etc/nginx/sites-enabled/zued.online')
    if not out:
        print('Could not find zued config in /etc/nginx/sites-enabled/zued.online')
        return

    # 2. Patch the alias
    new_config = out.replace('alias /var/www/zued/uploads/;', 'alias /var/www/zued-api/api/uploads/;')
    
    if new_config == out:
        print('Alias already correct or not found in expected format.')
    else:
        print('\n=== Uploading Patched Config ===')
        # Use a temporary file to write the config
        with open('zued_nginx_temp', 'w') as f:
            f.write(new_config)
        
        sftp = client.open_sftp()
        sftp.put('zued_nginx_temp', '/etc/nginx/sites-enabled/zued.online')
        sftp.close()
        os.remove('zued_nginx_temp')
        
        print('\n=== Testing and Restarting Nginx ===')
        run_ssh(client, 'nginx -t')
        run_ssh(client, 'systemctl reload nginx')

    client.close()

if __name__ == "__main__":
    main()
