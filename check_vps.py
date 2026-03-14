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

    print('\n=== Finding Nginx Config File ===')
    run_ssh(client, "grep -l 'zued.online' /etc/nginx/sites-enabled/*")

    print('\n=== Nginx Conf.d ===')
    run_ssh(client, 'ls -la /etc/nginx/conf.d')
    run_ssh(client, 'cat /etc/nginx/conf.d/*.conf')


    client.close()

if __name__ == "__main__":
    main()
