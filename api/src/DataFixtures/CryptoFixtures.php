<?php

namespace App\DataFixtures;

use App\Entity\User;
use App\Entity\UserCrypto;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Crypto;

class CryptoFixtures extends Fixture
{
    private EntityManagerInterface $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function load(ObjectManager $manager): void
    {
        // create crypto database with json file
        $json = file_get_contents(__DIR__ . '/crypto.json');
        $data = json_decode($json, true);

        foreach ($data as $obj) {
            $crypto = new Crypto();
            $crypto->setSymbol($obj["symbol"]);
            $crypto->setBaseAsset($obj["baseAsset"]);
            $crypto->setQuoteAsset($obj["quoteAsset"]);
            $crypto->setIsHome(false);

            $manager->persist($crypto);
        }

        $manager->flush();
    }
}
