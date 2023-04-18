<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\FluxArticleUserRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: FluxArticleUserRepository::class)]
#[ApiResource(normalizationContext: ['groups' => ['flux']])]
class FluxArticleUser
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?bool $isFavorite = null;

    #[Groups(['flux', 'user'])]
    #[ORM\ManyToOne(inversedBy: 'fluxArticleUsers')]
    #[ORM\JoinColumn(nullable: false)]
    private ?FluxArticle $flux = null;

    #[Groups('flux')]
    #[ORM\ManyToOne(inversedBy: 'fluxArticle')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function isIsFavorite(): ?bool
    {
        return $this->isFavorite;
    }

    public function setIsFavorite(bool $isFavorite): self
    {
        $this->isFavorite = $isFavorite;

        return $this;
    }


    public function getFlux(): ?FluxArticle
    {
        return $this->flux;
    }

    public function setFlux(?FluxArticle $flux): self
    {
        $this->flux = $flux;

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
}
