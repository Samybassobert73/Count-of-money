<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\AdressRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: AdressRepository::class)]
#[ApiResource(normalizationContext: ['groups' => ['adress']])]
#[ApiResource]
class Adress
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['user', 'adress'])]
    #[ORM\Column(length: 100, nullable: true)]
    private ?string $line1 = null;

    #[Groups(['user', 'adress'])]
    #[ORM\Column(length: 100, nullable: true)]
    private ?string $line2 = null;

    #[ORM\Column(length: 100, nullable: true)]
    private ?string $line3 = null;

    #[Groups(['user', 'adress'])]
    #[ORM\Column(length: 10, nullable: true)]
    private ?string $postal_code = null;

    #[Groups(['user', 'adress'])]
    #[ORM\Column(length: 50, nullable: true)]
    private ?string $city = null;

    #[Groups(['user', 'adress'])]
    #[ORM\Column(length: 50, nullable: true)]
    private ?string $country = null;

    #[ORM\OneToMany(mappedBy: 'adress', targetEntity: UserAdress::class, orphanRemoval: true)]
    private Collection $users;

    public function __construct()
    {
        $this->users = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLine1(): ?string
    {
        return $this->line1;
    }

    public function setLine1(?string $line1): self
    {
        $this->line1 = $line1;

        return $this;
    }

    public function getLine2(): ?string
    {
        return $this->line2;
    }

    public function setLine2(?string $line2): self
    {
        $this->line2 = $line2;

        return $this;
    }

    public function getLine3(): ?string
    {
        return $this->line3;
    }

    public function setLine3(?string $line3): self
    {
        $this->line3 = $line3;

        return $this;
    }

    public function getPostalCode(): ?string
    {
        return $this->postal_code;
    }

    public function setPostalCode(?string $postal_code): self
    {
        $this->postal_code = $postal_code;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(?string $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getCountry(): ?string
    {
        return $this->country;
    }

    public function setCountry(?string $country): self
    {
        $this->country = $country;

        return $this;
    }

    /**
     * @return Collection<int, UserAdress>
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(UserAdress $user): self
    {
        if (!$this->users->contains($user)) {
            $this->users->add($user);
            $user->setAdress($this);
        }

        return $this;
    }

    public function removeUser(UserAdress $user): self
    {
        if ($this->users->removeElement($user)) {
            // set the owning side to null (unless already changed)
            if ($user->getAdress() === $this) {
                $user->setAdress(null);
            }
        }

        return $this;
    }
}
