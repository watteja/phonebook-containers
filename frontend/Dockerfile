FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN npm ci

ENV VITE_BACKEND_URL=http://localhost:8080

CMD ["npm", "run", "build"]

# Build as 'phonebook-frontend' to work with (production) docker-compose
# docker build -t phonebook-frontend .

# There's not really a point in running this container standalone