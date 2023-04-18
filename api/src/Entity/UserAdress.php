<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\UserAdressRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: UserAdressRepository::class)]
#[ApiResource(normalizationContext: ['groups' => ['adress']])]
#[ApiResource]
class UserAdress
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?bool $isPrincipal = null;

    #[Groups(['user', 'adress'])]
    #[ORM\ManyToOne(inversedBy: 'adresses')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    #[Groups(['user', 'adress'])]
    #[ORM\ManyToOne(cascade: ['persist'], inversedBy: 'users')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Adress $adress = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function isPrincipal(): ?bool
    {
        return $this->isPrincipal;
    }

    public function setPrincipal(bool $isPrincipal): self
    {
        $this->isPrincipal = $isPrincipal;

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

    public function getAdress(): ?Adress
    {
        return $this->adress;
    }

    public function setAdress(?Adress $adress): self
    {
        $this->adress = $adress;

        return $this;
    }
}
