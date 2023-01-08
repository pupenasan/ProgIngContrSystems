https://temofeev.ru/info/articles/google-app-script-mikrotik-telegram-i-vpnbook-zateyali-sygrat-kvartet/

https://wiki.mikrotik.com/wiki/Manual:Tools/Fetch

# Tools/Fetch

Fetch — один із інструментів консолі в Mikrotik RouterOS. Він використовується для копіювання файлів на/з мережевого пристрою через HTTP, FTP або SFTP (підтримка SFTP додана у v6.45), його також можна використовувати для надсилання запитів POST/GET і надсилання будь-яких даних на віддалений сервер . підтримується протокол HTTPS; за замовчуванням перевірки сертифікатів не виконуються, але встановлення для **check-certificate** значення *yes* увімкне перевірку довірчого ланцюга з локального сховища сертифікатів.

| Property                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| **address** (*string*; Default: )                            | IP address of the device to copy file from.                  |
| **as-value** (*set \| not-set*; Default: **not-set**)        | Store the output in a variable, should be used with the output property. |
| **ascii** (*yes \| no*; Default: **no**)                     |                                                              |
| **check-certificate** (*yes \| no*; Default: **no**)         | Enables trust chain validation from local certificate store. |
| **dst-path** (*string*; Default: )                           | Destination filename and path                                |
| **host** (*string*; Default: )                               | Domain name or virtual domain name (if used on web-site, from which you want to copy information). For example, `address=wiki.mikrotik.com host=forum.mikrotik.com` In this example the resolved ip address is the same (66.228.113.27), but hosts are different. |
| **http-method** (*\|delete\|get\|post\|put*; Default: **get**) | the HTTP method to use                                       |
| **http-data** (*string*; Default: )                          | the data, that is going to be send, when using PUT or POST methods |
| **http-header-field** (*string*; Default: ***empty\***)      | list of all header fields and their values, in the form of `http-header-field=h1:fff,h2:yyy` |
| **keep-result** (*yes \| no*; Default: **yes**)              | If yes, creates an input file.                               |
| **mode** (*ftp\|http\|tftp {!} https*; Default: **http**)    | Choose the protocol of connection - http, https , ftp or tftp. |
| **output** (*none\|file\|user*; Default: **file**)           | Sets where to store the downloaded data. `none` - do not store downloaded data `file` - store downloaded data in a file `user` - store downloaded data in the data variable |
| **password** (*string*; Default: **anonymous**)              | Password, which is needed for authentication to the remote device. |
| **port** (*integer*; Default: )                              | Connection port.                                             |
| **src-path** (*string*; Default: )                           | Title of the remote file you need to copy.                   |
| **upload** (*yes \| no*; Default: **no**)                    | If enabled then fetch will be used to upload file to remote server. Requires *src-path* and *dst-path* parameters to be set. |
| **url** (*string*; Default: )                                | URL pointing to file. Can be used instead of **address** and **src-path** parameters. |
| **user** (*string*; Default: **anonymous**)                  | User name, which is needed for authentication to the remote device. |

## Examples

#### Downloading files to the router

The following example shows how to copy the file with filename  "conf.rsc" from a device with ip address 192.168.88.2 by FTP protocol  and save it as file with filename "123.rsc". User and password are  needed to login into the device. 

```bash
[admin@mt-test] /tool> fetch address=192.168.88.2 src-path=conf.rsc \
user=admin mode=ftp password=123 dst-path=123.rsc port=21 \
host="" keep-result=yes
```

Example to upload file to other router:

```bash
[admin@mt-test] /tool> fetch address=192.168.88.2 src-path=conf.rsc \
user=admin mode=ftp password=123 dst-path=123.rsc upload=yes
```


 Another file download example that demonstrates the usage of url property.

```bash
[admin@test_host] /> /tool fetch url="http://www.mikrotik.com/img/netaddresses2.pdf" mode=http 
  status: finished

[admin@test_host] /> /file print 
 # NAME                     TYPE                  SIZE                 CREATION-TIME       
 ...
 5 netaddresses2.pdf        .pdf file             11547                jun/01/2010 11:59:51
```

#### Sending information to a remote host

It is possible to use HTTP POST request to send information to a  remote server, that is prepared to accept it. In the following example,  we send geographic coordinates to a PHP page: 

```bash
/tool fetch http-method=post http-header-field="Content-Type: application/json" http-data="{\"lat\":\"56.12\",\"lon\":\"25.12\"}" url="http://testserver.lv/index.php"              
```

Of course, you can use Fetch with scripts and fill the above command with variables from the RouterOS GPS menu.

#### Return value to a variable

Since RouterOS v6.43 it is possible to save the result of fetch  command to a variable. For example, it is possible to trigger a certain  action based on the result that a HTTP page returns. You can find a very simple example below that disables **ether2** whenever a PHP page returns "0":

```bash
{
    :local result [/tool fetch url=http://10.0.0.1/disable_ether2.php as-value output=user];
    :if ($result->"status" = "finished") do={
        :if ($result->"data" = "0") do={
            /interface ethernet set ether2 disabled=yes;
        } else={
            /interface ethernet set ether2 disabled=no;
        }
    }
}
```

#### SFTP

Since 6.45beta50 `/tool fetch` support SFTP (SSH File Transfer Protocol) protocol.

```bash
[admin@MikroTik] > /tool fetch url="sftp://10.155.126.200/home/x86/Desktop/50MB.zip" user=x86 password=root dst-path=disk1
      status: downloading
  downloaded: 1048KiB
       total: 51200KiB
    duration: 6s
-- [Q quit|D dump|C-z pause]
```