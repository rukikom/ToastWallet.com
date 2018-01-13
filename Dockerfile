FROM nginx:1.13.8

RUN apt-get update -y && apt-get upgrade -y

RUN apt-get install build-essential libssl-dev curl -y

ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION v7.4.0

RUN curl https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash \
    && . $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/v$NODE_VERSION/bin:$PATH

RUN mkdir /app

COPY toastwallet-nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf

RUN mkdir -p /var/www/browser

COPY browser/ /var/www/browser

COPY app/ /app/

RUN cd /app && ./install.sh

CMD ["bash", "/app/run.sh"]
