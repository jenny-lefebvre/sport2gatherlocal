<?php

namespace App\Security\Voter;

use App\Entity\User;
use App\Entity\Post;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Security;

class PostVoter extends Voter
{
    const POST_EDIT = "post_edit";
    const POST_ADD = "post_add";
    const POST_DELETE = "post_delete";

    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    protected function supports(string $attribute, $subject): bool
    {
        // replace with your own logic
        // https://symfony.com/doc/current/security/voters.html
        return in_array($attribute, [self::POST_EDIT, self::POST_ADD, self::POST_DELETE])
            && $subject instanceof \App\Entity\Post;
    }

    protected function voteOnAttribute(string $attribute, $post, TokenInterface $token): bool
    {
        $user = $token->getUser();
        // if the user is anonymous, do not grant access
        if (!$user instanceof UserInterface) {
            return false;
        }

         // On vérifie si l'utilisateur est admin
         if($this->security->isGranted('ROLE_ADMIN')) return true;

         // On vérifie si l'annonce a un propriétaire
         if(null === $post->getAuthor()) return false;

        // ... (check conditions and return true to grant permission) ...
        switch ($attribute) {
            case self::POST_EDIT:
                // logic to determine if the user can EDIT
                return $this->canEdit($post, $user);
                break;
            case self::POST_ADD:
                // logic to determine if the user can ADD
                // return true or false
                break;
            case self::POST_DELETE:
                    // logic to determine if the user can DELETE
                    return $this->canDelete($post, $user);
                break;    
        }

        return false;
    }

    private function canEdit(Post $post, User $user)
    {
        return $user === $post->getAuthor();
    }

    private function canDelete(Post $post, User $user)
    {
        return $user === $post->getAuthor();
    }
}
