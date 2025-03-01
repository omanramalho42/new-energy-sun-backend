# Use uma imagem base oficial do Node.js
FROM node:20.17.0

# Defina o diretório de trabalho no container
WORKDIR /usr/src/app

# Copie os arquivos de configuração do package
COPY package*.json ./

COPY prisma ./prisma/

# Instale as dependências do projeto
RUN npm install

# Copie todo o código do backend para dentro do container
COPY . .

# Gere o build do projeto NestJS
RUN npm run build

# Exponha a porta que o NestJS vai rodar
EXPOSE 3001

# Comando para rodar o aplicativo
CMD ["npm", "run", "start:prod"]
