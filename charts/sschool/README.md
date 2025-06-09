# SSchool Configuration YAML File

This YAML configuration file presents the small environment variables used in config maps and secrets for the GIS
application. These variables are crucial for customizing the application's behavior and integrate with external
services.

## Table of Variables and Usage

| Section      | Variable Name        | Description                                                        |
| ------------ | -------------------- | ------------------------------------------------------------------ |
| ConfigMap    | AUTH_KEYCLOAK_ISSUER | Keycloak issuer URL for authentication settings.                   |
|              | AUTH_SESSION_MAX_AGE | Maximum session age for Keycloak authentication.                   |
|              | S3_ENDPOINT          | Endpoint URL for the S3 bucket.                                    |
|              | S3_PORT              | Port number for the S3 bucket connection.                          |
|              | S3_SCHEME            | Protocol scheme for the S3 connection (HTTP or HTTPS).             |
|              | S3_BUCKET            | Name of the S3 bucket for storage.                                 |
|              | S3_CDN_URL           | CDN URL for serving S3 content.                                    |
| Secret Names | S3_ACCESS_KEY        | Access key for the S3 bucket storage.                              |
|              | S3_SECRET_KEY        | Secret key for authenticating with the S3 bucket.                  |
|              | AUTH_SECRET          | Secret key for authentication and security.                        |
|              | AUTH_KEYCLOAK_ID     | ID for the Keycloak client in the authentication flow.             |
|              | AUTH_KEYCLOAK_SECRET | Secret key linked to the Keycloak client for secure communication. |
|              | DATABASE_URL         | Connection URL for the PostgreSQL database.                        |

## How to Install

1. Employ the below `values.yaml` content for configuring the SSchool:

```yaml
# Simplified values.yaml configuration file

configMaps:
  config:
    enabled: true
    annotations:
      description: 'Common configuration for the SSchool.'
    data:
      AUTH_KEYCLOAK_ISSUER: https://kec.example.com/realms/main
      AUTH_SESSION_MAX_AGE: '2592000'
      S3_ENDPOINT: s3.example.com
      S3_PORT: '443'
      S3_SCHEME: https
      S3_BUCKET: sschool
      S3_CDN_URL: https://s3.example.com

secrets:
  s3:
    enabled: true
    annotations:
      description: 'S3 configuration for the SSchool.'
    stringData:
      S3_ACCESS_KEY: 'minio'
      S3_SECRET_KEY: 'minio123'
  otel:
    enabled: true
    annotations:
      description: 'OTEL configuration for the SSchool app.'
    stringData:
      OTEL_EXPORTER_OTLP_ENDPOINT: 'https://otel.example.com'
  auth:
    enabled: true
    annotations:
      description: 'Auth configuration for the SSchool app.'
    stringData:
      AUTH_SECRET: 'gfhZ+94pqhGDi03RCD/6klIbTd92V5yA8G+oEN9c6pk='
      AUTH_KEYCLOAK_ID: 'sschool'
      AUTH_KEYCLOAK_SECRET: 'someSecret'
  db:
    enabled: true
    annotations:
      description: 'Auth configuration for the SSchool app.'
    stringData:
      DATABASE_URL: 'postgresql+ssl://gisapply:gisapply-password@localhost:5432/gisapply?schema=public'
```

2. Save the file and use the following command to apply the Helm chart:

```bash
helm apply ./values.yaml
```

By executing the above steps, the SSchool will be tailored according to the config maps and secrets specified in
the yaml file.
