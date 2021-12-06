<?php

namespace App\Entity;

use App\Repository\SportRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=SportRepository::class)
 */
class Sport
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups("categories_get")
     * @Groups("sports_get")
     * @Groups("posts_get")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=128)
     * @Groups("categories_get")
     * @Groups("sports_get")
     * @Groups("posts_get")
     * @Groups("users_get")
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=128)
     * @Groups("categories_get")
     * @Groups("sports_get")
     * @Groups("posts_get")
     */
    private $slug;

    /**
     * @ORM\ManyToMany(targetEntity=Category::class, mappedBy="sports")
     * @Groups("sports_get")
     */
    private $categories;

    /**
     * @ORM\OneToMany(targetEntity=Post::class, mappedBy="sport", orphanRemoval=true)
     */
    private $posts;

    /**
     * @ORM\OneToMany(targetEntity=Practices::class, mappedBy="sport")
     */
    private $practices;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups("sports_get")
     * @Groups("posts_get")
     * @Groups("users_get")
     */
    private $picture;

    public function __construct()
    {
        $this->categories = new ArrayCollection();
        $this->posts = new ArrayCollection();
        $this->practices = new ArrayCollection();
    }

    public function __toString(): string
    {
        return $this->name;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

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

    /**
     * @return Collection|Category[]
     */
    public function getCategories(): Collection
    {
        return $this->categories;
    }

    public function addCategory(Category $category): self
    {
        if (!$this->categories->contains($category)) {
            $this->categories[] = $category;
            $category->addSport($this);
        }

        return $this;
    }

    public function removeCategory(Category $category): self
    {
        if ($this->categories->removeElement($category)) {
            $category->removeSport($this);
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
            $post->setSport($this);
        }

        return $this;
    }

    public function removePost(Post $post): self
    {
        if ($this->posts->removeElement($post)) {
            // set the owning side to null (unless already changed)
            if ($post->getSport() === $this) {
                $post->setSport(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Practices[]
     */
    public function getPractices(): Collection
    {
        return $this->practices;
    }

    public function addPractice(Practices $practice): self
    {
        if (!$this->practices->contains($practice)) {
            $this->practices[] = $practice;
            $practice->setSport($this);
        }

        return $this;
    }

    public function removePractice(Practices $practice): self
    {
        if ($this->practices->removeElement($practice)) {
            // set the owning side to null (unless already changed)
            if ($practice->getSport() === $this) {
                $practice->setSport(null);
            }
        }

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
}
