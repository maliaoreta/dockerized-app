FROM debian:latest
MAINTAINER Malia <maliaoreta@gmail.com>

ENV DB_CONN postgress://postgress

RUN apt-get update && apt-get install -y \
  git-core \
  curl \
  npm

RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -

RUN apt-get install -y nodejs

RUN git clone https://github.com/maliaoreta/dockerized-app.git /dockerized-app/

WORKDIR /dockerized-app/app-server/

RUN npm i

EXPOSE 3000

CMD ['/bin/sh', 'node', '.']
