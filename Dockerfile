# --- Build stage ---
# Koristimo Node.js 20 Alpine image za buildovanje React/Vite aplikacije.
FROM node:20-alpine AS build

# Postavljamo radni direktorijum unutar kontejnera na /app.
# Sve naredne komande (COPY, RUN...) će se izvršavati unutar ovog foldera.
WORKDIR /app

# Kopiramo package.json i package-lock.json u container.
COPY package*.json ./

# Instaliramo sve NPM zavisnosti.
RUN npm install

# Kopiramo ostatak projekta (source code, konfiguracione fajlove itd.) u /app.
COPY . .

# Pokrećemo build proces i dobijamo produkcijske fajlove u /app/dist.
RUN npm run build

# --- Production stage ---
# Koristimo Nginx Alpine image za serviranje statičkih fajlova.
FROM nginx:alpine

# Kopiramo našu Nginx konfiguraciju u container.
COPY nginx.config /etc/nginx/config.d/default.conf

# Kopiramo build iz prvog stage-a (/app/dist) u Nginx root folder za statičke fajlove.
COPY --from=build /app/dist /usr/share/nginx/html

# EXPOSE dokumentuje port 80 koji Nginx koristi.
EXPOSE 80

# Pokretanje Nginx-a koji nam servira frontend aplikaciju.
CMD ["nginx", "-g", "daemon off;"]