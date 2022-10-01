#! /bin/bash

docker pull brian219/update_img:master

docker run --name update -d brian219/update_img:master

docker cp update:/usr/www /var/www

docker rm -f -v update

cp -f /var/www/docker/build/update_larabrute.py /usr/update_larabrute.sh

docker-compose -f /var/www/docker/docker-compose.yml up --force-recreate --build
