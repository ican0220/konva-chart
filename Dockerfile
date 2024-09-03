# official node image
FROM node:18
# set the working directory in the container
WORKDIR /app
# copy package.jsong and package-lock.json files
COPY package*.json ./
# install node modules
RUN chmod 755 /app
RUN npm install
# copy the rest
COPY . .
RUN npm run build
EXPOSE 3000
CMD [ "npm", "run dev" ]
