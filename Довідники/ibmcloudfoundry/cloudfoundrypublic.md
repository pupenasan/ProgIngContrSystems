# IBM Cloud Foundry Public

https://cloud.ibm.com/docs/cloud-foundry-public

## Deploying apps

https://cloud.ibm.com/docs/cloud-foundry-public?topic=cloud-foundry-public-deployingapps

You can deploy apps to IBM Cloud® with the command line interface or  the integrated development environments (IDEs). You can also use app  manifests to deploy apps. When you use an app manifest, you reduce the  number of deployment details that          you must specify every time that you deploy an app to IBM  Cloud.

Deploying an app to IBM Cloud includes two phases, staging the app and starting the app.

### Staging an app

During the staging phase, IBM Cloud takes care of the app container orchestration. When you push an app, the Cloud Controller sends a  staging request to IBM Cloud, which takes over the task of allocating  the app instances. The IBM Cloud backend orchestrates app containers to ensure fault-tolerance and  long-term consistency.

All apps are deployed to the Diego architecture. To stage an app, deploy the app with the `ibmcloud app push` command:

```bash
ibmcloud app push <appname>
```

For more details, see [`ibmcloud push`](https://cloud.ibm.com/docs/cli?topic=cli-ibmcloud_commands_apps#ibmcloud_app_push).

### Starting an app

When an app is started, the instance or instances of the app container are created. You can use the `ibmcloud cf ssh` or `ibmcloud cf scp` command to access the app container file system which includes the logs. The `ibmcloud cf files` command does not work for apps running on the Diego architecture.

If the app fails to  start, the app is stopped, the contents of your app container are  removed, and the log files are not available. 

If you can't access the logs for the app by using the `ibmcloud cf ssh` or `ibmcloud cf scp` command, you can use the `ibmcloud cf logs` command to see the cause of the staging errors in the app container.              The `ibmcloud cf logs` command uses the IBM®  Cloud Foundry log aggregator to collect the details of your app logs and system logs, and you can see what the log aggregator saved. For more  information about the log aggregator, see [Logging in Cloud Foundry](http://docs.cloudfoundry.org/devguide/deploy-apps/streaming-logs.html).

The buffer size is limited. If an app runs for a long time and is not restarted, logs might not be displayed when you run the `ibmcloud cf app logs appname --recent` command because the log buffer might have been cleared. To debug  staging errors for a large app, use the `ibmcloud cf app logs appname` command on a separate command line from the `ibmcloud cf` command line interface to track the logs while you deploy the app.

### Deploying apps by using the `ibmcloud cf` command

When you deploy your apps to IBM Cloud from the command line interface, a  buildpack provides the runtime environment that is appropriate for your app language and framework. You can also use the Delivery Pipeline  service to deploy apps to IBM Cloud.

IBM Cloud [provides buildpacks](https://cloud.ibm.com/docs/cloud-foundry-public?topic=cloud-foundry-public-available_buildpacks) supporting Java and Node.js among others. If you are using these  languages and frameworks, you don't need to specify the buildpack when you deploy your app by using the command line interface. Because IBM Cloud is built on Cloud Foundry, the command defaults to these buildpacks.

If you use an external buildpack, when deploying your app you must specify the URL of the buildpack by using the `-b` option.

- To deploy Liberty server packages to IBM Cloud, use the following command from your source directory:

```
ibmcloud cf push
```

- To deploy Node.js apps to IBM Cloud, use the following command:

```
ibmcloud cf push <appname> -p <app_path>
```

A `package.json` file must be in your Node.js app for the app to be recognized by the Node.js buildpack. The `app.js` file is the entry script for the app, and can be specified in the `package.json` file. The            following example shows a simple `package.json` file:

```js
{
      "name": "MyUniqueNodejs01",
      "version": "0.0.1",
      "description": "A sample package.json file",
      "dependencies": {
              "express": ">=3.4.7 <4",
              "jade": ">=1.1.4"
      },
      "scripts": {
              "start": "node app.js"
      },
      "engines": {
              "node": ">=0.10.0"
      },
      "repository": {}
}
```

For more information about the `package.json` file, see [Creating a package.json file](https://docs.npmjs.com/creating-a-package-json-file).

### App manifest

App manifests contain options that are applied to the `ibmcloud cf push` command. You can use an app manifest to reduce the number of deployment details that you must specify every time you push an app to IBM Cloud.

In app manifests you can specify options such as the number of app instances to create, the amount of memory and disk quota to allocate to apps, and other environment variables for the app. You can  also use app manifests to automate app deployments. The default name of a manifest file is `manifest.yml`.

The following table shows the supported options that you can use in an app  manifest file. If you choose to use a file name other than `manifest.yml`, you must use the `-f` option with the `ibmcloud cf push`              command. In the following example, `appManifest.yml` is the file name:

```bash
ibmcloud cf push -f appManifest.yml
```

| Options          | Description                                                  | Usage or example                                         |
| :--------------- | :----------------------------------------------------------- | :------------------------------------------------------- |
| **buildpack**    | The URL or name of the custom buildpack.                     | `buildpack:` *buildpack_URL*                             |
| **disk_quota**   | The disk quota that is allocated for an app. The default value is 1GB. | `disk_quota: 500MB`                                      |
| **domain**       | The domain name of the app in IBM Cloud.                     | `domain: ng.mybluemix.net`                               |
| **host**         | The host name of the app in IBM Cloud. This value must be unique in the IBM Cloud environment. | `host:` *host_name*                                      |
| **name**         | The app name in IBM Cloud. This value must be unique in the IBM Cloud environment. | `name: appname`                                          |
| **path**         | The location of your app. This value can be a relative path or absolute path. | `path:` *path_to_app*                                    |
| **command**      | The custom start command for your app, or the command to run script files. | `command:` *custom_command* `command:` *`bash ./run.sh`* |
| **memory**       | The amount of memory to allocate for the app. The default value is 1GB. | `memory: 512MB`                                          |
| **instances**    | The number of instances to create for your app.              | `instances: 2`                                           |
| **timeout**      | The maximum amount of time in seconds that is used to start the app. The default value is 60 seconds. | `timeout: 80`                                            |
| **no-route**     | A Boolean value to prevent a route from being assigned to the app if the app is running in the background. The default value is **false**. | `no-route: true`                                         |
| **random-route** | A Boolean value to assign a random route to the app. The default value is **false**. | `random-route: true`                                     |
| **services**     | The services to bind to the app.                             | `services: - mysql_maptest`                              |
| **env**          | The custom environment variables for the app.                | `env: DEV_ENV: production`                               |

The following example shows a manifest file for a Node.js app that uses the built-in community Node.js buildpack in IBM Cloud.

```yaml
---
- name: myNodejsapp
  memory: 256M
  disk_quota: 512M
  path: /dev/myNodejsApp
  buildpack: nodejs_buildpack
  host: nodejs001
  domain: mybluemix.net
  command: node app.js
  timeout: 80
  services:
  - mongo_8917
  env:
    env_type: production
```

### Environment variables

Environment variables contain the environment information of a deployed app on IBM  Cloud. Besides environment variables set by Diego and buildpacks, you  can also set app-specific environment variables for apps on IBM Cloud.

You can view the following environment variables of a running IBM Cloud app by using the `ibmcloud app env` command or from the IBM Cloud user interface:

- User-defined variables that are specific to an app. For more information, see [Adding user-defined environment variables](https://cloud.ibm.com/docs/cloud-foundry-public?topic=cloud-foundry-public-deployingapps#ud_env).
- The VCAP_SERVICES variable, which contains connection  information to access a service instance. If your app is bound to  multiple services, the VCAP_SERVICES variable includes the connection  information for each service instance. For example:

```json
{
 "VCAP_SERVICES": {
  "AppScan Dynamic Analyzer": [
   {
    "credentials": {
     "bindingid": "0ab3162a-867e-4137-a2e7-39346a89472e",
     "password": "xxxxxxxxxxxxxx"
    },
    "label": "AppScan Dynamic Analyzer",
    "name": "AppScan Dynamic Analyzer-9q",
    "plan": "standard",
    "tags": [
     "Security",
     "security",
     "ibm_created"
    ]
   }
  ],
  "mysql-5.5": [
   {
    "credentials": {
     "host": "23.246.200.38",
     "hostname": "23.246.200.38",
     "name": "d296abcc06c9e418b94cbaaafdf547620",
     "password": "xxxxxxxxxxxxxxx",
     "port": 3307,
     "uri": "mysql://uzpGf7eGJ7mtB:peRiYCG4ZYqu3@23.246.200.38:3307/d296abcc06c9e418b94abcaafdf547620",
     "user": "uzpGf7eGJ7mtB",
     "username": "uzpGf7eGJ7mtB"
    },
    "label": "mysql-5.5",
    "name": "mysql-ix",
    "plan": "300",
    "tags": [
     "mysql",
     "relational",
     "data_management",
     "ibm_experimental"
    ]
   }
  ]
 }
}
```

You also have access to the environment variables that are set by Diego and the buildpacks.

The following variables are defined by Diego:

- **HOME**

  The root directory of the deployed app.

- **MEMORY_LIMIT**

  The maximum amount of memory that each instance of your app can use. You can specify the value in an app manifest.yml file, or on the command line when you push the app.

- **PORT**

  The port on Diego for communication with the app. Diego allocates a port to the app at staging time.

- **PWD**

  The current working directory that is running the buildpack.

- **TMPDIR**

  The directory where temporary and staging files are stored.

- **USER**

  The user ID that is running Diego.

- **VCAP_APP_HOST**

  The IP address of the Diego host.

- **VCAP_APP**

  A JSON string that contains information about the  deployed app. The information includes the app name, URIs, memory  limits, time stamp when the app achieved its current state, and other  values. For example:              ``

```json
  {
    "limits": {
        "mem": 512,
        "disk": 1024,
        "fds": 16384
    },
    "application_version": "df111903-7d95-4c20-96d9-aad4e97d2a9a",
    "application_name": "testapp",
    "application_uris": [
        "testapp.AppDomainNamestage1.mybluemix.net"
    ],
    "version": "df111903-7d95-4c20-96d9-aad4e97d2a9a",
    "name": "testapp",
    "space_name": "dev",
    "space_id": "c6ed3a8e-436b-43ac-9f96-b676ee335000",
    "uris": [
        "testapp.AppDomainNamestage1.mybluemix.net"
    ],
    "users": null,
    "application_id": "e984bb73-4c4e-414b-84b7-c28c87f84003",
    "instance_id": "09f50e22848d4ec0b943e9e487c23569",
    "instance_index": 0,
    "host": "0.0.0.0",
    "port": 61399,
    "started_at": "2015-01-16 06:50:51 +0000",
    "started_at_timestamp": 1421391051,
    "start": "2015-01-16 06:50:51 +0000",
    "state_timestamp": 1421391051
}
```

**VCAP_SERVICES**

A JSON string that contains information about the service bound to the deployed app. For example:              

```json
  {
    "mysql-5.5": [
        {
            "name": "mysql-ix",
            "label": "mysql-5.5",
            "tags": [
                "mysql",
                "relational",
                "data_management",
                "ibm_experimental"
            ],
            "plan": "300",
            "credentials": {
                "name": "d296abcc06c9e418b94abcaafdf547620",
                "hostname": "23.246.200.38",
                "host": "23.246.200.38",
                "port": 3307,
                "user": "uzpGf7eGJ7mtB",
                "username": "uzpGf7eGJ7mtB",
                "password": "xxxxxxxxxxxxxxx",
                "uri": "mysql://uzpGf7eGJ7mtB:peRiYCG4ZYqu3@23.246.200.38:3307/d296abcc06c9e418b94abcaafdf547620"
            }
        }
    ]
}
```

Variables that are defined by buildpacks are different for each buildpack. For other compatible buildpacks, see [the buildpack information for Cloud Foundry](https://github.com/cloudfoundry-community/cf-docs-contrib/wiki/Buildpacks).

- The following variables are defined by the Liberty Buildpack:               

  - **JAVA_HOME**

    The location of Java SDK that runs the app.

  - **IBM_JAVA_OPTIONS**

    The Java SDK options to use when running the app.

  - **IBM_JAVA_COMMAND_LINE**

    The Java command to start up a Liberty profile server instance in Diego.

  - **WLP_USR_DIR**

    The location of shared resources and server definitions when starting up a Liberty profile server instance in Diego.

  - **WLP_OUTPUT_DIR**

    The location of generated output such as log files and working directory of a running Liberty profile server instance.

- The following variables are defined by the Node.js Buildpack:              

  - **BUILD_DIR**

    The directory of the Node.js runtime environment.

  - **CACHE_DIR**

    The directory that the Node.js runtime environment uses for caching.

  - **PATH**

    The system path that is used by the Node.js runtime environment.

You can use the following sample Node.js code to get the value of the VCAP_SERVICES environment variable:

```json
if (process.env.VCAP_SERVICES) {
    var env = JSON.parse (process.env.VCAP_SERVICES);
    myvar = env.foo[bar].foo;
}
```

For more information about each environment variable, see [Cloud Foundry Environment Variables](http://docs.cloudfoundry.org/devguide/deploy-apps/environment-variable.html).

### Customizing app deployments

You can customize deployment tasks for your apps. For example, you can  specify the start commands for your apps and configure your app startup  environment.

#### Specifying start commands

To specify start commands for your app, you can use one of the following  options. The start commands that you specify overwrite the default start commands that are provided by the buildpack.

If you want the buildpack start commands to take precedence, specify `null` as the start command.

- Use the `ibmcloud cf push` command and specify the `-c` option. For example, when you deploy a Node.js app, you can specify the `node app.js` start command on the `-c` option:

```bash
ibmcloud cf push appname -p app_path -c "node app.js"
```

- Use the command option in the `manifest.yml` file. For example, when you deploy a Node.js app, you can specify the `node app.js` start command in the manifest file:

```bash
command: node app.js
```

#### Adding user-defined environment variables

User-defined environment variables are specific for an app. You have the following  options to add a user-defined environment variable to a running app:

- Use the IBM Cloud user interface. 
  1. On the IBM Cloud Dashboard, click your app tile. The app details page is displayed
  2. Click **Runtime** > **Environment Variables**.
  3. Click **USER-DEFINED**, then click **ADD**.
  4. Fill in the required fields, then click **SAVE**.
- Use the `ibmcloud cf` command line interface. Add a user-defined variable by using the `ibmcloud cf env-set` command. For example:

```bash
ibmcloud cf env-set appname <environment_variable_name> <environment_variable_value>
```

Use the `manifest.yml` file. Add value pairs in the file. For example:

- ```bash
    env:
      VAR1:<environment_variable_name>
      VAR2:<environment_variable_value>
  ```

After you add a user-defined environment variable, you  can use the following sample Node.js code to get the value of the  defined variable:

```bash
var myEnv = process.env.<environment_variable_name>;
console.log("My user defined = " + myEnv);
```

#### Configuring the startup environment

To configure the startup environment for your app, you can add shell scripts into the `/.profile.d` directory. The `/.profile.d` directory is under the build directory of your app. Scripts in the `/.profile.d`              directory are run by IBM Cloud before the app is run. For  example, you can set the NODE_ENV environment variable to **production** by putting a `node_env.sh` file that contains the following content under the `/.profile.d` directory:

```bash
export NODE_ENV=production;
```

#### Preventing files and directories from being uploaded

When you use the `ibmcloud cf` command line interface to deploy an app, you can save upload time by  skipping certain files and directories that IBM Cloud can obtain  elsewhere. To prevent these files and directories from being uploaded to IBM Cloud, you can create a `.cfignore` file at the root directory of your app.

The `.cfignore` file must be in `UTF-8` format.

The `.cfignore` file contains the names of files and directories that you want to ignore, one name per line. You  can use an asterisk (*) as a wildcard character. When you specify a  directory, all files and subdirectories under that directory are also ignored. For example, the following  content in the `.cfignore` file indicates that all the `.swp` files and all files and subdirectories under the `tmp/` directory won't be uploaded to IBM Cloud.

```bash
*.swp
tmp/
```

## Cloud Foundry Manifest files

Manifest files, which are named `manifest.yml` and stored in a project's root directory, control how your project is  deployed to IBM Cloud. For information about creating manifest files for a project, see the [IBM Cloud documentation about application manifests](https://cloud.ibm.com/docs/cloud-foundry?topic=cloud-foundry-deploy_apps#appmanifest). To integrate with IBM Cloud, your project must have a  manifest file in its root directory. However, you are not required to  deploy based on the information in the file.

In the pipeline, you can specify everything that a manifest file can do by using `cf push` command arguments. The `cf push` command arguments are helpful in projects that have multiple deployment targets. If multiple deploy jobs all try to use the route that is specified in the project manifest file, a conflict occurs.

To avoid conflicts, you can specify a route by using `cf push` followed by the host name argument, `-n`, and a route name. By modifying the deployment script for individual stages, you can avoid route conflicts when you deploy to multiple targets.

## SDK for Node.js

https://cloud.ibm.com/docs/cloud-foundry-public?topic=cloud-foundry-public-nodejs_runtime

The `sdk-for-nodejs` buildpack is used when the app contains a **package.json** file in the root directory.

The app must listen on the port that is assigned to it through the PORT environment variable.

```bash
var port = (process.env.PORT || 3000);
```

IBM Cloud provides a Node.js starter apps. The Node.js starter app is a  simple Node.js app that provides a template that you can use for your  app. You can experiment with the starter app, and make and push changes  to the IBM Cloud environment.

The recommended ways to specify a start command for your IBM Cloud® Node.js app are to use either a `Procfile` or a `package.json` file.

Again in the example below, app.js is the startup js script for your app.

```bash
{
    ...   
    "scripts": {
      "start": "node app.js"
    }
}
```

If a start script entry is present in the `package.json`, a `Procfile` is generated automatically. The content of the auto-generated `Procfile` is:

```bash
    web: npm start
```

For more information on the `Procfile` and `package.json` file see [Tips for Node.js Apps](https://docs.cloudfoundry.org/buildpacks/node/node-tips.html).

Set a port number to run your Node.js app locally without causing conflicts when you run it on IBM Cloud®.

When the app is running on IBM Cloud, the PORT environment  variable is allocated by Cloud Foundry. However, when the app is running locally, PORT is not defined, so you can define the port for your app.  To avoid conflicts, define the port that your app listens to locally something different than the port  used by IBM Cloud.

In the following example for a **js** file, **3000** is used as the port number. By using **3000**, you can run the app locally for testing purposes and on IBM Cloud without making changes.

```bash
var port = (process.env.PORT || 3000);
```

## Configuration options

A variety of options are available for configuring the `sdk-for-nodejs` buildpack.

NPM provides a scripting facility allowing you to run scripts, including  pre-installation and post-installation scripts which are applied before  and after your node_modules are installed. See [npm-scripts](https://docs.npmjs.com/misc/scripts) for complete details.

IBM Cloud® maintains a cache directory per node app, that is persisted  between builds. The cache stores resolved dependencies so they are not  downloaded and installed every time the app is deployed. For example,  suppose `myapp` depends on **express**. Then the first time `myapp` is deployed the **express** module is downloaded. On subsequent deployments of `myapp`, the cached instance of **express** is used. The default behavior is to cache all node_modules installed by NPM and bower_components installed by bower.

Use the NODE_MODULES_CACHE variable to determine whether or not the Node buildpack uses or ignores the cache from previous builds.  The default value is true. To disable caching set NODE_MODULES_CACHE to  false, for example via the IBM Cloud command line:

```bash
    ibmcloud cf set-env myapp NODE_MODULES_CACHE false
```

Note that node_modules that are included in your app are not cached.

You can use a `cacheDirectories` array in your top-level `package.json` file to achieve fine grained control over what modules are cached. When the `cacheDirectories` element is present in the `package.json`            file only those modules which are in the `cacheDirectories` array will be cached. In the following example only `node_modules` and `bower_components` are cached.

```bash
{
  "cacheDirectories": ["node_modules","bower_components"],
  ...
}
```

## Specifying a version

- Use the **node** option in the **engines** section in the **package.json** file to specify the version of Node.js runtime that you want to run.
- If you need to specify a version of `npm` other than the version bundled with Node.js, use the `npm` option in the `engines` section in the `package.json` file. 

See the following example:

```bash
{
  "name": "myapp",
  "description": "this is my app",
  "version": "0.1",
  "engines": {
     "node": "4.2.4",
     "npm": "3.10.10"
  }
}
```