<?php

// src/App/EventListener/AuthenticationSuccessListener.php

namespace App\EventListener;

use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Component\Security\Core\User\UserInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;

class AuthenticationSuccessListener 
{

    private $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * @param AuthenticationSuccessEvent $event
     */
    public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event)
    {
        $data = $event->getData();
        $user = $event->getUser();

        if (!$user instanceof UserInterface) {
            return;
        }

        $currentUser = $this->userRepository->findByEmail($user->getUserIdentifier());

        $data['data'] = array(
            'email' => $user->getUserIdentifier(),
            'username' => $currentUser->getUsername(),
            'id' => $currentUser->getId(),
            'picture' => $currentUser->getPicture(),
            'roles' => $user->getRoles(),
        );

        $event->setData($data);
    }
}
