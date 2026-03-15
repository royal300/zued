import paramiko
import re
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

    print('\n=== Verifying Upload Directory on VPS ===')
    run_ssh(client, 'ls -d /var/www/zued-api/api/uploads/')

    # 1. Read the config
    print('\n=== Reading Nginx Config ===')
    out, err = run_ssh(client, 'cat /etc/nginx/sites-enabled/zued.online')
    if not out:
        print('Could not find zued config.')
        return

    # 2. Robust Regex Replacement
    # We want to find: location /uploads/ { ... alias /.../; ... }
    # and replace the alias line.
    
    pattern = r'(location\s+/uploads/\s*\{[^}]*alias\s+)[^;]+(;)'
    replacement = r'\1/var/www/zued-api/api/uploads/\2'
    
    new_config = re.sub(pattern, replacement, out, flags=re.DOTALL)
    
    if new_config == out:
        print('Regex match failed - could not find location /uploads/ with alias.')
        # Try a simpler replacement if regex failed
        print('Falling back to direct string replacement...')
        new_config = out.replace('/var/www/zued/uploads/', '/var/www/zued-api/api/uploads/')
    
    if new_config == out:
        print('No changes made. Alias might already be correct.')
    else:
        print('\n=== Uploading Patched Config ===')
        with open('zued_nginx_fix', 'w') as f:
            f.write(new_config)
        sftp = client.open_sftp()
        sftp.put('zued_nginx_fix', '/etc/nginx/sites-enabled/zued.online')
        sftp.close()
        os.remove('zued_nginx_fix')
        
        print('\n=== Testing and Restarting Nginx ===')
        run_ssh(client, 'nginx -t')
        run_ssh(client, 'systemctl reload nginx')

    client.close()

if __name__ == "__main__":
    main()
