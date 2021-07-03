https://cloud.ibm.com/docs/ContinuousDelivery?topic=ContinuousDelivery-getting-started

https://cloud.ibm.com/docs/ContinuousDelivery?topic=ContinuousDelivery-deliverypipeline_about

## Cloud Foundry Manifest files

Manifest files, which are named `manifest.yml` and stored in a project's root directory, control how your project is  deployed to IBM Cloud. For information about creating manifest files for a project, see the [IBM Cloud documentation about application manifests](https://cloud.ibm.com/docs/cloud-foundry?topic=cloud-foundry-deploy_apps#appmanifest).            To integrate with IBM Cloud, your project must have a  manifest file in its root directory. However, you are not required to  deploy based on the information in the file.

In the pipeline, you can specify everything that a manifest file can do by using `cf push` command arguments. The `cf push` command arguments are helpful in projects that have multiple deployment targets. If multiple deploy            jobs all try to use the route that is specified in the project manifest file, a conflict occurs.

To avoid conflicts, you can specify a route by using `cf push` followed by the host name argument, `-n`, and a route name. By modifying the deployment script for individual stages, you can avoid route conflicts when you            deploy to multiple targets.

To use the `cf push` command arguments, open the configuration settings for a deploy job and modify the **Deploy Script** field. For more information, see the [Cloud Foundry Push documentation](http://docs.cloudfoundry.org/devguide/installcf/whats-new-v6.html#push).