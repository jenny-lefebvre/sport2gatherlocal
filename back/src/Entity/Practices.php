<?php

namespace App\Entity;

use App\Repository\PracticesRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=PracticesRepository::class)
 */
class Practices
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups("users_get")
     */
    private $id;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups("users_get")
     */
    private $level;

    /**
     * @ORM\ManyToOne(targetEntity=Sport::class, inversedBy="practices")
     * @ORM\JoinColumn(onDelete="CASCADE")
     * @Groups("users_get")
     */
    private $sport;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="practicedSports")
     * @ORM\JoinColumn(onDelete="CASCADE")
     */
    private $practitioner;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getSport(): ?Sport
    {
        return $this->sport;
    }

    public function setSport(?Sport $sport): self
    {
        $this->sport = $sport;

        return $this;
    }

    public function getPractitioner(): ?User
    {
        return $this->practitioner;
    }

    public function setPractitioner(?User $practitioner): self
    {
        $this->practitioner = $practitioner;

        return $this;
    }
}
