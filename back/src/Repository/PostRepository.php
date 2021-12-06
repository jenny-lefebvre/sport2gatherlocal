<?php

namespace App\Repository;

use App\Entity\Post;
use App\Entity\Sport;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\Query\Expr\Join;

/**
 * @method Post|null find($id, $lockMode = null, $lockVersion = null)
 * @method Post|null findOneBy(array $criteria, array $orderBy = null)
 * @method Post[]    findAll()
 * @method Post[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PostRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Post::class);
    }

// To make it simpler for the front, we decided to change the location and sport by their 'slugified' form

        public function findAllOrderByDate()
        {
            return $this->findBy(array(), array('eventDate' => 'ASC'));
        }

// tri de nos posts par lieu
    public function findAllByPlace($location)
    {
        // C'est le Manager qui va nous permettre d'écrire une requête en DQL
        $entityManager = $this->getEntityManager();

        $query = $entityManager->createQuery(
            'SELECT p
            FROM App\Entity\Post p
            WHERE p.slug = :location
            ORDER BY p.eventDate ASC'
            
        )->setParameter('location', $location);
         


        return $query->getResult();
    }

// tri de nos posts par sport
    public function findAllBySport($sport)
    {


        // C'est le Manager qui va nous permettre d'écrire une requête en DQL
        $entityManager = $this->getEntityManager();

        $query = $entityManager->createQuery(
            'SELECT p
            FROM App\Entity\Post p
            JOIN App\Entity\Sport s 
            WITH p.sport = s.id
            WHERE s.slug = :sport
            ORDER BY p.eventDate ASC'
        )->setParameter('sport', $sport);

        return $query->getResult();
    }

// tri de nos posts par date
    public function findAllByDate($eventDate)
    {


        // C'est le Manager qui va nous permettre d'écrire une requête en DQL
        $entityManager = $this->getEntityManager();

        $query = $entityManager->createQuery(
            'SELECT p
        FROM App\Entity\Post p
        WHERE p.eventDate = :eventDate
        ORDER BY p.eventDate ASC'
        )->setParameter('eventDate', $eventDate);

        // returns an array of Post objects
        return $query->getResult();
    }

// tri de nos posts par sport et/ou lieu et/ou date    
    public function findAllByParameters($sport, $location, $eventDate)
    {



        $entityManager = $this->getEntityManager();

        if($sport == '*' && $location == '*' && $eventDate == '*'){
            return $this->findAll();
        }
        
        if ($eventDate == '*' && $location == '*') {
            $query = $entityManager->createQuery(
                'SELECT p
            FROM App\Entity\Post p
            JOIN App\Entity\Sport s 
            WITH p.sport = s.id
            WHERE s.slug = :sport
            ORDER BY p.eventDate ASC'
            )->setParameter('sport', $sport);

            return $query->getResult();
        }

        if ($sport == '*' && $location == '*') {
            $query = $entityManager->createQuery(
                'SELECT p
            FROM App\Entity\Post p
            WHERE p.eventDate LIKE :eventDate
            ORDER BY p.eventDate ASC'
            )->setParameter('eventDate', $eventDate . '%');

            return $query->getResult();
        }

        if ($sport == '*' && $eventDate == '*') {
            
            $query = $entityManager->createQuery(
                'SELECT p
            FROM App\Entity\Post p
            WHERE p.slug = :location 
            ORDER BY p.eventDate ASC'
            ) ->setParameter('location', $location);
    
            return $query->getResult();
           
        }

        if ($location == '*') {
            $query = $entityManager->createQuery(
                'SELECT p
            FROM App\Entity\Post p
            JOIN App\Entity\Sport s 
            WITH p.sport = s.id
            WHERE s.slug = :sport
            AND p.eventDate LIKE :eventDate
            ORDER BY p.eventDate ASC'
            )->setParameter('sport', $sport)
                ->setParameter('eventDate', $eventDate . '%');

            return $query->getResult();
        }

        if ($eventDate == '*') {
            $query = $entityManager->createQuery(
                'SELECT p
            FROM App\Entity\Post p
            JOIN App\Entity\Sport s 
            WITH p.sport = s.id
            WHERE s.slug = :sport
            AND p.slug = :location 
            ORDER BY p.eventDate ASC'
            )->setParameter('sport', $sport)
                ->setParameter('location', $location);

            return $query->getResult();
        }

        if ($sport == '*') {
            $query = $entityManager->createQuery(
                'SELECT p
            FROM App\Entity\Post p
            -- Here we put LIKE and add the wildcard to the parameters so that we only need the beginning of the date for it to work
            WHERE p.eventDate LIKE :eventDate
            AND p.slug = :location 
            ORDER BY p.eventDate ASC'
            )->setParameter('location', $location)
             ->setParameter('eventDate', $eventDate . '%');
    
            return $query->getResult();
        }
        
        $query = $entityManager->createQuery(
            'SELECT p
        FROM App\Entity\Post p
        JOIN App\Entity\Sport s 
        WITH p.sport = s.id
        WHERE s.slug = :sport
        -- Here we put LIKE and add the wildcard to the parameters so that we only need the beginning of the date for it to work
        AND p.eventDate LIKE :eventDate
        AND p.slug = :location 
        ORDER BY p.eventDate ASC'
        )->setParameter('sport', $sport)
            ->setParameter('location', $location)
            ->setParameter('eventDate', $eventDate . '%');

        return $query->getResult();
    }

    public function randomPosts()
    {
         // C'est le Manager qui va nous permettre d'écrire une requête en DQL
         /*$entityManager = $this->getEntityManager();

         $query = $entityManager->createQuery(
             'SELECT s
             FROM App\Entity\Sport s
             ORDER BY RAND()');
         $query->setParameter(3,3);    
 
 
         return $query->getResult();*/

         // get all sports
        $posts = $this->findAll();
        // shuffle records
        shuffle($posts);
        return $posts;
    }




    // /**
    //  * @return Post[] Returns an array of Post objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('p.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Post
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
