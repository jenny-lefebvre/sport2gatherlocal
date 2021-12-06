<?php

namespace App\EventListener;

use App\Entity\Post;
use App\Service\MySlugger;
use Doctrine\Persistence\Event\LifecycleEventArgs;

class PostListener
{
    private $mySlugger;

    public function __construct(MySlugger $mySlugger)
    {
        $this->mySlugger = $mySlugger;
    }
    
    // the entity listener methods receive two arguments:
    // the entity instance and the lifecycle event
    public function slugify(Post $post, LifecycleEventArgs $event): void
    {
        // On souhaite slugifier le nom
        // On a besoin de notre MySlugger
        // On définit le slug du sport depuis son nom
        $post->setSlug($this->mySlugger->slugify($post->getLocation()));
    }
}
