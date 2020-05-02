|      | [на сторінку курсу Програмна інженеія в системах управління](../README.md) |
| ---- | ------------------------------------------------------------ |
|      |                                                              |

# Встановлення та налаштування пакетів

## MySQL (MariaDB)

### Встановлення

У новому Raspbian замість MySQL використовується [MariaDB](https://mariadb.org/) яка сумісна з MySQL. [Тут](https://www.raspberrypi.org/forums/viewtopic.php?t=198114) про це говориться

https://pimylifeup.com/raspberry-pi-mysql/

1. Оновлення

   ```bash
   sudo apt update
   sudo apt upgrade
   ```

**2.** Встановлення:  The next step is to install the MySQL server software to your Raspberry Pi.

Installing MySQL to the Raspberry Pi is a simple process and can be done with the following command.

```
sudo apt install mariadb-server
```

**3.** With the MySQL server software installed to the Raspberry Pi, we will now need to secure it by setting a password for the “**root**” user.

By default, MySQL is installed without any password set up meaning you can access the MySQL server without any authentication.

Run the following command to begin the MySQL securing process.

```
sudo mysql_secure_installation
```

Just follow the prompts to set a password for the root user and to secure your MySQL installation.

For a more secure installation, you should answer “**Y**” to all prompts when asked to answer “**Y**” or “**N**“. These prompts will remove features that allows someone to gain access to the server easier.

Make sure you write down the password you set during this process as we will need to use it to access the MySQL server and create databases and  users for software such as WordPress or PHPMyAdmin.

**4.** Now if you want to access your Raspberry Pi’s MySQL server and start  making changes to your databases, you can enter the following command.

```
sudo mysql -u root -p
```

**5.** You will be prompted to enter the password that we just created in **step 3** for MySQL’s root user.

**Note:** Like most Linux password inputs, the text will not show up as you type.

**6.** You can now enter MYSQL commands to create, alter, and delete  databases. Through this interface, you can also create or delete users  and assign them the rights to manage any database.

**7.** There are two different ways you can quit out of the MYSQL command line, the first of those is to type “**quit**” into the MySQL interface.

The other way of quitting out of the MYSQL command line is to press **Ctrl + D**.

**8.** At this point, you will now have successfully setup MySQL on your  Raspberry Pi. Our next few sections will go into making better use of  this database.

### Налаштування віддаленого доступу

[звідси](https://mariadb.com/kb/en/configuring-mariadb-for-remote-client-access/)

- Відкрити налаштування конфігурації MariaDB

```
sudo nano /etc/mysql/mariadb.conf.d/50-server.cnf
```

- закоментувати `bind-address` виставивши `#`

```
# bind-address		= 127.0.0.1
```

- зберегти (`CTRL+X`)

- виставити сервіс на автостарт

  ```
  sudo update-rc.d mysql defaults
  ```

- перезавантажити RPI

- перевірити чи очікує з'єднання

```
sudo netstat -nap | grep mysql
```

В адресах не повинна з'являтися адреса `127.0.0.1`

 

|      | [на сторінку курсу Програмна інженеія в системах управління](../README.md) |
| ---- | ------------------------------------------------------------ |
|      |                                                              |