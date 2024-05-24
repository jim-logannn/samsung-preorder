FROM node:16-alpine3.17
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps
EXPOSE 8080
CMD ["npm", "run", "dev"]