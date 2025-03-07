FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN npm install

# When using Vite, all env variables must be prefixed with VITE_ to expose them to import.meta.env in client.
# They are also hardcoded during build time, so they must be set in the Dockerfile,
# or as ARGs to be used from docker-compose when building the image from there.

# Resolve to host machine's IP address from inside the container (when not using docker-compose)
# ENV VITE_BACKEND_URL=http://host.docker.internal:3001

# When using docker-compose without NGINX proxy: - VITE_BACKEND_URL=http://localhost:3001 (which is also the default)

# When using docker-compose
ENV VITE_BACKEND_URL=http://localhost:8080

CMD ["npm", "run", "dev", "--", "--host"]

# Build as 'phonebook-frontend-dev' to work with (development) docker-compose
# docker build -t phonebook-frontend-dev -f ./dev.Dockerfile .

# To run only this container (and likely the backend container)
# docker run -it --rm -p 5173:5173 -v $(pwd):/usr/src/app phonebook-frontend-dev