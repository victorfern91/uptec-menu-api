FROM node:boron

# set timezone to Portugal
ENV TZ=Europe/Lisbon
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# download dependecies to a temporary folder
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /opt/uptec-menu-api && cp -a /tmp/node_modules /opt/uptec-menu-api

# create files folder
RUN mkdir -p /opt/uptec-menu-api/files

WORKDIR /opt/uptec-menu-api
ADD . /opt/uptec-menu-api
EXPOSE 8080

CMD ["npm", "start"]
