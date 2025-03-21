# GIS Application Configuration YAML File

This YAML configuration file presents the small environment variables used in config maps and secrets for the GIS application. These variables are crucial for customizing the application's behavior and integrate with external services.

## Table of Variables and Usage

| Section      | Variable Name             | Description                                                        |
| ------------ | ------------------------- | ------------------------------------------------------------------ |
| ConfigMap    | AUTH_KEYCLOAK_ISSUER      | Keycloak issuer URL for authentication settings.                   |
|              | AUTH_SESSION_MAX_AGE      | Maximum session age for Keycloak authentication.                   |
|              | S3_ENDPOINT               | Endpoint URL for the S3 bucket.                                    |
|              | S3_PORT                   | Port number for the S3 bucket connection.                          |
|              | S3_SCHEME                 | Protocol scheme for the S3 connection (HTTP or HTTPS).             |
|              | S3_BUCKET                 | Name of the S3 bucket for storage.                                 |
|              | S3_CDN_URL                | CDN URL for serving S3 content.                                    |
|              | APP_URL                   | URL for the GIS application frontend.                              |
|              | SMTP_FROM                 | Sender's email address for SMTP configuration.                     |
|              | SMTP_CC                   | Email address for carbon copy in SMTP settings.                    |
|              | SMTP_REPLY_TO             | Email address for reply-to in SMTP messages.                       |
|              | APP_LAST_APPLICATION_DATE | Last date for submitting applications in the GIS application.      |
| Secret Names | S3_ACCESS_KEY             | Access key for the S3 bucket storage.                              |
|              | S3_SECRET_KEY             | Secret key for authenticating with the S3 bucket.                  |
|              | SMTP_URL                  | URL for the SMTP server connection.                                |
|              | AUTH_SECRET               | Secret key for authentication and security.                        |
|              | AUTH_KEYCLOAK_ID          | ID for the Keycloak client in the authentication flow.             |
|              | AUTH_KEYCLOAK_SECRET      | Secret key linked to the Keycloak client for secure communication. |
|              | DATABASE_URL              | Connection URL for the PostgreSQL database.                        |

## How to Install

1. Employ the below `values.yaml` content for configuring the GIS Application:

```yaml
# Simplified values.yaml configuration file

configMaps:
  config:
    enabled: true
    annotations:
      description: 'Common configuration for the GIS Application app.'
    data:
      AUTH_KEYCLOAK_ISSUER: https://kec.example.com/realms/main
      AUTH_SESSION_MAX_AGE: '2592000'
      S3_ENDPOINT: s3.example.com
      S3_PORT: '443'
      S3_SCHEME: https
      S3_BUCKET: gis-applications
      S3_CDN_URL: https://s3.example.com
      APP_URL: https://apply.example.com
      SMTP_FROM: 'Sender Name <sender@server.com>'
      SMTP_CC: 'GIS Group <cc@server.com>'
      SMTP_REPLY_TO: 'Stephane Segning <stephane@segning.com>'
      APP_LAST_APPLICATION_DATE: '2026-01-31'

secrets:
  s3:
    enabled: true
    annotations:
      description: 'S3 configuration for the GIS Application app.'
    stringData:
      S3_ACCESS_KEY: 'minio'
      S3_SECRET_KEY: 'minio123'
  smtp:
    enabled: true
    annotations:
      description: 'SMTP configuration for the GIS Application app.'
    stringData:
      SMTP_URL: 'smtp+ssl://user:password@smtp.example:582'
  auth:
    enabled: true
    annotations:
      description: 'Auth configuration for the GIS Application app.'
    stringData:
      AUTH_SECRET: 'gfhZ+94pqhGDi03RCD/6klIbTd92V5yA8G+oEN9c6pk='
      AUTH_KEYCLOAK_ID: 'gis-applications'
      AUTH_KEYCLOAK_SECRET: 'someSecret'
  db:
    enabled: true
    annotations:
      description: 'Auth configuration for the GIS Application app.'
    stringData:
      DATABASE_URL: 'postgresql+ssl://gisapply:gisapply-password@localhost:5432/gisapply?schema=public'
```

2. Save the file and use the following command to apply the Helm chart:

```bash
helm apply ./values.yaml
```

By executing the above steps, the GIS application will be tailored according to the config maps and secrets specified in the yaml file.
