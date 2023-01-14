installer le serveur mariadb

> sudo apt-install mariadb-server

(vérifier que maria puisse cohabiter avec mysql-server)

git cloner le repository

> cd atelier

> npm install

> cd server

> nano .env

dans le .env créer les constantes suivantes :

DB*HOST = localhost
DB* NAME = lenomchoisipourlabdd
DB_USERNAME = user_du_server_mariadb
DB_PASSWORD = password_du_user_ci_dessus

pour charger les fixtures, se positionner dans le répertoire "server" puis :

> node src/utils/fixtures/loadFixtures.js

pour lancer l'application, à partir du répertoire racine du projet, tapez :

> npm run watch

pour build l'appli :

> npm run deploy

on accède au front end à partir de l'adresse suivante :

http://localhost:3000/

pour créer des utilisateurs (user) se positionner dans le rép "server" :

tech :

> node src/utils/scripts/createUser.js 'email@exemple.fr' 'password'

admin :

> node src/utils/scripts/createUser.js 'email@exemple.fr' 'password' 'admin'

les noms d'utilisateurs (emails) doivent être uniques
