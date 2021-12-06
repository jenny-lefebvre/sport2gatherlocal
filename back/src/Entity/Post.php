<?php

namespace App\Entity;

use DateTime;
use App\Service\MySlugger;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\PostRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\String\Slugger\SluggerInterface;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=PostRepository::class)
 */
class Post
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
     * @ORM\Column(type="string", length=128)
     * @Groups("comments_get")
     * @Groups("posts_get")
     * @Groups("users_get")
     * @Assert\NotBlank
     */
    private $title;

    /**
     * @ORM\Column(type="string", length=128)
     * @Groups("comments_get")
     * @Groups("posts_get")
     */
    private $slug;

    /**
     * @ORM\Column(type="boolean")
     * @Groups("posts_get")
     */
    private $active;

    /**
     * @ORM\Column(type="text")
     * @Groups("posts_get")
     * @Assert\NotBlank
     */
    private $description;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups("posts_get")
     * @Assert\Choice({1, 2, 3})
     */
    private $level;

    /**
     * @ORM\Column(type="string", length=128)
     * @Groups("posts_get")
     * @Assert\NotBlank
     */
    private $location;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups("posts_get")
     */
    private $minParticipants;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups("posts_get")
     */
    private $maxParticipants;

    /**
     * @ORM\Column(type="datetime")
     * @Groups("posts_get")
     * @Assert\NotBlank
     */
    private $eventDate;

    /**
     * @ORM\Column(type="datetime")
     * @Groups("posts_get")
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups("posts_get")
     */
    private $updatedAt;

    /**
     * @ORM\ManyToOne(targetEntity=Sport::class, inversedBy="posts")
     * @ORM\JoinColumn(nullable=false)
     * @Groups("posts_get")
     */
    private $sport;

    /**
     * @ORM\OneToMany(targetEntity=Comment::class, mappedBy="post", orphanRemoval=true)
     * @Groups("posts_get")
     */
    private $comments;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="posts")
     * @ORM\JoinColumn(nullable=false, onDelete="CASCADE")
     * @Groups("posts_get")
     */
    private $author;

    /**
     * @ORM\ManyToMany(targetEntity=User::class, inversedBy="events")
     * @Groups("posts_get")
     * 
     */
    private $participants;

    public function __construct()
    {  
        $this->comments = new ArrayCollection();
        $this->participants = new ArrayCollection();
        $this->createdAt = new DateTime('now');

    }

    public function __toString(): string
    {
        return $this->title;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): self
    {
        $this->slug = $slug;

        return $this;
    }

    public function getActive(): ?bool
    {
        return $this->active;
    }

    public function setActive(bool $active): self
    {
        $this->active = $active;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getLevel(): ?int
    {
        return $this->level;
    }

    public function setLevel(?int $level): self
    {
        $this->level = $level;

        return $this;
    }

    public function getLocation(): ?string
    {
        return $this->location;
    }

    public function setLocation(string $location): self
    {
        $this->location = $location;

        return $this;
    }

    public function getMinParticipants(): ?int
    {
        return $this->minParticipants;
    }

    public function setMinParticipants(?int $minParticipants): self
    {
        $this->minParticipants = $minParticipants;

        return $this;
    }

    public function getMaxParticipants(): ?int
    {
        return $this->maxParticipants;
    }

    public function setMaxParticipants(?int $maxParticipants): self
    {
        $this->maxParticipants = $maxParticipants;

        return $this;
    }

    public function getEventDate(): ?\DateTimeInterface
    {
        return $this->eventDate;
    }

    public function setEventDate(\DateTimeInterface $eventDate): self
    {
        $this->eventDate = $eventDate;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeInterface $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getSport(): ?Sport
    {
        return $this->sport;
    }

    public function setSport(?Sport $sport): self
    {
        $this->sport = $sport;

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
            $comment->setPost($this);
        }

        return $this;
    }

    public function removeComment(Comment $comment): self
    {
        if ($this->comments->removeElement($comment)) {
            // set the owning side to null (unless already changed)
            if ($comment->getPost() === $this) {
                $comment->setPost(null);
            }
        }

        return $this;
    }

    public function getAuthor(): ?User
    {
        return $this->author;
    }

    public function setAuthor(?User $author): self
    {
        $this->author = $author;

        return $this;
    }

    /**
     * @return Collection|User[]
     */
    public function getParticipants(): Collection
    {
        return $this->participants;
    }

    public function addParticipant(User $participant): self
    {
        if (!$this->participants->contains($participant)) {
            $this->participants[] = $participant;
        }

        return $this;
    }

    public function removeParticipant(User $participant): self
    {
        $this->participants->removeElement($participant);

        return $this;
    }
}
