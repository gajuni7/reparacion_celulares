FROM node:20

# --------------------------
# Backend
# --------------------------
WORKDIR /app/rep_tel_BE
COPY rep_tel_BE/package*.json ./
RUN npm install
COPY rep_tel_BE/ ./
RUN npm run build

# --------------------------
# Frontend
# --------------------------
WORKDIR /app/rep_tel_FE
COPY rep_tel_FE/package*.json ./
RUN npm install
COPY rep_tel_FE/ ./
RUN npm run build

# --------------------------
# Servir backend
# --------------------------
WORKDIR /app/rep_tel_BE
ENV PORT=8080
EXPOSE 8080
CMD ["npm", "run", "prod"]
