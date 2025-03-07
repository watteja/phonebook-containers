FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN npm install

# Resolve to host machine's IP address from inside the container
ENV VITE_BACKEND_URL=http://host.docker.internal:3001

CMD ["npm", "run", "dev", "--", "--host"]

# Build as 'phonebook-frontend-dev' to work with (development) docker-compose
# docker build -t phonebook-frontend-dev -f ./dev.Dockerfile .

# To run only this container (and likely the backend container)
# docker run -it --rm -p 5173:5173 -v $(pwd):/usr/src/app phonebook-frontend-dev