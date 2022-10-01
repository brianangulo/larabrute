FROM php:8.1-fpm

WORKDIR /var/www

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

RUN apt-get update

RUN docker-php-ext-install pdo_mysql && docker-php-ext-install pdo && docker-php-ext-enable opcache

RUN apt-get install -y mariadb-client
