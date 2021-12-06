<?php

namespace App\DataFixtures;

use Faker;
use DateTime;
use App\Entity\Post;
use App\Entity\User;
use App\Entity\Sport;
use App\Entity\Comment;
use App\Entity\Category;
use App\Entity\Practices;
use App\Service\MySlugger;
use Doctrine\DBAL\Connection;
use Doctrine\Persistence\ObjectManager;
use App\DataFixtures\Provider\ProviderDB;
use Doctrine\Bundle\FixturesBundle\Fixture;

class AppFixtures extends Fixture
{
      // Le service MySlugger
    private $mySlugger;

    // La connexion directe (DBAL)
    private $connection;

    // Injection des services nécessaires
    public function __construct(MySlugger $mySlugger, Connection $connection)
    {
        $this->mySlugger = $mySlugger;
        $this->connection = $connection;
    }

 
    private function truncate()
     {
         // On passen mode SQL ! On cause avec MySQL
         // Désactivation des contraintes FK
         $this->connection->executeQuery('SET foreign_key_checks = 0');
         // On tronque les id
         $this->connection->executeQuery('TRUNCATE TABLE category');
         $this->connection->executeQuery('TRUNCATE TABLE comment');
         $this->connection->executeQuery('TRUNCATE TABLE post');
         $this->connection->executeQuery('TRUNCATE TABLE practices');
         $this->connection->executeQuery('TRUNCATE TABLE sport');
         $this->connection->executeQuery('TRUNCATE TABLE user');
         // etc.
     }

    public function load(ObjectManager $manager)
    {
        // On va truncate nos tables à la main pour revenir à id=1
        $this->truncate();

        $faker = Faker\Factory::create('fr_FR');

        // Si on veut toujours les mêmes données
        $faker->seed('BABAR');

        $faker->addProvider(new ProviderDB);

        // Creation of an admin account
        $admin = new User();
        $admin->setEmail('admin@admin.com');
        $admin->setUsername('admin'); // password : admin
        $admin->setSlug($this->mySlugger->slugify($admin->getUsername()));
        $admin->setPicture($faker->imageUrl(300, 400));
        $admin->setLocation($faker->city);
        $admin->setDescription($faker->paragraph(2));
        $admin->setPassword('$2y$13$NDxTz76WAk/EOgPEY0Fm0ONxy1z3nNcO2mX/.7wjNX45Ku2Cbr4dy');
        $admin->setRoles(['ROLE_ADMIN']);

        $manager->persist($admin);

        $sportsList = [];
        /*
        for($i = 1; $i <= 20; $i++){
            $sport = new Sport;
            $sport->setName($faker->unique(true)->randomSport);
            $sport->setSlug($this->mySlugger->slugify($sport->getName()));
            $sport->setPicture($faker->imageUrl(300, 400));
            $sportsList[] = $sport;
            $manager->persist($sport);
        }*/

        $categoriesList = [];
        /*
        for($i = 1; $i <= 10; $i++){
            $category = new Category;
            $category->setName($faker->unique(true)->randomCategory);

            for ($p = 1; $p <= rand(2,4); $p++) {
            $category->addSport($sportsList[array_rand($sportsList)]);
            }

            $categoriesList[] = $category;
            $manager->persist($category);
        }*/

        
        $usersList = [];

        for($i = 1; $i <= 20; $i++){
            $user = new User;
            $user->setEmail($faker->email);
            $user->setUsername($faker->name());
            $user->setSlug($this->mySlugger->slugify($user->getUsername()));
            $user->setPicture($faker->imageUrl(300, 400));
            $user->setLocation($faker->city);
            $user->setDescription($faker->paragraph(2));
            $user->setPassword('$2y$13$mQN3LBb2FmjPvwh8PEgV7OGIp7dIVe.kygGshyYjYEzcc9XRZswPu'); // password : password
            $user->setRoles(['ROLE_USER']);
            $usersList[] = $user;
            $manager->persist($user);
        }
        
        $postsList = [];

        for($i = 1; $i <= 20; $i++){
            $post = new Post;
            $post->setTitle($faker->sentence());
            $post->setSlug($this->mySlugger->slugify($post->getTitle()));
            $post->setActive(rand(0,1));
            $post->setDescription($faker->paragraph(5));
            $post->setLevel(rand(1,3));
            $post->setLocation($faker->city);
            $post->setMinParticipants(rand(2,5));
            $post->setMaxParticipants(rand(6, 12));
            $post->setEventDate(new DateTime($faker->date('Y-m-d')));
            $post->setCreatedAt(new DateTime('1998-03-07'));
            $post->setSport(($sportsList[array_rand($sportsList)]));
            $post->setAuthor($usersList[array_rand($usersList)]);
            $post->addParticipant($usersList[array_rand($usersList)]);
            $post->addParticipant($usersList[array_rand($usersList)]);
            $postsList[] = $post;
            $manager->persist($post);
        }
        
        
        $commentsList = [];

        for($i = 1; $i <= 20; $i++){
            $comment = new Comment;
            $comment->setContent('Comment ' . $i);
            $comment->setCreatedAt(new DateTime());
            $comment->setUser($usersList[array_rand($usersList)]) ;
            $comment->setPost($postsList[array_rand($postsList)]) ;
            $commentsList[] = $comment;
            $manager->persist($comment);
        }
        
        $practicesList = [];

        for($i = 1; $i <= 20; $i++){
            $practices = new Practices;
            $practices->setLevel(rand(1,3));
            $practices->setPractitioner($usersList[array_rand($usersList)]);
            $practices->setSport($sportsList[array_rand($sportsList)]);
           
            $practicesList[] = $practices;
            $manager->persist($practices);
        }


        $manager->flush();
    }
}
