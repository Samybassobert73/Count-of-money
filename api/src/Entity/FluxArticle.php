<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\FluxArticleRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: FluxArticleRepository::class)]
#[ApiResource(normalizationContext: ['groups' => ['flux']])]
#[ApiResource]
class FluxArticle
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['flux', 'user'])]
    #[ORM\Column(type: Types::TEXT)]
    private ?string $url = null;

    #[Groups('flux')]
    #[ORM\Column]
    private ?bool $isHome = null;

    #[ORM\OneToMany(mappedBy: 'flux', targetEntity: FluxArticleUser::class)]
    #[Groups('flux')]
    private Collection $fluxArticleUsers;

    public function __construct()
    {
        $this->fluxArticleUsers = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUrl(): ?string
    {
        return $this->url;
    }

    public function setUrl(string $url): self
    {
        $this->url = $url;

        return $this;
    }

    public function isIsHome(): ?bool
    {
        return $this->isHome;
    }

    public function setIsHome(bool $isHome): self
    {
        $this->isHome = $isHome;

        return $this;
    }

    /**
     * @return Collection<int, FluxArticleUser>
     */
    public function getFluxArticleUsers(): Collection
    {
        return $this->fluxArticleUsers;
    }

    public function addFluxArticleUser(FluxArticleUser $fluxArticleUser): self
    {
        if (!$this->fluxArticleUsers->contains($fluxArticleUser)) {
            $this->fluxArticleUsers->add($fluxArticleUser);
            $fluxArticleUser->setFlux($this);
        }

        return $this;
    }

    public function removeFluxArticleUser(FluxArticleUser $fluxArticleUser): self
    {
        if ($this->fluxArticleUsers->removeElement($fluxArticleUser)) {
            // set the owning side to null (unless already changed)
            if ($fluxArticleUser->getFlux() === $this) {
                $fluxArticleUser->setFlux(null);
            }
        }

        return $this;
    }
}
