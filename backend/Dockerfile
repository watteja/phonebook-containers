FROM node:20

WORKDIR /user/src/app

COPY --chown=node:node . .

RUN npm ci

ENV NODE_ENV=production

USER node

CMD ["npm", "start"]

# Build as 'phonebook-backend' to work with (production) docker-compose
# docker build -t phonebook-backend .

# To run only this container
# docker run -it --rm -p 3001:3001 -e MONGODB_URI=url_from_env_file phonebook-backend
