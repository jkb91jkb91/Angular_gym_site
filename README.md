# HOW TO RUN THE APP IN DOCKER_COMPOSE

docker-compose -f docker-compose_v2.yml up -d


# APP CONSISTS OF FEW MICROSERVICES WITH IMAGES ALREADY PUSHED TO DOCKER REPOSITORY
angular-nginx                jkb91/angular:11.0      
angular_gym_site_pgadmin_1   dpage/pgadmin4         
db                           jkb91/postgress:1.0  
django                       jkb91/django:6.0     
memcached                    memcached:1.6.1  
myrb                         rabbitmq:3-management


# HOW TO ACCESS APP
localhost:80
