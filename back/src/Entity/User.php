<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 */
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups("comments_get")
     * @Groups("posts_get")
     * @Groups("users_get")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Groups("comments_get")
     * @Groups("posts_get")
     * @Groups("users_get")
     * @Assert\Email
     */
    private $email;

    /**
     * @ORM\Column(type="json", nullable=true)
     * @Assert\Count(min=0, max=1)
     *
     * 
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=128)
     * @Groups("comments_get")
     * @Groups("posts_get")
     * @Groups("users_get")
     */
    private $username;

    /**
     * @ORM\Column(type="string", length=128)
     * @Groups("users_get")
     */
    private $slug;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("users_get")
     * @Groups("posts_get")
     */
    private $picture;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups("users_get")
     */
    private $description;

    /**
     * @ORM\OneToMany(targetEntity=Comment::class, mappedBy="user")
     */
    private $comments;

    /**
     * @ORM\OneToMany(targetEntity=Post::class, mappedBy="author")
     * @Groups("users_get")
     */
    private $posts;

    /**
     * @ORM\ManyToMany(targetEntity=Post::class, mappedBy="participants")
     * @Groups("users_get")
     */
    private $events;

    /**
     * @ORM\OneToMany(targetEntity=Practices::class, mappedBy="practitioner", cascade={"persist"})
     * @Groups("users_get")
     */
    private $practicedSports;

    /**
     * @ORM\Column(type="string", length=128, nullable=true)
     * @Groups("users_get")
     */
    private $location;

    public function __construct()
    {
        $this->comments = new ArrayCollection();
        $this->posts = new ArrayCollection();
        $this->events = new ArrayCollection();
        $this->practicedSports = new ArrayCollection();
    }

    public function __toString(): string
    {
        return $this->email;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
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
     * @deprecated since Symfony 5.3, use getUserIdentifier instead
     */
    public function getUsername(): string
    {
        return (string) $this->username;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        // on n'a pas besoin de ca si on s'assure que nos users ont au moins 1 role associe
        // $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

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

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    public function getPicture(): ?string
    {
        return $this->picture;
    }

    public function setPicture(string $picture): self
    {
        $this->picture = $picture;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return Collection|Comment[]
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    public function addComment(Comment $comment): self
    {
        if (!$this->comments->contains($comment)) {
            $this->comments[] = $comment;
            $comment->setUser($this);
        }

        return $this;
    }

    public function removeComment(Comment $comment): self
    {
        if ($this->comments->removeElement($comment)) {
            // set the owning side to null (unless already changed)
            if ($comment->getUser() === $this) {
                $comment->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Post[]
     */
    public function getPosts(): Collection
    {
        return $this->posts;
    }

    public function addPost(Post $post): self
    {
        if (!$this->posts->contains($post)) {
            $this->posts[] = $post;
            $post->setAuthor($this);
        }

        return $this;
    }

    public function removePost(Post $post): self
    {
        if ($this->posts->removeElement($post)) {
            // set the owning side to null (unless already changed)
            if ($post->getAuthor() === $this) {
                $post->setAuthor(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Post[]
     */
    public function getEvents(): Collection
    {
        return $this->events;
    }

    public function addEvent(Post $event): self
    {
        if (!$this->events->contains($event)) {
            $this->events[] = $event;
            $event->addParticipant($this);
        }

        return $this;
    }

    public function removeEvent(Post $event): self
    {
        if ($this->events->removeElement($event)) {
            $event->removeParticipant($this);
        }

        return $this;
    }

    /**
     * @return Collection|Practices[]
     */
    public function getPracticedSports(): Collection
    {
        return $this->practicedSports;
    }

    public function addPracticedSport(Practices $practicedSport): self
    {
        if (!$this->practicedSports->contains($practicedSport)) {
            $this->practicedSports[] = $practicedSport;
            $practicedSport->setPractitioner($this);
        }

        return $this;
    }

    public function removePracticedSport(Practices $practicedSport): self
    {
        if ($this->practicedSports->removeElement($practicedSport)) {
            // set the owning side to null (unless already changed)
            if ($practicedSport->getPractitioner() === $this) {
                $practicedSport->setPractitioner(null);
            }
        }

        return $this;
    }

    /**
     * Get the value of slug
     */ 
    public function getSlug()
    {
        return $this->slug;
    }

    /**
     * Set the value of slug
     *
     * @return  self
     */ 
    public function setSlug($slug)
    {
        $this->slug = $slug;

        return $this;
    }

    public function getLocation(): ?string
    {
        return $this->location;
    }

    public function setLocation(?string $location): self
    {
        $this->location = $location;

        return $this;
    }

   
}
