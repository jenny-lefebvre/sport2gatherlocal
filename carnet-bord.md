# Journal d'équipe

## 11/08/2021 - Sprint 0

Lancement du projet Sport2Gather. Création d'un cahier des charges que nous avons commencé à compléter:

- Définition des rôles de chaque membre de l'équipe,
- Présentation du projet,
- La cible du projet,
- Les besoins et les objectifs du projet,
- Charte graphique et logo,
- Fonctionnalités du projet

### Infos individuelles

- **Groupe entier :** Préparation et création des tâches effectuées ci-dessus. Réflexion autour du projet.

## 12/08/2021 - Sprint 0

Achèvement du cahier des charges et des éléments de base de données. Création de la partie Desktop des Wireframes.

- Listes des technologies,
- User stories,
- Arborescence du site,
- Liste des routes front et back,
- MCD/MLD,
- Dictionnaires des données,
- Les Wireframes Desktop (Accueil, Sports, Annonces, Annonce, AboutUs, Profile)

### Infos individuelles

- **Alexandre :** Création des MCD/MLD + dictionnaire des données
- **Elsa :** Création des user stories + routes front
- **Jenny :** Création des routes back + dictionnaire des données
- **Margo :** Création des Wireframes Desktop
- **Groupe entier :** Validation de la liste des technologies, relecture des routes et des user stories, approbation des schémas MCD/MLD et des Wireframes.

## 13/08/2021 - Sprint 0

Création des Wireframes mobile. Ajout de relations back dans le MCD/MLD.

### Infos individuelles

- **Groupe entier :** Création et relecture des wireframes mobile, discussion et ajout de relations de données en back.

## 16/08/2021 - Sprint 0

Meeting avec Fanny et Damien. Correction du MCD, des user stories et de l'arborescence. Réorganisation des user stories. Ajout de wireframes et de données dans le dictionnaire des données.
Sprint zéro terminé avec un jour d'avance: nous commencerons à coder la structure dès demain.

### Infos individuelles

- **Alexandre :** Correction MCD + dictionnaire des données
- **Elsa :** Correction et réorganisation des user stories
- **Jenny :** Correction MCD + dictionnaire des données
- **Margo :** Correction wireframe + arborescence
- **Groupe entier :** Relecture et validation de toutes les corrections effectuées suite au meeting avec Fanny et Damien.

## 17/08/2021 - Sprint 1

Projet approuvé par Damien en début de matinée: feu vert pour coder. Initialisation de symfony et react. En front comme en back, mise en place de la structure nécessaire au développement des fonctionnalités prévues.

### Infos individuelles

**Alexandre et Jenny :** 
- Mise en place de la structure de symfony ( squelette, .env.local)
- Création de la BDD ( création des entités, relations)
- Mise en place des fixtures

**Elsa et Margo :** 
- Mise en place de la structure React (react modele)
- Création de nombreux composants React pour donner corps au site
- Définition de variables scss + exécution dans certains composants
- Début de scss sur le body et certains composants clés (header, footer, page...)
- Mise en place des routes via react-router-dom

## 18/08/2021 - Sprint 1

Rétrospective en matinée: démonstration de notre projet à d'autres groupes, et réciproquement. Dans la journée, finition des composants React et début de CSS. Côté back, création du service MySlugger, et premières étapes de l'API. 

### Infos individuelles

**Alexandre et Jenny :** 
- Création du Service MySlugger et rajout dans AppFixtures
- Création des slugs title Post, name Sport, username user + admin
- Truncate id Database dans AppFixtures
- Définition du rôle admin et user
- Création du controller Api/Category

**Elsa et Margo :** 
- Création de la structure des derniers composants React
- Début de CSS, dégrossissement global sur base des wireframes et de la charte graphique

## 19/08/2021 - Sprint 1

Première journée où l'équipe a rencontré quelques difficultés, mais a globalement su les résoudre: côté back, problème avec la méthode POST résolu grâce à un Normalizer. Côté front, des soucis par rapport aux champs contrôlés pour les formulaires et le champ de connexion. Le premier a été résolu en supprimant un middleware interceptant l'action, le second reste à résoudre. Aujourd'hui, finalisation des API et documentation par rapport aux ACL et voters pour les back, champs contrôlés en front. 

### Infos individuelles

**Alexandre et Jenny :** 
- Modification du dictionnaire de données suite à l'ajout du slug dans l'entité User
- Rajout de la propriété location dans l'entité User
- Suite au bug de notre méthode POST, nous avons ajouté le Normalizer
- Création de toutes les api controllers avec les routes list, read, add, edit et delete
- Création du backoffice avec templates en CRUD

**Elsa  :** 
- Création des dossiers actions, containers, middlewares.
- Création de la page des mentions légales et sa route + son css
- Création d'un formulaire Login + css, à travers deux champs contrôlés.
- Problème rencontré: impossible de contrôler en écriture, multiples erreurs. 

**Margo :**
- Création des dossiers actions, containers, middlewares
- css complet pour les formulaires (inscription et création d'annonce)
- Mise en place des champs contrôlés pour le formulaire d'inscription. Problème rencontré : le dispatch d'action fonctionne mais les actions n'arrivent pas au reducer. Problème résolu : un middleware non utilisé (avec le code de base) interceptait toutes les actions, retiré pour le moment. Les champs inputs et textarea sont contrôlés en lecture et en écriture.

## 20/08/2021 - Sprint 1

Début de la journée avec Damien: présentation de la progression en front et en back. En back, quelques difficultés à faire les jointures en DQL, mais elles ont été faites avec succès. L'API est quasiment terminée: quelques endpoints à terminer. Côté front, intégration statique de la page des annonces et de la page des sports (mise en place carrousel) et mise en place des champs contrôlés Login et formulaire de création d'annonce. 

### Infos individuelles

**Alexandre et Jenny :** 
- Création sur PostRepository des requêtes DQL pour récupérer tous les posts pour un lieu, un sport et une date
- Nous avons passé du temps pour trouver la requête pour récupérer les posts d'un sport
- Création en API sur PostController des routes par lieu, sport et date
- Ajout de la propriété picture dans l'entité Sport

**Elsa  :** 
- Réunion avec Damien de début de sprint 1.
- Les champs du formulaire Login sont contrôlés en lecture et en écriture.
- Le composant Login a été réparé: position, classes conditionnelles, state...
- Ajout de la librarie react-multi-carousel et son implémentation sur la page des sports.
- Première configuration du carousel et CSS

**Margo :**
- Réunion avec Damien
- Mise en place des champs contrôlés pour le formulaire de création d'annonce
- tous les champs sont contrôlés en lecture et en écriture.
- Intégration statique de la page des annonces (liste de résultats)

## 24/08/2021 - Sprint 1

### Infos individuelles

**Alexandre et Jenny :** 
- Correction du Dictionnaire de données (rajout propriété picture dans User et des slugs et noms des routes back )
- Installation de JWT token avec tests et débug
- Modification des twigs suite au bugs des Paramconverter
- Création du MainController et de la page home en twig

**Elsa  :** 
- Pages restantes désormais responsive,
- Dynamisation de la page sport: mapping des catégories, et des sports à l'intérieur des carrousels
- Trouvé un système pour afficher les sports liés à l'id de la catégorie mappée sur le parent
- Problème rencontré: Le carrousel se casse au mapping + trouver comment passer l'id mappé du parent à l'enfant

**Margo :**
- Gérer l'affichage au clic sur le bouton "s'inscrire" sur une annonce.
- Préparer une ACTION au clic sur valider.
- Gérer l'affichage au clic sur le bouton "commenter" sur une annonce.
- Générer un input, en champs contrôlé, pour écrire le commentaire.
- Préparer une ACTION au clic sur "publier"
- Choisir les sports et les catégories à créer en BDD

## 25/08/2021 - Sprint 2

 Rétrospective.

### Infos individuelles

**Alexandre et Jenny :** 
- Modification des sports et catégories dans ProviderDB
- Créations des sports et catégories ainsi que leur liaison en dur dans la database AWS
- Installation du bundle nelmio/cors pour la liaison back/front
- Recherche de photos de sports libre de droit pour notre database

**Elsa  :** 
- Rétrospective sprint 1, présentation du projet,
- Choix des images pour les sports en base de données,
- Dynamisation de la page "sports" : recherches et tentatives de dynamiser les sports dans les carrousels sans casser ces derniers

**Margo :**
- Retrospective sprint 1, présentation du projet.
- Gestion de l'authentification : middleware et envoi des données saisie à l'api
- Stockage du JWT
- Gestion de la persistance de la connexion
- choix des images pour les sports en bdd.

## 26/08/2021 - Sprint 2

Grande avancée dans le projet, les fonctionnalités s'ajoutent au projet et les données dans le back s'affinent de plus en plus.

### Infos individuelles

**Alexandre et Jenny :** 
- Ajout des categories à la page sports
- Création des ACL pour l'Api
- Slugify sur Sport, User et Post
- Hashage des mots de passe pour l'ajout et la modification des utilisateurs
- Ajout en dur dans la database adminer et AWS des photos de sports
- Création des authentifications pour les methodes POST, PATCH et DELETE
- Modification de la page home et sport index avec boostrap

**Elsa  :** 
- Rendu dynamique de la page des sports: les catégories et les sports à l'intérieur de chacune d'elles sont mappées à l'intérieur d'un carrousel
- Consommation de l'API pour la page des sports: utilisation des endpoints api/categories et api/sports sur deux composants.
- Fix du carrousel qui se cassait lorsqu'on mappait dedans.
- Hébergement des images en ligne et leur envoi aux développeurs back
- Redimension de la taille des images au sein du carrousel
- Création d'une seconde boucle pour que tous les sports appartenant à une catégorie s'affichent (avant, jamais de doublon sur la page sports)

**Margo :**
- Gestion de la déconnexion de l'utilisateur
- Consommation API pour afficher la page des annonces, ainsi que la page du détail d'une seule annonce.
- Avec useEffect, les annonces sont chargées à chaque montage de App
- Mise en place d'un loader dans App : la page s'affiche seulement lorsque les données d'annonces de l'api sont bien chargées.

## 27/08/2021 - Sprint 2

Point durant la matinée avec Fanny sur l'avancée du sprint 2. Conclusion encourageante, l'équipe continue dans la bonne direction et à bon rythme. Les problèmes qui se présentent se résolvent promptement et efficacement. Bonne avancée en front comme en back (l'API continue d'être consommée sur plus de fonctionnalités, le back et le front conjuguent leurs efforts dans la même direction pour rester cohérent sur la priorité des tâches effectuées). 

### Infos individuelles

**Alexandre et Jenny :** 
- Sérialization group posts-get sur le slug et la picture entité sport
- Connection par email au JWT Token
- Modification des slugs database de la mano à l'automatisme
- Modification du PostController avec ajout active=true, createdAt et UpdatedAt=now
- Amélioration des twigs Sports, Users et Catégories avec bootstrap
- Ajout d'un nouveau sport via backoffice sans pouvoir lier la catégorie
- Création du PracticesController mais bug non solutionné

**Elsa  :** 
- Création d'un composant PostsSports dédié à rediriger vers les annonces concernant le sport sur lequel on a cliqué dans la page des sports
- Filtrage des sports par slug et redirection vers PostsSports dynamiquement grâce à l'URL basée sur ce slug (useParams)
- Mise en place d'un compteur d'annonces trouvées dynamique selon le nombre de posts ressortant de la recherche
- Création et gestion du submit de la barre de recherche

**Margo :**
- Mise en place des champs contrôlés pour les filtres sur la page des posts
- Mise en place d'un champ select autocomplete pour le filtre "location" (villes) material UI
- Création fichier de données de villes
- Récupération de la valeur selectionnée dans le state.


