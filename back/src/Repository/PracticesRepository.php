<?php

namespace App\Repository;

use App\Entity\Practices;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Practices|null find($id, $lockMode = null, $lockVersion = null)
 * @method Practices|null findOneBy(array $criteria, array $orderBy = null)
 * @method Practices[]    findAll()
 * @method Practices[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PracticesRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Practices::class);
    }

    // /**
    //  * @return Practices[] Returns an array of Practices objects
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
    public function findOneBySomeField($value): ?Practices
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
