FROM node:20-alpine

WORKDIR /src

# Copie package.json e package-lock.json primeiro para aproveitar o cache do Docker esta na pasta src
COPY ./package*.json ./
# Execute npm install
#instalando mysql2 e express
RUN npm install mysql2
RUN npm install express
# Copie o restante dos arquivos do projeto
COPY . .

# Inicie o aplicativo
CMD ["npm", "start"]