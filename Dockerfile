FROM node:20
WORKDIR /app

# Backend
COPY rep_tel_BE ./rep_tel_BE
WORKDIR /app/rep_tel_BE
RUN npm install
RUN npm run build

# Frontend
COPY rep_tel_FE ./rep_tel_FE
WORKDIR /app/rep_tel_FE
RUN npm install
RUN npm run build

# Servir backend
WORKDIR /app/rep_tel_BE
ENV PORT=8080
EXPOSE 8080
CMD ["npm", "run", "prod"]
