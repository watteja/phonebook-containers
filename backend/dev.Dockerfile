FROM node:20

WORKDIR /user/src/app

COPY --chown=node:node . .

RUN npm install

ENV DEBUG=phonebook-backend:*

ENV NODE_ENV=development

USER node

CMD ["npm", "run", "dev", "--", "--host"]

# Build as 'phonebook-backend-dev' to work with (development) docker-compose
# docker build -t phonebook-backend-dev -f ./dev.Dockerfile .

# To run only this container
# docker run -it --rm -p 3001:3001 -v $(pwd):/usr/src/app -e MONGODB_URI=url_from_env_file phonebook-backend-dev
