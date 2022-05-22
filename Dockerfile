FROM node:16-alpine

# Set working directory
WORKDIR /usr/src

# Copy package.json, package-lock.json, yarn.lock
COPY package*.json *.lock ./

# Install dependencies
RUN yarn install

# Copy start script and grant access to execute
COPY . .
EXPOSE 8080

CMD [ "yarn", "dev" ]
