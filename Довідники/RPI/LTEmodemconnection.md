# Підключення LTE модема (через  QMI interface) до Raspberry Pi 3 

https://www.jeffgeerling.com/blog/2022/using-4g-lte-wireless-modems-on-raspberry-pi

https://gist.github.com/miguelmota/8201618

https://opensource.com/article/17/7/nodered-raspberrypi-hardware

https://www.makeuseof.com/raspberry-pi-set-static-ip/

https://www.digitalocean.com/community/tutorials/how-to-use-systemctl-to-manage-systemd-services-and-units

### Hardware

LTE модем – Pantech UML 290 (Verizon)

Raspberry Pi 3

### Інструкція по підключенню

Підключення описаним методом можливе якщо модем на базі чіпсетів Qualcomm та підкримує інтерфейс Qualcomm Qualcomm MSM (QMI).

- [ ] Підключити USB модем до raspberry pi 

- [ ] У терміналі ввести команду `lsusb`

```
pi@raspberrypi:~ $ lsusb
Bus 001 Device 007: ID 106c:3718 Curitel Communications, Inc. PANTECH UML290
Bus 001 Device 004: ID 1532:010b Razer USA, Ltd Gaming Keyboard [Arctosa]
Bus 001 Device 003: ID 0424:ec00 Microchip Technology, Inc. (formerly SMSC) SMSC9512/9514 Fast Ethernet Adapter
Bus 001 Device 002: ID 0424:9514 Microchip Technology, Inc. (formerly SMSC) SMC9514 Hub
Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
pi@raspberrypi:~ $ 


```

В списку підключених девасів повинен відображатися модем. В даному випадку**: ID 106c:3718 Curitel Communications, Inc. PANTECH UML290**

- [ ] Щоб перевірити kernel логи потрібно 

Відключити службу ModemManager

```
sudo systemctl disable ModemManager.service
sudo systemctl stop ModemManager.service
```

```
ping -I wwan0 www.google.com -c 5
```