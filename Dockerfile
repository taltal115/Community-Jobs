FROM node:0.10

MAINTAINER Matthias Luebken, matthias@catalyst-zero.com

WORKDIR /home/positive-ui

# Install ui Prerequisites
RUN npm install -g grunt-cli
RUN npm install -g bower

# Install ui packages
ADD package.json /home/positive-ui/package.json
RUN npm install

# Manually trigger bower. Why doesnt this work via npm install?
ADD .bowerrc /home/positive-ui/.bowerrc
ADD bower.json /home/positive-ui/bower.json
RUN bower install --config.interactive=false --allow-root

# Make everything available for start
ADD . /home/positive-ui

# Set development environment as default
ENV NODE_ENV development

# Port 3000 for server
# Port 35729 for livereload
EXPOSE 3000 35729
CMD ["grunt"]
