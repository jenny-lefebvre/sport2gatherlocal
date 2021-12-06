<?php

namespace App\EventListener;

use App\Entity\Sport;
use App\Service\MySlugger;
use Doctrine\Persistence\Event\LifecycleEventArgs;

class SportListener
{
    private $mySlugger;

    public function __construct(MySlugger $mySlugger)
    {
        $this->mySlugger = $mySlugger;
    }
    
    // the entity listener methods receive two arguments:
    // the entity instance and the lifecycle event
    public function slugify(Sport $sport, LifecycleEventArgs $event): void
    {
        // On souhaite slugifier le nom
        // On a besoin de notre MySlugger
        // On définit le slug du sport depuis son nom
        $sport->setSlug($this->mySlugger->slugify($sport->getName()));
    }
}
