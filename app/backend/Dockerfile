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

COPY . ./
# Sinalize que aplicação expõe a porta 3001

EXPOSE 3001

# Configurar os comandos para iniciar a aplicação de acordo com as boas práticas

# ENTRYPOINT ["sh", "-c", "tail -f /dev/null"]

ENTRYPOINT ["npm", "run", "start"]

# CMD ["start"]
