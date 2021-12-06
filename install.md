# Installation du projet

## Comment installer sport2gather en local

### Etape 1

- Cloner le projet d'origine sur votre machine, avec la commande `git clone git@github.com:O-clock-Trinity/projet-sport2gather.git`
- Supprimer le fichier .git existant dans le projet.
- Ouvrir le projet dans un terminal et utiliser la commande `git init` pour créer un dépôt local.

### Etape 2

- Rendez vous sur votre compte Github et créez un nouveau repository pour accueillir le projet.
- Ne cocher aucune des cases concernant l'ajout d'un readme, d'un fichier gitignore ou le choix d'une licence.
- Cliquez sur créer.

### Etape 3 

- De retour dans votre terminal ouvert à la racine du projet, tapez les commandes suivantes :
- `git add .`
- `git commit -m "first commit"`
- `git branch -M main`
- `git remote add origin git@github.com:VotrePseudoGit/LeNomDuRepo.git`
- `git push -u origin main`

### Etape 4 

- Avec le terminal, placez-vous à l'intérieur du dossier /back du projet et tapez la commande `composer install`.
- A la racine du dossier /back, créer un fichier .env.local.
- Dans ce fichier, définissez la variable DATABASE_URL pour la connexion à votre base de donnée, en précisant :
  * le SGBD : MySql
  * votre nom d'utilisateur
  * votre mot de passe
  * le nom de la base de donnée à créer
- Dans le terminal, utiliser la commande `bin/console database:create`
- Vous pouvez vérifier en vous connectant à Adminer qu'une base de donnée vide à bien été créee.

### Etape 5

- Dans le dossier /migrations, supprimer le fichier de migration existant.
- Dans le terminal, toujours placé dans le dossier /back, utiliser la commande `bin/console make:migration`
- Puis taper la commande `bin/console database:migration:migrate`

### Etape 6

- Copier le contenu du fichier sql bdd à disposition dans le drive du projet.
- Ouvrez Adminer et entrez dans la base de données du projet que l'on vient de créer.
- Cliquez sur SQL command
- Coller le contenu du fichier et cliquez sur execute.
- Vous pouvez vérifier dans Adminer que les données ont bien été insérés.

### Etape 7 

- Re-générer les clés pour l'authentification avec le jwt, en utilisant la commande `bin/console lexik:jwt:generate-keypair`
- Lancer un serveur de dev sur le port 8000 avec la commande `php -S 0.0.0.0:8000 -t public`
- Vous pouvez vérifier que tout se passe bien en allant sur l'url localhost:8000/api/sports : la liste des sports doit s'afficher au format json.

### Etape 8 

- Dans le terminal placez-vous dans le dossier /front du projet.
- Utiliser la commande `yarn` pour installer les dépendances.
- Dans les middlewares, modifier l'url existante pour l'accès à la base de données par l'url http://localhost:8000
- Dans le terminal, utiliser la commande `yarn start`
- Vous pouvez accéder au site sur localhost:8080 et vérifier que tout fonctionne bien.
