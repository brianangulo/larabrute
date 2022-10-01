# this dockerfile is used for creating an image with assets
FROM node:14.17 as node_builder

COPY . /usr/www

WORKDIR /usr/www

RUN yarn && yarn mix

FROM php:8.1-cli as php_builder

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

COPY --from=node_builder /usr/www /usr/www

WORKDIR /usr/www

RUN composer install --optimize-autoloader --no-dev

RUN php artisan config:cache && php artisan route:cache && php artisan view:cache
