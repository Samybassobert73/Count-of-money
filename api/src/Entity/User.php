<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\Uuid;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ApiResource(normalizationContext: ['groups' => ['user']])]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['user', 'adress', 'flux'])]
    #[ORM\Column(type: 'string', length: 255, unique: true)]
    private ?string $uuid = null;

    #[Groups(['user', 'adress', 'flux'])]
    #[ORM\Column(type: 'string', length: 30, unique: true)]
    private ?string $username = null;

    #[Groups(['user', 'adress', 'flux'])]
    #[ORM\Column(type: 'string', length: 30)]
    private ?string $name = null;

    #[Groups(['user', 'adress', 'flux'])]
    #[ORM\Column(type: 'string', length: 30)]
    private ?string $lastname = null;

    #[Groups(['user', 'adress', 'flux'])]
    #[ORM\Column(type: 'string', length: 100, unique: true)]
    private ?string $email = null;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private ?string $password = NULL;

    #[ORM\Column(type: 'boolean')]
    private ?string $isVerified = null;

    #[Groups('user')]
    #[ORM\Column(type: 'text', nullable: true)]
    private mixed $avatar;

    #[Groups('user')]
    #[ORM\Column(type: 'text', unique: true, nullable: true)]
    private mixed $token;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private mixed $googleId;

    #[Groups('user')]
    #[ORM\Column]
    private array $roles = [];

    #[Groups('user')]
    #[ORM\OneToMany(mappedBy: 'user', targetEntity: UserCrypto::class)]
    private Collection $crypto;

    #[Groups('user')]
    #[ORM\OneToMany(mappedBy: 'user', targetEntity: UserAdress::class, orphanRemoval: true)]
    private Collection $adresses;

    #[Groups('user')]
    #[ORM\OneToMany(mappedBy: 'user', targetEntity: FluxArticleUser::class, orphanRemoval: true)]
    private Collection $fluxArticle;

    public function __construct()
    {
        $this->uuid = Uuid::uuid4();
        $this->isVerified = false;
        $this->crypto = new ArrayCollection();
        $this->adresses = new ArrayCollection();
        $this->fluxArticle = new ArrayCollection();
    }

    /**
    * A visual identifier that represents this user.
    *
    * @see UserInterface
    */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @return int|null
     */
    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @param int|null $id
     */
    public function setId(?int $id): void
    {
        $this->id = $id;
    }

    /**
     * @return string|null
     */
    public function getUuid(): ?string
    {
        return $this->uuid;
    }

    /**
     * @param string|null $uuid
     */
    public function setUuid(?string $uuid): void
    {
        $this->uuid = $uuid;
    }

    /**
     * @return string|null
     */
    public function getUsername(): ?string
    {
        return $this->username;
    }

    /**
     * @param string|null $username
     */
    public function setUsername(?string $username): void
    {
        $this->username = $username;
    }

    /**
     * @return string|null
     */
    public function getName(): ?string
    {
        return $this->name;
    }

    /**
     * @param string|null $name
     */
    public function setName(?string $name): void
    {
        $this->name = $name;
    }

    /**
     * @return string|null
     */
    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    /**
     * @param string|null $lastname
     */
    public function setLastname(?string $lastname): void
    {
        $this->lastname = $lastname;
    }

    /**
     * @return string|null
     */
    public function getEmail(): ?string
    {
        return $this->email;
    }

    /**
     * @param string|null $email
     */
    public function setEmail(?string $email): void
    {
        $this->email = $email;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @return string|null
     */
    public function getVerified(): ?string
    {
        return $this->isVerified;
    }

    /**
     * @param string|null $isVerified
     */
    public function setVerified(?string $isVerified): void
    {
        $this->isVerified = $isVerified;
    }

    /**
     * @return mixed
     */
    public function getAvatar(): mixed
    {
        return $this->avatar;
    }

    /**
     * @param mixed $avatar
     */
    public function setAvatar(mixed $avatar): void
    {
        $this->avatar = $avatar;
    }

    /**
     * @return mixed
     */
    public function getToken(): mixed
    {
        return $this->token;
    }

    /**
     * @param mixed $token
     */
    public function setToken(mixed $token): void
    {
        $this->token = $token;
    }

    /**
     * @return mixed
     */
    public function getGoogleId(): mixed
    {
        return $this->googleId;
    }

    /**
     * @param mixed $googleId
     */
    public function setGoogleId(mixed $googleId): void
    {
        $this->googleId = $googleId;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * Returning a salt is only needed, if you are not using a modern
     * hashing algorithm (e.g. bcrypt or sodium) in your security.yaml.
     *
     * @see UserInterface
     */
    public function getSalt(): ?string
    {
        return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    /**
     * @return Collection<int, UserCrypto>
     */
    public function getCrypto(): Collection
    {
        return $this->crypto;
    }

    public function addCrypto(UserCrypto $crypto): self
    {
        if (!$this->crypto->contains($crypto)) {
            $this->crypto->add($crypto);
            $crypto->setUser($this);
        }

        return $this;
    }

    public function removeCrypto(UserCrypto $crypto): self
    {
        if ($this->crypto->removeElement($crypto)) {
            // set the owning side to null (unless already changed)
            if ($crypto->getUser() === $this) {
                $crypto->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, UserAdress>
     */
    public function getAdresses(): Collection
    {
        return $this->adresses;
    }

    public function addAdress(UserAdress $adress): self
    {
        if (!$this->adresses->contains($adress)) {
            $this->adresses->add($adress);
            $adress->setUser($this);
        }

        return $this;
    }

    public function removeAdress(UserAdress $adress): self
    {
        if ($this->adresses->removeElement($adress)) {
            // set the owning side to null (unless already changed)
            if ($adress->getUser() === $this) {
                $adress->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, FluxArticleUser>
     */
    public function getFluxArticle(): Collection
    {
        return $this->fluxArticle;
    }

    public function addFluxArticle(FluxArticleUser $fluxArticle): self
    {
        if (!$this->fluxArticle->contains($fluxArticle)) {
            $this->fluxArticle->add($fluxArticle);
            $fluxArticle->setUser($this);
        }

        return $this;
    }

    public function removeFluxArticle(FluxArticleUser $fluxArticle): self
    {
        if ($this->fluxArticle->removeElement($fluxArticle)) {
            // set the owning side to null (unless already changed)
            if ($fluxArticle->getUser() === $this) {
                $fluxArticle->setUser(null);
            }
        }

        return $this;
    }
}
