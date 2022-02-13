# Groupomania - Back end

## Installation

- Ouvrir le dossier **/frontend** séparément du dossier **/backend** sur votre éditeur de code préféré (pour la partie back-end, se référer au fichier README du dossier en question)
- Créer sa base de données (voir ci-dessous)
- Créer un fichier `.env` (voir ci-dessous)
- Si ce n'est pas fait, installer NodeJs via la documentation officielle

## Base de données

- Installer Mysql (version 8)
- Créer sa base de données en faisant un copier coller du contenu du fichier suivant situé à la racine du projet : `database_dump.sql`

## Variables d'environnement (fichier .env)

- Créer un fichier `.env` au même niveau que le fichier `server.js` qui contiendra les variables d'environnement

```
DB_USER=<votre_identifiant_de_base_de_données>
DB_PASSWORD=<votre_mot_de_passe_de_base_de_données>
DB_DATABASE=<nom_de_votre_base_de_données>
DB_HOST=<valeur_de_la_machine_hôte_localhost_si_local>
PORT=<valeur_du_port_si_3000_est_déja_occupé>
SECRET_TOKEN=<votre_token_généré_après_connexion_utilisateur>
SECRET_NAME=<votre_nom_choisi_pour_sécurisation_des_cookies>
SECRET_SESSION=<votre_nom_de_session_choisie_pour_sécurisation_des_cookies>
```

## Lancer le projet

Depuis la partie back-end, suivez les étapes :

- Installer les dépendances : `npm install`
- Lancer le projet front : `npx nodemon`
