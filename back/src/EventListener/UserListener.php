<?php

namespace App\EventListener;

use App\Entity\User;
use App\Service\MySlugger;
use Doctrine\Persistence\Event\LifecycleEventArgs;

class UserListener
{
    private $mySlugger;

    public function __construct(MySlugger $mySlugger)
    {
        $this->mySlugger = $mySlugger;
    }
    
    // the entity listener methods receive two arguments:
    // the entity instance and the lifecycle event
    public function slugify(User $user, LifecycleEventArgs $event): void
    {
        // On souhaite slugifier le nom
        // On a besoin de notre MySlugger
        // On définit le slug du sport depuis son nom
        $user->setSlug($this->mySlugger->slugify($user->getUsername()));
    }
}
