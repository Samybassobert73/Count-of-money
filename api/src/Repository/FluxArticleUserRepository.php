<?php

namespace App\Repository;

use App\Entity\FluxArticleUser;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<FluxArticleUser>
 *
 * @method FluxArticleUser|null find($id, $lockMode = null, $lockVersion = null)
 * @method FluxArticleUser|null findOneBy(array $criteria, array $orderBy = null)
 * @method FluxArticleUser[]    findAll()
 * @method FluxArticleUser[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class FluxArticleUserRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, FluxArticleUser::class);
    }

    public function save(FluxArticleUser $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(FluxArticleUser $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return FluxArticleUser[] Returns an array of FluxArticleUser objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('f')
//            ->andWhere('f.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('f.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?FluxArticleUser
//    {
//        return $this->createQueryBuilder('f')
//            ->andWhere('f.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
