# Create the load balancer, frontend, and BackEnd and make communication between them.

## 1st: Create A VPS server
Goto **VPC Network** click **Create VPC Network**
Setup VPC as your need. In my case these are my configurations:

    Name: `project-vpc`
    Subnet Name: `project-subnet`
    Subnet Region: `us-centeral1`
    Subnet IP range: `10.50.60.0/24`

For now I'm allowing all firewall rules
## 2nd: Create a Cloud NAT
![image](https://github.com/reduanmasud/gcp-app-lb-frontend-backend/assets/59122533/3cd0d710-5e17-4198-8d36-490b2656b5ad)

## 3rd: Create an EC2 instance for the load balancer.
Configuration
```
Name: loadbalancer
Region: us-central1 (lowa) <-- because we've created our vps & subnet on us-central1
Zone: us-central1-a
Allow Firewall HTTP & HTTPS traffic
Then goto Advanced option & set our subnet "project-subnet"
External IPv4 address: Ephemeral
```
**Now do the following after accessing the SSH**
Update the os
```sh
sudo apt update -y
```
Install nginx
```sh
sudo apt install nginx -y
```
Check if nginx is running
```sh
systemctl status nginx
```
**If no running then**
```sh
systemctl start nginx
systemctl enable nginx
```
To check, you can visit your public ip
**Now we need to congigure nginx.conf file as our need**
Goto nginx folder
```sh
cd /etc/nginx
```
To edit, you can use `vim` or any other editor you like
use replace all configure with the below;
```conf
events { }
http {
  server {
    listen 80;
    location / {
      proxy_pass http://frontend;
    }
    location /backend {
      proxy_pass http://backend;
    }
  }
  upstream frontend {
     server your-frontend-ip;
  }
  upstream backend {
    server your-backend-id;
  }

}
```

To check, if formate is ok run this command.
```sh
sudo nginx -t
```
To restart the server, use this command
```sh
sudo nginx -s reload
```

## 4th: Create an EC2 instance for the front end.
Configuration
```
Name: frontend
Region: us-central1 (lowa) <-- because we've created our vps & subnet on us-central1
Zone: us-central1-a
Allow Firewall HTTP & HTTPS traffic
Then go to the Advanced option & set our subnet "project-subnet"
External IPv4 address: None
```
Turn on the SSH terminal and do the following
Update & install some necessery apps;
```sh
sudo apt update -y
sudo apt install -y git ca-certificates curl gnupg
```
Download & Install nodejs GPG key
```sh
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
```
Create dev repo
```sh
NODE_MAJOR=20
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list
```
Install nodejs now
```sh
sudo apt-get update
sudo apt-get install nodejs -y
```
To make yarn work, use 
```sh
sudo corepack enable
```
Now clone this git repo then use these commands
```sh
cd frontend
yarn
yarn run build
yarn run preview --host --port 80
```
## 5th: Create an EC2 instance for Backend
Configuration
```
Name: backend
Region: us-central1 (lowa) <-- because we've created our vps & subnet on us-central1
Zone: us-central1-a
Allow Firewall HTTP & HTTPS traffic
Then go to the Advanced option & set our subnet "project-subnet"
External IPv4 address: None
```
Now do the following Install node js like we installed before. then clone the git repo. then goto backend and run on port 80.
