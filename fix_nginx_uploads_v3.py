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

    # 1. Read the config
    print('\n=== Reading Nginx Config ===')
    out, err = run_ssh(client, 'cat /etc/nginx/sites-enabled/zued.online')
    if not out:
        print('Could not find zued config.')
        return

    # 2. Add ^~ to the /uploads/ location to prevent regex override
    new_config = out.replace('location /uploads/ {', 'location ^~ /uploads/ {')
    
    if new_config == out:
        print('Could not find location /uploads/ { or it already has ^~.')
    else:
        print('\n=== Uploading Patched Config with ^~ ===')
        with open('zued_nginx_final', 'w') as f:
            f.write(new_config)
        sftp = client.open_sftp()
        sftp.put('zued_nginx_final', '/etc/nginx/sites-enabled/zued.online')
        sftp.close()
        os.remove('zued_nginx_final')
        
        print('\n=== Testing and Restarting Nginx ===')
        run_ssh(client, 'nginx -t')
        run_ssh(client, 'systemctl reload nginx')

    client.close()

if __name__ == "__main__":
    main()
