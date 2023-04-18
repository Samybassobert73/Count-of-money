<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\User;
use App\Entity\Crypto;
use App\Entity\UserCrypto;
use App\Entity\Adress;
use App\Entity\UserAdress;
use Ramsey\Uuid\Uuid;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Doctrine\Persistence\ManagerRegistry;


class UserFixtures extends Fixture
{
    private UserPasswordHasherInterface $encoder;

    public function __construct(UserPasswordHasherInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager): void
    {
        // creation user 
        $password = "password";

        $myuuid = Uuid::uuid4();
        $user = new User();
        $user->setEmail('user@epitech.eu');
        $user->setName('user');
        $user->setLastname('userLastname');
        $user->setUsername('userUsername');
        $hash = $this->encoder->hashPassword($user, $password);
        $user->setPassword($hash);
        $user->setVerified(false);
        $user->setRoles(['ROLE_USER']);
        $user->setUuid($myuuid);

        $adress = new Adress();
        $adress->setLine1('rue de la paix');
        $adress->setCity('Paris');
        $adress->setPostalCode('75000');
        $adress->setCountry('France');

        $userAdress = new UserAdress;
        $userAdress->setUser($user);
        $userAdress->setAdress($adress);
        $userAdress->setPrincipal(true);

        // creation admin 
        $adminuuid = Uuid::uuid4();
        $admin = new User();
        $admin->setEmail('admin@epitech.eu');
        $admin->setName('admin');
        $admin->setLastname('adminLastname');
        $admin->setUsername('adminUsername');
        $hashAdmin = $this->encoder->hashPassword($admin, $password);
        $admin->setPassword($hashAdmin);
        $admin->setVerified(false);
        $admin->setRoles(['ROLE_ADMIN']);
        $admin->setUuid($adminuuid);

        $userAdress2 = new UserAdress;
        $userAdress2->setUser($admin);
        $userAdress2->setAdress($adress);
        $userAdress2->setPrincipal(true);

        $manager->persist($userAdress);
        $manager->persist($userAdress2);
        $manager->persist($admin);
        $manager->persist($user);


        // get crypto from db and add to user
        $cryptos = $manager->getRepository(Crypto::class)->findAll();

        $randomCrypto = $cryptos[array_rand($cryptos)];
        $userCrypto = new UserCrypto();
        $userCrypto->setUser($user);
        $userCrypto->setCrypto($randomCrypto);
        $userCrypto->setIsFavorite(true);
        $userCrypto->setIsHome(1);
        $randomCrypto->setIsHome(true);
        $manager->persist($userCrypto);

        $randomCryptoAdmin = $cryptos[array_rand($cryptos)];
        $userCryptoAdmin = new UserCrypto();
        $userCryptoAdmin->setUser($admin);
        $userCryptoAdmin->setCrypto($randomCryptoAdmin);
        $userCryptoAdmin->setIsFavorite(true);
        $userCryptoAdmin->setIsHome(1);
        $randomCryptoAdmin->setIsHome(true);
        $manager->persist($userCryptoAdmin);

        $manager->flush();
    }
}
