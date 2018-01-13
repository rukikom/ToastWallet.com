FROM nginx:1.13.8

RUN mkdir -p /etc/nginx/sites-enabled
COPY nginx.conf /etc/nginx/nginx.conf
COPY default /etc/nginx/sites-available/
RUN ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default

RUN mkdir -p /var/www/

COPY tmp/www/ /var/www/

CMD 'nginx'
