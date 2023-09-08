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
     server your-server-ip;
  }
  upstream backend {
    server your-backend-id;
  }

}
```

## 4th: Create an EC2 instance for the front end.
## 5th: Create an EC2 instance for Backend

