FROM node:23-alpine

LABEL maintainer="Stephane Segning <selastlambou@gmail.com>"
LABEL org.opencontainers.image.description="NextJS frontend for the Adorsys School"

WORKDIR /app

RUN yarn add prisma@6 zod-prisma-types@3

COPY companions/migrations/entrypoint.sh entrypoint.sh
COPY prisma .

ENTRYPOINT ["sh", "/app/entrypoint.sh"]

