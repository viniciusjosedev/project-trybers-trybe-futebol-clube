# Usar a imagem node:16.14-alpine como base

FROM node:16.14-alpine

# Mudar para o diretório de trabalho /app-backend

WORKDIR /app-backend

# Copiar os package.json, package-lock.json e packages.npm para o container

COPY ./package.json /app-backend/
COPY ./package-lock.json /app-backend/

# Instalar as dependências Node

RUN npm install

# Copiar o restante dos arquivos da aplicação para o container

COPY ./src /app-backend/src
COPY ./.eslintignore /app-backend/
COPY ./.eslintrc.json /app-backend/
COPY ./.sequelizerc /app-backend/
COPY ./nyc.config.js /app-backend/
COPY ./tsconfig.json /app-backend/
# Sinalize que aplicação expõe a porta 3001

EXPOSE 3001

# Configurar os comandos para iniciar a aplicação de acordo com as boas práticas

# ENTRYPOINT ["sh", "-c", "tail -f /dev/null"]

ENTRYPOINT ["sh", "-c", "npm run start"]
