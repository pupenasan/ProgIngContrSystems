# Authenticate using REST         

https://cloud.google.com/docs/authentication/rest

```
curl -X GET -H "Authorization: Bearer $(gcloud auth application-default print-access-token)" "https://cloudresourcemanager.googleapis.com/v3/projects/PROJECT_ID
```

https://developers.google.com/identity/protocols/oauth2/service-account#httprest