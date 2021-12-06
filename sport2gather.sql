-- Adminer 4.7.6 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `category` (`id`, `name`) VALUES
(1,	'Outdoor'),
(2,	'Indoor'),
(3,	'Raquettes'),
(4,	'Fitness'),
(5,	'Collectif'),
(6,	'Aquatique'),
(7,	'Précision');

DROP TABLE IF EXISTS `category_sport`;
CREATE TABLE `category_sport` (
  `category_id` int(11) NOT NULL,
  `sport_id` int(11) NOT NULL,
  PRIMARY KEY (`category_id`,`sport_id`),
  KEY `IDX_F2B6A09B12469DE2` (`category_id`),
  KEY `IDX_F2B6A09BAC78BCF8` (`sport_id`),
  CONSTRAINT `FK_F2B6A09B12469DE2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_F2B6A09BAC78BCF8` FOREIGN KEY (`sport_id`) REFERENCES `sport` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `category_sport` (`category_id`, `sport_id`) VALUES
(1,	1),
(1,	2),
(1,	3),
(1,	4),
(1,	5),
(1,	7),
(1,	17),
(1,	19),
(1,	25),
(1,	26),
(2,	8),
(2,	10),
(2,	18),
(2,	21),
(2,	29),
(3,	6),
(3,	8),
(3,	9),
(3,	10),
(4,	11),
(4,	12),
(4,	13),
(4,	14),
(5,	15),
(5,	16),
(6,	3),
(6,	22),
(6,	23),
(6,	24),
(6,	25),
(6,	26),
(7,	17),
(7,	18),
(7,	19),
(7,	20),
(7,	21),
(7,	22),
(7,	27),
(7,	28),
(7,	29),
(7,	30);

DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_9474526C4B89032C` (`post_id`),
  KEY `IDX_9474526CA76ED395` (`user_id`),
  CONSTRAINT `FK_9474526C4B89032C` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`),
  CONSTRAINT `FK_9474526CA76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `comment` (`id`, `post_id`, `user_id`, `content`, `created_at`, `updated_at`) VALUES
(1,	15,	10,	'Comment 1',	'2021-08-25 09:37:44',	NULL),
(2,	11,	5,	'Comment 2',	'2021-08-25 09:37:44',	NULL),
(3,	16,	9,	'Comment 3',	'2021-08-25 09:37:44',	NULL),
(4,	1,	8,	'Comment 4',	'2021-08-25 09:37:44',	NULL),
(5,	5,	9,	'Comment 5',	'2021-08-25 09:37:44',	NULL),
(6,	17,	2,	'Comment 6',	'2021-08-25 09:37:44',	NULL),
(7,	18,	2,	'Comment 7',	'2021-08-25 09:37:44',	NULL),
(8,	15,	17,	'Comment 8',	'2021-08-25 09:37:44',	NULL),
(9,	5,	2,	'Comment 9',	'2021-08-25 09:37:44',	NULL),
(10,	14,	10,	'Comment 10',	'2021-08-25 09:37:44',	NULL),
(11,	20,	12,	'Comment 11',	'2021-08-25 09:37:44',	NULL),
(12,	2,	8,	'Comment 12',	'2021-08-25 09:37:44',	NULL),
(13,	8,	7,	'Comment 13',	'2021-08-25 09:37:44',	NULL),
(14,	1,	7,	'Comment 14',	'2021-08-25 09:37:44',	NULL),
(15,	18,	6,	'Comment 15',	'2021-08-25 09:37:44',	NULL),
(16,	1,	14,	'Comment 16',	'2021-08-25 09:37:44',	NULL),
(17,	1,	4,	'Comment 17',	'2021-08-25 09:37:44',	NULL),
(18,	17,	4,	'Comment 18',	'2021-08-25 09:37:44',	NULL),
(19,	8,	8,	'Comment 19',	'2021-08-25 09:37:44',	NULL),
(20,	20,	16,	'Comment 20',	'2021-08-25 09:37:44',	NULL);

DROP TABLE IF EXISTS `doctrine_migration_versions`;
CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `doctrine_migration_versions` (`version`, `executed_at`, `execution_time`) VALUES
('DoctrineMigrations\\Version20210818121907',	'2021-08-18 14:19:16',	360),
('DoctrineMigrations\\Version20210818125539',	'2021-08-18 14:55:51',	72),
('DoctrineMigrations\\Version20210819130900',	'2021-08-20 09:24:26',	172),
('DoctrineMigrations\\Version20210820133955',	'2021-08-20 15:40:07',	493),
('DoctrineMigrations\\Version20210824123618',	'2021-08-24 14:36:30',	208);

DROP TABLE IF EXISTS `post`;
CREATE TABLE `post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sport_id` int(11) NOT NULL,
  `author_id` int(11) NOT NULL,
  `title` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `active` tinyint(1) NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `level` int(11) DEFAULT NULL,
  `location` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `min_participants` int(11) DEFAULT NULL,
  `max_participants` int(11) DEFAULT NULL,
  `event_date` datetime NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_5A8A6C8DAC78BCF8` (`sport_id`),
  KEY `IDX_5A8A6C8DF675F31B` (`author_id`),
  CONSTRAINT `FK_5A8A6C8DAC78BCF8` FOREIGN KEY (`sport_id`) REFERENCES `sport` (`id`),
  CONSTRAINT `FK_5A8A6C8DF675F31B` FOREIGN KEY (`author_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `post` (`id`, `sport_id`, `author_id`, `title`, `slug`, `active`, `description`, `level`, `location`, `min_participants`, `max_participants`, `event_date`, `created_at`, `updated_at`) VALUES
(1,	11,	11,	'Quae voluptates illo ipsum nihil quaerat sit aperiam pariatur.',	'quae-voluptates-illo-ipsum-nihil-quaerat-sit-aperiam-pariatur',	0,	'Dolorem magni temporibus modi aliquam dolor ut vel. Quaerat aut quis excepturi aperiam aspernatur. Consectetur rerum asperiores omnis magnam. Harum corrupti velit fuga sit quia corporis est itaque.',	1,	'Langlois',	3,	8,	'1984-01-27 00:00:00',	'1998-03-07 00:00:00',	NULL),
(2,	8,	18,	'Placeat soluta omnis quia repudiandae assumenda ducimus.',	'placeat-soluta-omnis-quia-repudiandae-assumenda-ducimus',	1,	'Nesciunt aliquid labore molestias assumenda. Earum rerum aspernatur ducimus consequuntur alias nihil. Consequatur id cumque nulla repellendus est dolore. Omnis impedit molestiae laborum. Tempore pariatur ducimus suscipit sapiente accusamus et accusamus. Fuga eligendi saepe architecto non.',	2,	'Delaunay',	5,	6,	'1979-01-31 00:00:00',	'1998-03-07 00:00:00',	NULL),
(3,	10,	9,	'Aperiam atque dolore placeat veritatis quos necessitatibus quaerat asperiores.',	'aperiam-atque-dolore-placeat-veritatis-quos-necessitatibus-quaerat-asperiores',	1,	'Iste ut odit saepe est quaerat. Fuga et libero eum cumque fugit similique et. Quas recusandae ducimus dolores quis quos in. Modi explicabo fugiat labore. Impedit qui vel nemo voluptates officia et. Ducimus quia enim perspiciatis necessitatibus hic saepe. Quidem exercitationem optio consequatur perspiciatis.',	2,	'Robertnec',	2,	11,	'1986-09-21 00:00:00',	'1998-03-07 00:00:00',	NULL),
(4,	17,	7,	'Voluptate rerum eum labore perferendis tempora est quibusdam.',	'voluptate-rerum-eum-labore-perferendis-tempora-est-quibusdam',	1,	'Earum optio blanditiis quia est. Sequi asperiores assumenda id consequatur animi aut laboriosam. Repellendus iusto dolores veritatis omnis quia sit. Voluptatem eos dolor excepturi eligendi nobis.',	3,	'David',	3,	6,	'2016-10-19 00:00:00',	'1998-03-07 00:00:00',	NULL),
(5,	19,	4,	'Velit distinctio earum saepe in.',	'velit-distinctio-earum-saepe-in',	0,	'Quam in est maxime praesentium officiis eum. Vero architecto ut qui accusamus. Ipsam sint illo repellendus nemo dicta dolores. Harum molestiae dolorem pariatur dolore et. Omnis tempore dicta dolor aut. Repellendus doloribus molestiae illum dicta et qui. Odio fuga quia ut qui cum possimus officiis nemo.',	2,	'Aubert',	2,	6,	'2004-10-13 00:00:00',	'1998-03-07 00:00:00',	NULL),
(6,	20,	20,	'In velit et cupiditate unde dicta.',	'in-velit-et-cupiditate-unde-dicta',	0,	'Dolores est eos qui facere molestias voluptatem quia. Sunt earum iusto veniam quam deserunt. Enim voluptatum animi veniam ea. Necessitatibus sint et consequatur quia consectetur distinctio quasi. Voluptatem suscipit in rerum sequi dolor. Aut expedita nisi dolor rerum officiis delectus et.',	1,	'Brun-sur-Mer',	4,	12,	'1986-09-01 00:00:00',	'1998-03-07 00:00:00',	NULL),
(7,	16,	12,	'Eligendi labore dolores aperiam.',	'eligendi-labore-dolores-aperiam',	1,	'Beatae mollitia ut quis ipsum et animi. Alias facilis molestias quas soluta dolorem. Delectus illo veritatis voluptatibus quidem ab quod. Molestias explicabo ipsum quo voluptate iusto.',	1,	'Huet-les-Bains',	5,	8,	'2010-04-11 00:00:00',	'1998-03-07 00:00:00',	NULL),
(8,	12,	17,	'Occaecati et quasi consectetur necessitatibus voluptatum praesentium.',	'occaecati-et-quasi-consectetur-necessitatibus-voluptatum-praesentium',	0,	'Velit id sapiente a eos aliquid. Corrupti commodi deserunt occaecati temporibus iure eum quia. Magnam minus sequi voluptatem a maiores. Nihil eaque doloribus ab assumenda voluptas exercitationem.',	2,	'Rousset',	4,	9,	'1983-09-03 00:00:00',	'1998-03-07 00:00:00',	NULL),
(9,	10,	3,	'Iste unde cupiditate qui.',	'iste-unde-cupiditate-qui',	0,	'Maiores eum explicabo ipsa tenetur cumque hic. Eaque modi enim voluptatem mollitia. Aut libero excepturi molestias aut ipsa necessitatibus. Voluptas omnis sed ut ut. Praesentium tenetur quisquam voluptate et. Eos earum optio vel ut soluta. Consequuntur aliquid saepe harum sit.',	1,	'Marienec',	2,	11,	'1982-05-15 00:00:00',	'1998-03-07 00:00:00',	NULL),
(10,	14,	7,	'Voluptatem nam aut vel fuga asperiores dolor est sunt.',	'voluptatem-nam-aut-vel-fuga-asperiores-dolor-est-sunt',	1,	'Laudantium omnis sit saepe. Cupiditate aperiam quisquam delectus quae odit. Nam enim unde quo possimus itaque repudiandae ut. Quia id qui perspiciatis aut.',	2,	'MorenoBourg',	5,	9,	'2006-08-02 00:00:00',	'1998-03-07 00:00:00',	NULL),
(11,	6,	20,	'Eius illum voluptas vero veniam sint veritatis.',	'eius-illum-voluptas-vero-veniam-sint-veritatis',	0,	'Ut aliquid doloremque repellendus et. Inventore ut dolores voluptates sunt velit. Quam quia maiores a non laudantium. Sunt dicta qui sit vero nesciunt. Consequuntur illo quaerat inventore neque. Quia eos debitis numquam sed accusamus accusamus explicabo. Magnam est in totam facere nostrum aspernatur aut perspiciatis.',	1,	'Becker-sur-Mer',	2,	7,	'2005-08-14 00:00:00',	'1998-03-07 00:00:00',	NULL),
(12,	19,	5,	'Soluta error occaecati qui explicabo tempora voluptatum eveniet.',	'soluta-error-occaecati-qui-explicabo-tempora-voluptatum-eveniet',	0,	'Quisquam blanditiis dolore ullam. Hic maiores aut officia consectetur. Dignissimos quidem voluptates est. Aut ut molestiae officia consectetur optio. Accusamus quia quia consequuntur optio. Dolorum sapiente deserunt et accusamus rerum sapiente. Sint deserunt illo illum amet asperiores.',	1,	'Delannoy',	4,	9,	'1979-07-26 00:00:00',	'1998-03-07 00:00:00',	NULL),
(13,	10,	11,	'Quo et vitae laudantium excepturi.',	'quo-et-vitae-laudantium-excepturi',	0,	'Quia et qui debitis ipsa sit sed incidunt. Facere libero eum blanditiis quis cupiditate et dolor rem. Nesciunt dicta voluptatem id ea aut. Eum ea occaecati commodi laudantium non eligendi. Quaerat nulla pariatur ea ipsam amet occaecati. In voluptatem ratione dolorem sunt voluptates maxime dolore. Fugit voluptatibus accusamus odit.',	2,	'Mathieu-la-Forêt',	2,	7,	'1990-09-20 00:00:00',	'1998-03-07 00:00:00',	NULL),
(14,	14,	19,	'At voluptatum rerum voluptatem saepe porro porro laborum.',	'at-voluptatum-rerum-voluptatem-saepe-porro-porro-laborum',	0,	'Velit non deserunt qui ea rerum dolor. Nihil quo voluptatem nobis aspernatur. Ex repudiandae officiis labore animi. Est voluptas et dolor exercitationem dolor iure. Delectus atque dolorum vel provident architecto velit. Ut hic ab error qui officiis.',	2,	'BlinVille',	4,	12,	'1993-07-19 00:00:00',	'1998-03-07 00:00:00',	NULL),
(15,	10,	15,	'Ut vel rerum facere voluptatem a.',	'ut-vel-rerum-facere-voluptatem-a',	1,	'Voluptatem molestiae dicta nihil voluptatum odit cum. In non nostrum sunt cumque adipisci consequatur. Et et nobis nostrum magnam debitis voluptatem ullam. Enim natus modi odio quia esse aperiam.',	2,	'Hoarau',	2,	7,	'1982-03-30 00:00:00',	'1998-03-07 00:00:00',	NULL),
(16,	3,	5,	'Fugiat ipsam non adipisci deserunt sequi repudiandae.',	'fugiat-ipsam-non-adipisci-deserunt-sequi-repudiandae',	0,	'Nostrum corrupti dolor ex adipisci. Quod ullam explicabo nihil. Et nemo ipsam et. Aut praesentium reiciendis qui non praesentium amet omnis. Aut sequi aliquam ut quis eos molestiae qui eligendi. Porro non sint est culpa.',	2,	'Ferreira',	4,	11,	'1973-09-11 00:00:00',	'1998-03-07 00:00:00',	NULL),
(17,	16,	7,	'Quis et dolore est voluptatem omnis.',	'quis-et-dolore-est-voluptatem-omnis',	0,	'Dolor voluptatem sit vitae sint. Dolorem vel debitis eum molestiae exercitationem. Est occaecati deserunt ipsam odio molestias dolor. Ut accusamus voluptatem hic. Quos fugiat vel eum amet corrupti odit.',	1,	'Torres',	2,	10,	'1996-06-27 00:00:00',	'1998-03-07 00:00:00',	NULL),
(18,	3,	16,	'Est odio incidunt facere omnis quam consequuntur.',	'est-odio-incidunt-facere-omnis-quam-consequuntur',	1,	'Et laborum perspiciatis cupiditate aperiam. Qui adipisci quis quos saepe architecto ut consequatur libero. Et accusamus rem accusantium eveniet repellat sunt placeat. Suscipit tenetur velit nam magni quae rem. Quo quisquam sunt at sit voluptatem aliquid. Hic eum modi nemo vitae et et perferendis a.',	2,	'Guichard-sur-Bourdon',	5,	7,	'2000-10-19 00:00:00',	'1998-03-07 00:00:00',	NULL),
(19,	5,	12,	'Ex aspernatur et incidunt eaque reiciendis repellendus quam.',	'ex-aspernatur-et-incidunt-eaque-reiciendis-repellendus-quam',	0,	'Nihil officia impedit nam fugit natus qui eveniet. Odio dolorum enim laboriosam deleniti. Quo assumenda consectetur magni. Quidem mollitia facere optio in laborum eum ex. Perspiciatis autem delectus incidunt et. Consequatur est repellendus ipsam ad eum quo ullam.',	2,	'Pires',	4,	11,	'1975-09-21 00:00:00',	'1998-03-07 00:00:00',	NULL),
(20,	8,	19,	'Quo eos facilis ex cum.',	'quo-eos-facilis-ex-cum',	0,	'Ex expedita praesentium quia temporibus autem fugiat ut. Hic cupiditate nulla aut fuga ut. Odio deserunt aliquam aut voluptas. Laborum ut hic vitae architecto similique eligendi modi et.',	3,	'OlivierBourg',	4,	10,	'1990-08-09 00:00:00',	'1998-03-07 00:00:00',	NULL);

DROP TABLE IF EXISTS `post_user`;
CREATE TABLE `post_user` (
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`post_id`,`user_id`),
  KEY `IDX_44C6B1424B89032C` (`post_id`),
  KEY `IDX_44C6B142A76ED395` (`user_id`),
  CONSTRAINT `FK_44C6B1424B89032C` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_44C6B142A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `post_user` (`post_id`, `user_id`) VALUES
(1,	4),
(1,	17),
(2,	5),
(2,	6),
(3,	7),
(3,	14),
(4,	8),
(4,	19),
(5,	2),
(5,	10),
(6,	2),
(6,	6),
(7,	3),
(7,	14),
(8,	8),
(8,	16),
(9,	6),
(9,	17),
(10,	11),
(10,	17),
(11,	14),
(12,	9),
(12,	21),
(13,	3),
(13,	20),
(14,	10),
(14,	14),
(15,	12),
(15,	21),
(16,	12),
(16,	21),
(17,	3),
(17,	12),
(18,	5),
(18,	14),
(19,	16),
(19,	19),
(20,	2),
(20,	12);

DROP TABLE IF EXISTS `practices`;
CREATE TABLE `practices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sport_id` int(11) DEFAULT NULL,
  `practitioner_id` int(11) DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_8A154FA8AC78BCF8` (`sport_id`),
  KEY `IDX_8A154FA81121EA2C` (`practitioner_id`),
  CONSTRAINT `FK_8A154FA81121EA2C` FOREIGN KEY (`practitioner_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_8A154FA8AC78BCF8` FOREIGN KEY (`sport_id`) REFERENCES `sport` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `practices` (`id`, `sport_id`, `practitioner_id`, `level`) VALUES
(1,	18,	10,	1),
(2,	18,	5,	3),
(3,	11,	18,	3),
(4,	1,	3,	3),
(5,	10,	6,	3),
(6,	4,	18,	1),
(7,	10,	7,	1),
(8,	3,	20,	2),
(9,	5,	5,	3),
(10,	2,	6,	1),
(11,	1,	4,	1),
(12,	11,	20,	2),
(13,	3,	16,	3),
(14,	11,	15,	2),
(15,	3,	4,	1),
(16,	5,	5,	1),
(17,	5,	16,	1),
(18,	19,	14,	2),
(19,	6,	14,	3),
(20,	19,	9,	3);

DROP TABLE IF EXISTS `sport`;
CREATE TABLE `sport` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `picture` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `sport` (`id`, `name`, `slug`, `picture`) VALUES
(1,	'Running',	'Running',	''),
(2,	'Randonnée',	'Randonnée',	''),
(3,	'Canoë-Kayak',	'Canoë-Kayak',	''),
(4,	'Ski',	'Ski',	''),
(5,	'Cyclisme',	'Cyclisme',	''),
(6,	'Tennis',	'Tennis',	''),
(7,	'Equitation ',	'Equitation ',	''),
(8,	'Badminton',	'Badminton',	''),
(9,	'Ping-pong',	'Ping-pong',	''),
(10,	'Squash',	'Squash',	''),
(11,	'Yoga',	'Yoga',	''),
(12,	'Danse',	'Danse',	''),
(13,	'Musculation',	'Musculation',	''),
(14,	'Crossfit',	'Crossfit',	''),
(15,	'Football',	'Football',	''),
(16,	'Basketball',	'Basketball',	''),
(17,	'Pétanque',	'Pétanque',	''),
(18,	'Futsal',	'Futsal',	''),
(19,	'Rugby',	'Rugby',	''),
(20,	'Volleyball',	'Volleyball',	''),
(21,	'Handball',	'Handball',	''),
(22,	'Water-polo',	'Water-polo',	''),
(23,	'Paddle',	'Paddle',	''),
(24,	'Natation',	'Natation',	''),
(25,	'Planche à voile',	'Planche à voile',	''),
(26,	'Surf',	'Surf',	''),
(27,	'Golf',	'Golf',	''),
(28,	'Tir à l\'arc',	'Tir à l\'arc',	''),
(29,	'Bowling',	'Bowling',	''),
(30,	'Fléchettes',	'Fléchettes',	'');

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roles` longtext COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '(DC2Type:json)',
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `picture` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `location` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `api_token` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_8D93D649E7927C74` (`email`),
  UNIQUE KEY `UNIQ_8D93D6497BA2F5EB` (`api_token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `user` (`id`, `email`, `roles`, `password`, `username`, `picture`, `description`, `slug`, `location`, `api_token`) VALUES
(1,	'admin@admin.com',	'[\"ROLE_ADMIN\"]',	'$2y$13$NDxTz76WAk/EOgPEY0Fm0ONxy1z3nNcO2mX/.7wjNX45Ku2Cbr4dy',	'admin',	'https://via.placeholder.com/300x400.png/009977?text=ducimus',	'Nulla nihil fuga ea laborum iste ullam. Inventore doloremque minus laborum voluptatum. Vel non sint similique reprehenderit quasi quo molestiae.',	'admin',	'Lemaire-la-Forêt',	NULL),
(2,	'genevieve86@guillaume.org',	'[\"ROLE_USER\"]',	'$2y$13$mQN3LBb2FmjPvwh8PEgV7OGIp7dIVe.kygGshyYjYEzcc9XRZswPu',	'Suzanne Fischer',	'https://via.placeholder.com/300x400.png/009933?text=et',	'Doloribus libero voluptas officiis est quis. Nostrum voluptatem vel est officia omnis voluptatem eum. Fuga repellat vero cum similique enim nihil quaerat.',	'suzanne-fischer',	'Pages',	NULL),
(3,	'maillot.emmanuel@daniel.org',	'[\"ROLE_USER\"]',	'$2y$13$mQN3LBb2FmjPvwh8PEgV7OGIp7dIVe.kygGshyYjYEzcc9XRZswPu',	'Susanne Le Roux',	'https://via.placeholder.com/300x400.png/003399?text=rerum',	'Nulla reiciendis cumque rerum optio incidunt sit. Qui quia aut possimus esse enim. Delectus enim voluptate est laboriosam dolores provident ipsa.',	'susanne-le-roux',	'Vallet-sur-Rossi',	NULL),
(4,	'luce.collet@reynaud.net',	'[\"ROLE_USER\"]',	'$2y$13$mQN3LBb2FmjPvwh8PEgV7OGIp7dIVe.kygGshyYjYEzcc9XRZswPu',	'Julien Huet',	'https://via.placeholder.com/300x400.png/005577?text=porro',	'Placeat in debitis dolores aut optio. Similique ex deserunt omnis in aperiam aliquid ut.',	'julien-huet',	'Courtois',	NULL),
(5,	'cecile.perez@tele2.fr',	'[\"ROLE_USER\"]',	'$2y$13$mQN3LBb2FmjPvwh8PEgV7OGIp7dIVe.kygGshyYjYEzcc9XRZswPu',	'Arthur de la Durand',	'https://via.placeholder.com/300x400.png/00bbcc?text=odit',	'Aspernatur aspernatur dicta aliquid veniam non consequatur. Voluptatem et accusamus eaque neque molestias et eum.',	'arthur-de-la-durand',	'Humbert',	NULL),
(6,	'mathieu.brigitte@sfr.fr',	'[\"ROLE_USER\"]',	'$2y$13$mQN3LBb2FmjPvwh8PEgV7OGIp7dIVe.kygGshyYjYEzcc9XRZswPu',	'Benoît Prevost-Hamel',	'https://via.placeholder.com/300x400.png/000055?text=quasi',	'Ab eos consequatur aut reiciendis vero incidunt aut. Quidem inventore qui placeat fugiat. Occaecati sint hic expedita velit dolor reiciendis.',	'benoit-prevost-hamel',	'Marin-la-Forêt',	NULL),
(7,	'etienne.benjamin@gregoire.com',	'[\"ROLE_USER\"]',	'$2y$13$mQN3LBb2FmjPvwh8PEgV7OGIp7dIVe.kygGshyYjYEzcc9XRZswPu',	'Émilie Dumas-Turpin',	'https://via.placeholder.com/300x400.png/00cc88?text=sapiente',	'Cumque omnis asperiores recusandae qui laborum. Sed eos officia placeat qui delectus enim. In repellendus non est amet eius.',	'emilie-dumas-turpin',	'Collin-la-Forêt',	NULL),
(8,	'laurence49@lefebvre.com',	'[\"ROLE_USER\"]',	'$2y$13$mQN3LBb2FmjPvwh8PEgV7OGIp7dIVe.kygGshyYjYEzcc9XRZswPu',	'Emmanuel du Peron',	'https://via.placeholder.com/300x400.png/0066ff?text=inventore',	'Vel autem dolorem blanditiis. Qui et maxime soluta.',	'emmanuel-du-peron',	'Gimenezdan',	NULL),
(9,	'laetitia.langlois@tele2.fr',	'[\"ROLE_USER\"]',	'$2y$13$mQN3LBb2FmjPvwh8PEgV7OGIp7dIVe.kygGshyYjYEzcc9XRZswPu',	'Adèle Poulain',	'https://via.placeholder.com/300x400.png/007744?text=repellendus',	'Voluptatibus voluptas possimus aut nobis aspernatur laborum ea. Quia dolorem atque et asperiores dolores. Quisquam sunt velit aut amet ipsam.',	'adele-poulain',	'Muller',	NULL),
(10,	'jules.roy@noos.fr',	'[\"ROLE_USER\"]',	'$2y$13$mQN3LBb2FmjPvwh8PEgV7OGIp7dIVe.kygGshyYjYEzcc9XRZswPu',	'Nath-Christine Pereira',	'https://via.placeholder.com/300x400.png/00aaee?text=placeat',	'Ut veniam quia sequi sunt qui et. Laudantium numquam minima amet officia amet eos.',	'nath-christine-pereira',	'Da Silva',	NULL),
(11,	'laine.mathilde@bazin.fr',	'[\"ROLE_USER\"]',	'$2y$13$mQN3LBb2FmjPvwh8PEgV7OGIp7dIVe.kygGshyYjYEzcc9XRZswPu',	'Claudine Ollivier',	'https://via.placeholder.com/300x400.png/009900?text=laudantium',	'Dolorem molestias aut ex quisquam. Aut labore aliquam placeat explicabo et repellendus et placeat. Enim quam a sapiente non nihil.',	'claudine-ollivier',	'Bousquet',	NULL),
(12,	'xevrard@girard.com',	'[\"ROLE_USER\"]',	'$2y$13$mQN3LBb2FmjPvwh8PEgV7OGIp7dIVe.kygGshyYjYEzcc9XRZswPu',	'Alex Robert',	'https://via.placeholder.com/300x400.png/0022bb?text=libero',	'Illum veritatis quos excepturi esse reiciendis temporibus. Est laboriosam repellendus sapiente ut est debitis illo. Earum quis et corrupti et exercitationem.',	'alex-robert',	'Lecoqboeuf',	NULL),
(13,	'astrid15@yahoo.fr',	'[\"ROLE_USER\"]',	'$2y$13$mQN3LBb2FmjPvwh8PEgV7OGIp7dIVe.kygGshyYjYEzcc9XRZswPu',	'Célina Dubois',	'https://via.placeholder.com/300x400.png/00aa66?text=doloremque',	'Aut occaecati et molestias. Rerum qui et velit.',	'celina-dubois',	'Laroche',	NULL),
(14,	'patrick.caron@bouvier.net',	'[\"ROLE_USER\"]',	'$2y$13$mQN3LBb2FmjPvwh8PEgV7OGIp7dIVe.kygGshyYjYEzcc9XRZswPu',	'Nicole Durand-Munoz',	'https://via.placeholder.com/300x400.png/002222?text=animi',	'Temporibus et deserunt modi ea tempore in repudiandae cumque. Modi est molestiae officiis voluptas hic illo. Doloribus maiores praesentium assumenda corporis.',	'nicole-durand-munoz',	'Samson',	NULL),
(15,	'tmoulin@marchand.fr',	'[\"ROLE_USER\"]',	'$2y$13$mQN3LBb2FmjPvwh8PEgV7OGIp7dIVe.kygGshyYjYEzcc9XRZswPu',	'Daniel de Marques',	'https://via.placeholder.com/300x400.png/000011?text=qui',	'Asperiores sequi et assumenda id velit. Non ducimus modi voluptatem nostrum aut est sint est. Et sed sint saepe distinctio tempore aut ullam.',	'daniel-de-marques',	'Menard',	NULL),
(16,	'patrick79@wanadoo.fr',	'[\"ROLE_USER\"]',	'$2y$13$mQN3LBb2FmjPvwh8PEgV7OGIp7dIVe.kygGshyYjYEzcc9XRZswPu',	'Éric du Marechal',	'https://via.placeholder.com/300x400.png/002244?text=expedita',	'Et dolores ab quos nostrum suscipit. Velit quis accusantium nisi totam.',	'eric-du-marechal',	'Blondel-la-Forêt',	NULL),
(17,	'michelle08@diaz.com',	'[\"ROLE_USER\"]',	'$2y$13$mQN3LBb2FmjPvwh8PEgV7OGIp7dIVe.kygGshyYjYEzcc9XRZswPu',	'Michel Guichard',	'https://via.placeholder.com/300x400.png/003366?text=delectus',	'Vel iusto rerum rem earum qui sunt aut. Natus nihil et est nulla quasi. Nesciunt aut quo est et nostrum porro doloribus.',	'michel-guichard',	'LetellierVille',	NULL),
(18,	'margot32@goncalves.fr',	'[\"ROLE_USER\"]',	'$2y$13$mQN3LBb2FmjPvwh8PEgV7OGIp7dIVe.kygGshyYjYEzcc9XRZswPu',	'William Boucher',	'https://via.placeholder.com/300x400.png/000000?text=quis',	'Et voluptates ad non nemo. Incidunt nostrum tempora laboriosam. Vero enim consequatur pariatur sed vero quia.',	'william-boucher',	'Fischer',	NULL),
(19,	'audrey72@diaz.fr',	'[\"ROLE_USER\"]',	'$2y$13$mQN3LBb2FmjPvwh8PEgV7OGIp7dIVe.kygGshyYjYEzcc9XRZswPu',	'Grégoire de Costa',	'https://via.placeholder.com/300x400.png/003322?text=est',	'Ut ut pariatur quod. Est quae magni quia.',	'gregoire-de-costa',	'Bertin',	NULL),
(20,	'adrienne.jean@albert.fr',	'[\"ROLE_USER\"]',	'$2y$13$mQN3LBb2FmjPvwh8PEgV7OGIp7dIVe.kygGshyYjYEzcc9XRZswPu',	'Laetitia Lucas',	'https://via.placeholder.com/300x400.png/00dd88?text=repudiandae',	'Quo consequatur illo voluptas neque maxime rem. Nesciunt numquam dolore ut accusantium et. Itaque perspiciatis magnam numquam corrupti.',	'laetitia-lucas',	'Rousset',	NULL),
(21,	'wmarion@perez.net',	'[\"ROLE_USER\"]',	'$2y$13$mQN3LBb2FmjPvwh8PEgV7OGIp7dIVe.kygGshyYjYEzcc9XRZswPu',	'Augustin Joseph',	'https://via.placeholder.com/300x400.png/0033ee?text=qui',	'Sapiente neque dolorem eum impedit modi eum est fuga. Sint eaque veniam illo quasi aut. Laboriosam vel dolore laborum amet distinctio qui harum repudiandae.',	'augustin-joseph',	'Marin-sur-Petit',	NULL);

-- 2021-08-26 08:17:44
