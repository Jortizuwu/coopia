# Etapa de construcción
FROM node:alpine AS build

# Pasar la variable de entorno como un argumento de construcción
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar solo el archivo package.json para instalar dependencias antes de copiar todo el código fuente
COPY package.json yarn.lock ./

# Instalar las dependencias
RUN yarn install --frozen-lockfile

# Copiar los archivos del proyecto al contenedor
COPY . .

# Construir la aplicación
RUN yarn build

# Etapa de producción
FROM nginx:alpine

# Copiar el archivo de configuración de Nginxls
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos de compilación al servidor Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto 80 para que el servidor Nginx sea accesible
EXPOSE 80

# Comando para iniciar el servidor Nginx
CMD ["nginx", "-g", "daemon off;"]