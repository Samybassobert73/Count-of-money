<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\UserCryptoRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: UserCryptoRepository::class)]
#[ApiFilter(SearchFilter::class, properties: ['user' => 'exact', 'crypto' => 'exact'])]
#[ApiResource(normalizationContext: ['groups' => ['user_cryptos']])]
#[ApiResource]
class UserCrypto
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups('user_cryptos')]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups('user')]
    private ?bool $isHome = null;

    #[ORM\Column]
    #[Groups('user')]
    private ?bool $isFavorite = null;

    #[ORM\ManyToOne(cascade: ['persist'], inversedBy: 'crypto')]
    private ?User $user = null;

    #[Groups(['user', "user_cryptos"])]
    #[ORM\ManyToOne(cascade: ['persist'], inversedBy: 'user')]
    private ?Crypto $crypto = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIsHome(): ?bool
    {
        return $this->isHome;
    }

    public function setIsHome(bool $isHome): self
    {
        $this->isHome = $isHome;

        return $this;
    }

    public function getIsFavorite(): ?bool
    {
        return $this->isFavorite;
    }

    public function setIsFavorite(bool $is_favorite): self
    {
        $this->isFavorite = $is_favorite;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getCrypto(): ?Crypto
    {
        return $this->crypto;
    }

    public function setCrypto(?Crypto $crypto): self
    {
        $this->crypto = $crypto;

        return $this;
    }
}
