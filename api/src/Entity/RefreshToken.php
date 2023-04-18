<?php

namespace App\Entity;

use App\Repository\RefreshTokenRepository;
use Doctrine\ORM\Mapping as ORM;
use Gesdinet\JWTRefreshTokenBundle\Doctrine\RefreshTokenRepositoryInterface;
use Gesdinet\JWTRefreshTokenBundle\Entity\RefreshToken as BaseRefreshToken;

#[ORM\Entity(repositoryClass: RefreshTokenRepository::class)]
class RefreshToken extends BaseRefreshToken
{
    public function find($id)
    {
        // TODO: Implement find() method.
    }

    public function findAll()
    {
        // TODO: Implement findAll() method.
    }

    public function findBy(array $criteria, ?array $orderBy = null, ?int $limit = null, ?int $offset = null)
    {
        // TODO: Implement findBy() method.
    }

    public function findOneBy(array $criteria)
    {
        // TODO: Implement findOneBy() method.
    }

    public function getClassName()
    {
        // TODO: Implement getClassName() method.
    }

    public function findInvalid($datetime = null)
    {
        // TODO: Implement findInvalid() method.
    }
}
