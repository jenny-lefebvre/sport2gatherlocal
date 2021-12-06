# projet-sport2gather

## Dictionnaire de données

### USER

| Champ       | Type         | Spécificités                                    | Description                      |
| ----------- | ------------ | ----------------------------------------------- | -------------------------------- |
| id          | INT          | PRIMARY KEY, NOT NULL, UNSIGNED, AUTO_INCREMENT | L'identifiant de l'utilisateur   |
| email       | VARCHAR(320) | NOT NULL                                        | l'email de l'utilisateur         |
| password    | VARCHAR(72)  | NOT NULL                                        | Le mot de passe de l'utilisateur |
| username    | VARCHAR(128) | NOT NULL                                        | Le pseudo de l'utilisateur       |
| picture     | VARCHAR(128) | NOT NULL, DEFAULT                               | L'avatar de l'utilisateur        |
| description | TEXT         | NULL                                            | Description de l'utilisateur     |

### SPORT

| Champ | Type         | Spécificités                                    | Description            |
| ----- | ------------ | ----------------------------------------------- | ---------------------- |
| id    | INT          | PRIMARY KEY, NOT NULL, UNSIGNED, AUTO_INCREMENT | L'identifiant du sport |
| name  | VARCHAR(128) | NOT NULL                                        | le nom du sport        |
| slug  | VARCHAR(128) | NOT NULL                                        | le slug du sport       |

### CATEGORY

| Champ | Type         | Spécificités                                    | Description                   |
| ----- | ------------ | ----------------------------------------------- | ----------------------------- |
| id    | INT          | PRIMARY KEY, NOT NULL, UNSIGNED, AUTO_INCREMENT | L'identifiant de la catégorie |
| name  | VARCHAR(128) | NOT NULL                                        | le nom de la catégorie        |

### POST

| Champ            | Type         | Spécificités                                    | Description                       |
| ---------------- | ------------ | ----------------------------------------------- | --------------------------------- |
| id               | INT          | PRIMARY KEY, NOT NULL, UNSIGNED, AUTO_INCREMENT | L'identifiant de l'annonce        |
| title            | VARCHAR(128) | NOT NULL                                        | le titre de l'annonce             |
| slug             | VARCHAR(128) | NOT NULL                                        | le slug de l'annonce              |
| description      | TEXT         | NOT NULL                                        | La description de l'annonce       |
| level            | INT          | NULL                                            | le niveau de l'annonce            |
| location         | VARCHAR(128) | NOT NULL                                        | Le lieu de l'évènement            |
| min_participants | INT          | NULL, UNSIGNED                                  | Le nombre minimum de participants |
| max_participants | INT          | NULL, UNSIGNED                                  | Le nombre maximum de participants |
| event_date       | DATETIME     | NOT NULL                                        | La date de l'évènement            |
| created_at       | DATETIME     | NOT NULL,  DEFAULT CURRENT_DATETIME             | La date de création de l'annonce  |
| updated_at       | DATETIME     | NULL                                            | la date d'édition de l'annonce    |
| author_id        | INT          | FOREIGN KEY, NOT NULL                           | L'id de l'auteur                  |
| sport_id         | INT          | FOREIGN KEY, NOT NULL                           | L'id du sport                     |

### COMMENT

| Champ      | Type     | Spécificités                                    | Description                        |
| ---------- | -------- | ----------------------------------------------- | ---------------------------------- |
| id         | INT      | PRIMARY KEY, NOT NULL, UNSIGNED, AUTO_INCREMENT | L'identifiant du commentaire       |
| content    | TEXT     | NOT NULL                                        | le contenu du commentaire          |
| created_at | DATETIME | NOT NULL,  DEFAULT CURRENT_DATETIME             | La date de création du commentaire |
| updated_at | DATETIME | NULL                                            | la date d'édition du commentaire   |
| author_id  | INT      | FOREIGN KEY, NOT NULL                           | L'id de l'auteur                   |
| post_id    | INT      | FOREIGN KEY, NOT NULL                           | L'id de l'annonce                  |

### PARTICIPATES (POST.USER)

| Champ   | Type | Spécificités          | Description         |
| ------- | ---- | --------------------- | ------------------- |
| post_id | INT  | FOREIGN KEY, NOT NULL | L'id de l'annonce   |
| user_id | INT  | FOREIGN KEY, NOT NULL | L'id du participant |

### PRACTICES (SPORT.USER)

| Champ    | Type | Spécificités          | Description                              |
| -------- | ---- | --------------------- | ---------------------------------------- |
| sport_id | INT  | FOREIGN KEY, NOT NULL | L'id du sport                            |
| user_id  | INT  | FOREIGN KEY, NOT NULL | L'id de l'utilisateur                    |
| level    | INT  | NULL                  | Le niveau de l'utilisateur dans ce sport |

### BELONGS (CATEGORY.SPORT)

| Champ       | Type | Spécificités          | Description          |
| ----------- | ---- | --------------------- | -------------------- |
| category_id | INT  | FOREIGN KEY, NOT NULL | L'id de la catégorie |
| sport_id    | INT  | FOREIGN KEY, NOT NULL | L'id du sport        |



## Nos routes


### API

| Endpoint                            | Méthode HTTP | Description                                                         |         Nom de la route | Méthode        |
| :---------------------------------- | :----------- | :------------------------------------------------------------------ | ----------------------: | -------------- |
| `/api/users`                        | `GET`        | Récupération de tous les utilisateurs                               |        `api_users_read` | `list()`       |
| `/api/users/{id}`                   | `GET`        | Récupération de l'utilisateur dont l'id est fourni                  |        `api_users_list` | `read()`       |
| `/api/users`                        | `POST`       | Ajout d'un utilisateur                                              |         `api_users_add` | `add()`        |
| `/api/users/{id}`                   | `PATCH`      | Modification d'un utilisateur dont l'id est fourni                  |        `api_users_edit` | `edit()`       |
| `/api/users/{id}`                   | `DELETE`     | Suppression d'un utilisateur dont l'id est fourni                   |      `api_users_delete` | `delete()`     |
| `/api/posts`                        | `GET`        | Récupération de tous les posts                                      |        `api_posts_read` | `list()`       |
| `/api/posts/place/{place}`          | `GET`        | Récupération de tous les posts pour une ville                       |       `api_posts_place` | `getByPlace()` |
| `/api/posts/sport/{sport}`          | `GET`        | Récupération de tous les posts pour un sport                        |       `api_posts_sport` | `getBySport()` |
| `/api/posts/date/{date}`            | `GET`        | Récupération de tous les posts pour une date                        |        `api_posts_date` | `getByDate()`  |
| `/api/posts/{sport}/{place}/{date}` | `GET`        | Récupération de tous les posts pour un sport, une ville et une date |         `api_posts_get` | `get()`        |
| `/api/posts/{id}`                   | `GET`        | Récupération du post dont l'id est fourni                           |        `api_posts_list` | `read()`       |
| `/api/posts`                        | `POST`       | Ajout d'un post                                                     |         `api_posts_add` | `add()`        |
| `/api/posts/{id}`                   | `PATCH`      | Modification d'un post dont l'id est fourni                         |        `api_posts_edit` | `edit()`       |
| `/api/posts/{id}`                   | `DELETE`     | Suppression d'un post dont l'id est fourni                          |      `api_posts_delete` | `delete()`     |
| `/api/sports`                       | `GET`        | Récupération de tous les sports                                     |       `api_sports_read` | `list()`       |
| `/api/sports/{id}`                  | `GET`        | Récupération du sport dont l'id est fourni                          |       `api_sports_list` | `read()`       |
| `/api/sports`                       | `POST`       | Ajout d'un sport                                                    |        `api_sports_add` | `add()`        |
| `/api/sports/{id}`                  | `PATCH`      | Modification d'un sport dont l'id est fourni                        |       `api_sports_edit` | `edit()`       |
| `/api/sports/{id}`                  | `DELETE`     | Suppression d'un sport dont l'id est fourni                         |     `api_sports_delete` | `delete()`     |
| `/api/comments`                     | `GET`        | Récupération de tous les commentaires                               |     `api_comments_read` | `list()`       |
| `/api/comments/{id}`                | `GET`        | Récupération du commentaire dont l'id est fourni                    |     `api_comments_list` | `read()`       |
| `/api/comments`                     | `POST`       | Ajout d'un commentaire                                              |      `api_comments_add` | `add()`        |
| `/api/comments/{id}`                | `PATCH`      | Modification d'un commentaire dont l'id est fourni                  |     `api_comments_edit` | `edit()`       |
| `/api/comments/{id}`                | `DELETE`     | Suppression d'un commentaire dont l'id est fourni                   |   `api_comments_delete` | `delete()`     |
| `/api/categories`                   | `GET`        | Récupération de toutes les categories                               |   `api_categories_read` | `list()`       |
| `/api/categories/{id}`              | `GET`        | Récupération de la categorie dont l'id est fourni                   |   `api_categories_list` | `read()`       |
| `/api/categories`                   | `POST`       | Ajout d'une categorie                                               |    `api_categories_add` | `add()`        |
| `/api/categories/{id}`              | `PATCH`      | Modification d'une categorie dont l'id est fourni                   |   `api_categories_edit` | `edit()`       |
| `/api/categories/{id}`              | `DELETE`     | Suppression d'une categorie dont l'id est fourni                    | `api_categories_delete` | `delete()`     |


### BACKOFFICE
 
| Endpoint                        | Description                                        |     Nom de la route | Méthode    |
| :------------------------------ | :------------------------------------------------- | ------------------: | ---------- |
| `/admin`                        | Page d'accueil                                     |              `home` | `home()`   |
| `/admin/users`                  | Récupération de tous les utilisateurs              |        `users_read` | `list()`   |
| `/admin/users/{id}`             | Récupération de l'utilisateur dont l'id est fourni |        `users_list` | `read()`   |
| `/admin/users/add`              | Ajout d'un utilisateur                             |         `users_add` | `add()`    |
| `/admin/users/{id}/edit`        | Modification d'un utilisateur dont l'id est fourni |        `users_edit` | `edit()`   |
| `/admin/users/{id}/delete`      | Suppression d'un utilisateur dont l'id est fourni  |      `users_delete` | `delete()` |
| `/admin/posts`                  | Récupération de tous les posts                     |        `posts_read` | `list()`   |
| `/admin/posts/{id}`             | Récupération du post dont l'id est fourni          |        `posts_list` | `read()`   |
| `/admin/posts/add`              | Ajout d'un post                                    |         `posts_add` | `add()`    |
| `/admin/posts/{id}/edit`        | Modification d'un post dont l'id est fourni        |        `posts_edit` | `edit()`   |
| `/admin/posts/{id}/delete`      | Suppression d'un post dont l'id est fourni         |      `posts_delete` | `delete()` |
| `/admin/sports`                 | Récupération de tous les sports                    |       `sports_read` | `list()`   |
| `/admin/sports/{id}`            | Récupération du sport dont l'id est fourni         |       `sports_list` | `read()`   |
| `/admin/sports/add`             | Ajout d'un sport                                   |        `sports_add` | `add()`    |
| `/admin/sports/{id}/edit`       | Modification d'un sport dont l'id est fourni       |       `sports_edit` | `edit()`   |
| `/admin/sports/{id}/delete`     | Suppression d'un sport dont l'id est fourni        |     `sports_delete` | `delete()` |
| `/admin/comments`               | Récupération de tous les commentaires              |     `comments_read` | `list()`   |
| `/admin/comments/{id}`          | Récupération du commentaire dont l'id est fourni   |     `comments_list` | `read()`   |
| `/admin/comments/add`           | Ajout d'un commentaire                             |      `comments_add` | `add()`    |
| `/admin/comments/{id}/edit`     | Modification d'un commentaire dont l'id est fourni |     `comments_edit` | `edit()`   |
| `/admin/comments/{id}/delete`   | Suppression d'un commentaire dont l'id est fourni  |   `comments_delete` | `delete()` |
| `/admin/categories`             | Récupération de toutes les categories              |   `categories_read` | `list()`   |
| `/admin/categories/{id}`        | Récupération de la categorie dont l'id est fourni  |   `categories_list` | `read()`   |
| `/admin/categories/add`         | Ajout d'une categorie                              |    `categories_add` | `add()`    |
| `/admin/categories/{id}/edit`   | Modification d'une categorie dont l'id est fourni  |   `categories_edit` | `edit()`   |
| `/admin/categories/{id}/delete` | Suppression d'une categorie dont l'id est fourni   | `categories_delete` | `delete()` |

### FRONTOFFICE

| URL                          | Description                                           |
| ---------------------------- | ----------------------------------------------------- |
| `/`                          | Page d'accueil                                        |
| `/sports`                    | Page de la liste des sports                           |
| `/profile`                   | Page de profil                                        |
| `/register`                  | Page de formulaire d'inscription                      |
| `/add`                       | Page de formulaire d'ajout d'annonce                  |
| `/about`                     | Page "A propos" présentant l'équipe                   |
| `/legal`                     | Page des Mentions Légales                             |
| `/post/:id`                  | Page d'une annonce                                    |
| `/posts`                     | Page de toutes les annonces                           |
| `/posts/:sport`              | Page des annonces d'un sport                          |
| `/posts/:place`              | Page des annonces d'un lieu                           |
| `/posts/:date`               | Page des annonces d'une date                          |
| `/posts/:sport/:place`       | Page des annonces d'un sport et d'un lieu             |
| `/posts/:sport/:date`        | Page des annonces d'un sport et d'une date            |
| `/posts/:place/:date`        | Page des annonces d'un lieu et d'une date             |
| `/posts/:sport/:place/:date` | Page des annonces d'un sport, d'un lieu et d'une date |
