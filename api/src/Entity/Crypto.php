<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\CryptoRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CryptoRepository::class)]
#[ApiFilter(SearchFilter::class, properties: ['isHome' => 'exact'])]
#[ApiResource]
class Crypto
{
    #[Groups(['user', 'user_cryptos'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['user', 'user_cryptos'])]
    #[ORM\Column(length: 50)]
    private ?string $symbol = null;

    #[Groups(['user', 'user_cryptos'])]
    #[ORM\Column(length: 50)]
    private ?string $baseAsset = null;

    #[Groups(['user', 'user_cryptos'])]
    #[ORM\Column(length: 50)]
    private ?string $quoteAsset = null;

    #[Groups('user')]
    #[ORM\Column]
    private ?bool $isHome = null;

    #[ORM\OneToMany(mappedBy: 'crypto', targetEntity: UserCrypto::class)]
    private Collection $user;

    public function __construct()
    {
        $this->user = new ArrayCollection();
    }


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSymbol(): ?string
    {
        return $this->symbol;
    }

    public function setSymbol(string $symbol): self
    {
        $this->symbol = $symbol;

        return $this;
    }

    public function getBaseAsset(): ?string
    {
        return $this->baseAsset;
    }

    public function setBaseAsset(string $base_asset): self
    {
        $this->baseAsset = $base_asset;

        return $this;
    }

    public function getQuoteAsset(): ?string
    {
        return $this->quoteAsset;
    }

    public function setQuoteAsset(string $quote_asset): self
    {
        $this->quoteAsset = $quote_asset;

        return $this;
    }

    public function getIsHome(): ?bool
    {
        return $this->isHome;
    }

    public function setIsHome(bool $is_home): self
    {
        $this->isHome = $is_home;

        return $this;
    }

    /**
     * @return Collection<int, UserCrypto>
     */
    public function getUser(): Collection
    {
        return $this->user;
    }

    public function addUser(UserCrypto $user): self
    {
        if (!$this->user->contains($user)) {
            $this->user->add($user);
            $user->setCrypto($this);
        }

        return $this;
    }

    public function removeUser(UserCrypto $user): self
    {
        if ($this->user->removeElement($user)) {
            // set the owning side to null (unless already changed)
            if ($user->getCrypto() === $this) {
                $user->setCrypto(null);
            }
        }

        return $this;
    }
}
