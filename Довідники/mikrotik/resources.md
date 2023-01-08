# System/Resource

https://wiki.mikrotik.com/wiki/Manual:System/Resource

## General

**Sub-menu level:** ` /system resource`

Загальне меню ресурсів показує загальну статистику використання ресурсів і маршрутизатора, як-от час безвідмовної роботи, використання пам’яті, використання диска, версію тощо. У ньому також є кілька підменю для більш детальної статистики апаратного забезпечення, наприклад PCI, IRQ та USB.

```
[admin@RB1100test] /system resource> print 
                   uptime: 2w1d23h34m57s
                  version: "5.0rc1"
              free-memory: 385272KiB
             total-memory: 516708KiB
                      cpu: "e500v2"
                cpu-count: 1
            cpu-frequency: 799MHz
                 cpu-load: 9%
           free-hdd-space: 466328KiB
          total-hdd-space: 520192KiB
  write-sect-since-reboot: 1411
         write-sect-total: 70625
               bad-blocks: 0.2%
        architecture-name: "powerpc"
               board-name: "RB1100"
                 platform: "MikroTik"
```

### Properties

Усі властивості доступні лише для читання

| Property                                | Description                                                  |
| --------------------------------------- | ------------------------------------------------------------ |
| **architecture-name** (*string*)        | CPU architecture. Can be *powerpc*, *x86*, *mipsbe* or *mipsle*. |
| **bad-blocks** (*percent*)              | Shows percentage of bad blocks on the NAND.                  |
| **board-name** (*string*)               | RouterBOARD model name                                       |
| **cpu** (*string*)                      | Cpu model that is on the board.                              |
| **cpu-count** (*integer*)               | Number of CPUs present on the system. Each core is separate CPU, Intel HT is also separate CPU. |
| **cpu-frequency** (*string*)            | Current CPU frequency.                                       |
| **cpu-load** (*percent*)                | Percentage of used CPU resources. Combines all CPUs. Per-core CPU usage can be see in [ CPU submenu](https://wiki.mikrotik.com/wiki/Manual:System/Resource#CPU) |
| **free-hdd-space** (*string*)           | Free space on hard drive or NAND                             |
| **free-memory** (*string*)              | Unused amount of RAM                                         |
| **platform** (*string*)                 | Platform name, usually it is "MikroTik"                      |
| **total-hdd-space** (*string*)          | Size of the hard drive or NAND                               |
| **total-memory** (*string*)             | Amount of installed RAM                                      |
| **uptime** (*time*)                     | Time interval passed since boot-up.                          |
| **version** (*string*)                  | Installed RouterOS version number.                           |
| **write-sect-since-reboot** (*integer*) | Number of sector writes in HDD or nand since router was last time rebooted. |
| **write-sect-total** (*integer*)        | Number of sector writes in total.                            |

## CPU

**Sub-menu level:** ` /system resource cpu`

This submenu shows per-cpu usage, as long as IRQ and Disk usage.

```
[admin@RB1100test] /system resource cpu> print 
CPU LOAD        IRQ         DISK       
0   5%          0%          0%         
[admin@RB1100test] /system resource cpu> 
```

### Properties

Read-only properties

| Property             | Description                                        |
| -------------------- | -------------------------------------------------- |
| **cpu** (*integer*)  | Identification number of CPU which usage is shown. |
| **load** (*percent*) | CPU usage in percents                              |
| **irq** (*percent*)  | IRQ usage in percents                              |
| **disk** (*percent*) | Disk usage in percents                             |

## IRQ

**Sub-menu level:** ` /system resource irq`

Menu shows all used IRQs on the router. It is possible to set up [ IRQ load balancing](https://wiki.mikrotik.com/wiki/Manual:System/Resource#IRQ_Load_Balancing) on mulicore systems by assigning IRQ to specific core.  IRQ assignments are done by hardware and cannot be changed from  RouterOS. For example, if all Ethernets are assigned to one IRQ, then  you have to deal with hardware: upgrade motherboards BIOS, reassign IRQs manually in BIOS, if none of above helps then change the hardware.

### Properties

| Property                               | Description                                                  |
| -------------------------------------- | ------------------------------------------------------------ |
| **cpu** (*auto \| integer*; Default: ) | Specifies which CPU is assigned to the IRQ.  **auto** - pick CPU based on number of interrupts. Uses [NAPI](http://www.linuxfoundation.org/collaborate/workgroups/networking/napi) to optimize interrupts. |

**Read-only properties**

| Property                   | Description                                                  |
| -------------------------- | ------------------------------------------------------------ |
| **active-cpu** (*integer*) | Shows active CPU in multicore systems.                       |
| **count** (*integer*)      | Number of interrupts. On ethernet interfaces interrupt=packet. |
| **irq** (*integer*)        | IRQ identification number                                    |
| **users** (*string*)       | Process assigned to IRQ                                      |

### IRQ Load Balancing

## USB

**Sub-menu level:** ` /system resource usb`

This menu displays all available USB controllers on the board. Menu is available only if at least one USB controller is present.

```
[admin@MikroTik] /system resource usb> print detail 
 0 device="2:1" name="RB400 EHCI" serial-number="rb400_usb" vendor-id="0x1d6b" 
   device-id="0x0002" speed="480 Mbps" ports=2 usb-version="2.00" 

 1 device="1:1" name="RB400 OHCI" serial-number="rb400_usb" vendor-id="0x1d6b" 
   device-id="0x0001" speed="12 Mbps" ports=2 usb-version="1.10" 
```

### Properties

| Property                     | Description                                                  |
| ---------------------------- | ------------------------------------------------------------ |
| **device** (*string*)        |                                                              |
| **device-id** (*hex*)        | Hexadecimal device ID                                        |
| **name** (*string*)          | Descriptive name of the device retrieved from driver         |
| **ports** (*integer*)        | How many ports are supported by usb controller               |
| **serial-number** (*string*) |                                                              |
| **speed** (*string*)         | Max USB speed that can be used (480Mbps for USBv2 and 12Mbps for USBv1) |
| **usb-version** (*string*)   | Identifies max spported USB version                          |
| **vendor** (*string*)        | Device manufacturer's name.                                  |
| **vendor-id** (*hex*)        | Hexadecimal vendor ID                                        |

## PCI

**Sub-menu level:** ` /system resource pci`

PCI submenu shows the information about all PCI devices on the board

```
[admin@RB1100test] /system resource pci> print 
 # DEVICE   VENDOR                        NAME                       IRQ       
 0 06:00.0  Attansic Technology Corp.     unknown device (rev: 192)  18        
 1 05:00.0  Freescale Semiconductor Inc   MPC8544 (rev: 17)          0         
 2 04:00.0  Attansic Technology Corp.     unknown device (rev: 192)  17        
 3 03:00.0  Freescale Semiconductor Inc   MPC8544 (rev: 17)          0         
 4 02:00.0  Attansic Technology Corp.     unknown device (rev: 192)  16        
 5 01:00.0  Freescale Semiconductor Inc   MPC8544 (rev: 17)          0         
 6 00:00.0  Freescale Semiconductor Inc   MPC8544 (rev: 17)          0 
```

### Properties

All properties are read-only

| Property                | Description                                          |
| ----------------------- | ---------------------------------------------------- |
| **category** (*string*) | PCI device type, for example *ethernet controller*   |
| **device** (*string*)   |                                                      |
| **device-id** (*hex*)   | Hexadecimal device ID                                |
| **io** (*hex-hex*)      | I/O memory range                                     |
| **irq** (*integer*)     | IRQ asigned to the device                            |
| **memory** (*hex-hex*)  | Memory range                                         |
| **name** (*string*)     | Descriptive name of the device retrieved from driver |
| **vendor** (*string*)   | Device manufacturer's name.                          |
| **vendor-id** (*hex*)   | Hexadecimal vendor ID                                |