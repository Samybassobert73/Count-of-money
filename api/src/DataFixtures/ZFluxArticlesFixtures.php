<?php

namespace App\DataFixtures;

use App\Entity\User;
use App\Entity\FluxArticle;
use App\Entity\FluxArticleUser;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Crypto;

class ZFluxArticlesFixtures extends Fixture
{


    public function __construct()
    {
    }

    public function load(ObjectManager $manager): void
    {

        $fluxArticle = new FluxArticle();
        $fluxArticle->setIsHome(true);
        $fluxArticle->setUrl('https://coinacademy.fr/actu/gn');

        $manager->persist($fluxArticle);

        $fluxArticle = new FluxArticle();
        $fluxArticle->setIsHome(false);
        $fluxArticle->setUrl('https://coinjournal.net/fr/actualites/feed/');

        $manager->persist($fluxArticle);

        $users = $manager->getRepository(User::class)->findAll();
        foreach ($users as $user) {
            $fluxArticleUser = new FluxArticleUser();
            $fluxArticleUser->setUser($user);
            $fluxArticleUser->setFlux($fluxArticle);
            $fluxArticleUser->setIsFavorite(false);
            $manager->persist($fluxArticleUser);
        }

        $manager->flush();
    }
}
