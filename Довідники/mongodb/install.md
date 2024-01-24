# Install MongoDB 

## Raspberry PI



## Ubuntu

https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/

```
sudo systemctl start mongod
sudo systemctl enable mongod.service
```



# MongoDB Shell

https://www.mongodb.com/docs/mongodb-shell/

```
mongosh "mongodb://localhost:27017"
```

# MongoDB compass

https://www.mongodb.com/products/compass

# How To Configure Remote Access for MongoDB on Ubuntu 20.04

https://www.digitalocean.com/community/tutorials/how-to-configure-remote-access-for-mongodb-on-ubuntu-20-04#step-2-configuring-a-public-bindip

# Configuration File Options

https://www.mongodb.com/docs/manual/reference/configuration-options/

```
sudo nano /etc/mongod.conf
```



# Authentication

https://www.mongodb.com/docs/manual/core/security-internal-authentication/

## Use SCRAM to Authenticate Clients

https://www.mongodb.com/docs/manual/tutorial/configure-scram-client-authentication/

```
mongod --port 27017 --dbpath /var/lib/mongodb
```

```
db.createUser(
  {
    user: "local",
    pwd: passwordPrompt(), // or cleartext password
    roles: [
      { role: "userAdminAnyDatabase", db: "admin" },
      { role: "readWriteAnyDatabase", db: "admin" }
    ]
  }
)
```

