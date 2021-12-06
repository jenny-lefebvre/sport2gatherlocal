<?php

namespace App\Security\Voter;

use App\Entity\Comment;
use App\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\User\UserInterface;

class CommentVoter extends Voter
{
    const COMMENT_EDIT = "comment_edit";
    const COMMENT_ADD = "comment_add";
    const COMMENT_DELETE = "comment_delete";

    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    protected function supports(string $attribute, $subject): bool
    {
        // replace with your own logic
        // https://symfony.com/doc/current/security/voters.html
        return in_array($attribute, [self::COMMENT_EDIT, self::COMMENT_ADD, self::COMMENT_DELETE])
            && $subject instanceof \App\Entity\Comment;
    }

    protected function voteOnAttribute(string $attribute, $comment, TokenInterface $token): bool
    {
        $user = $token->getUser();
        // if the user is anonymous, do not grant access
        if (!$user instanceof UserInterface) {
            return false;
        }

         // On vérifie si l'utilisateur est admin
         if($this->security->isGranted('ROLE_ADMIN')) return true;

         // On vérifie si l'annonce a un propriétaire
         if(null === $comment->getUser()) return false;

        // ... (check conditions and return true to grant permission) ...
        switch ($attribute) {
            case self::COMMENT_EDIT:
                // logic to determine if the user can EDIT
                return $this->canEdit($comment, $user);
                break;
            case self::COMMENT_ADD:
                // logic to determine if the user can ADD
                // return true or false
                break;
            case self::COMMENT_DELETE:
                    // logic to determine if the user can DELETE
                    return $this->canDelete($comment, $user);
                break;    
        }

        return false;
    }

    private function canEdit(Comment $comment, User $user)
    {
        return $user === $comment->getUser();
    }

    private function canDelete(Comment $comment, User $user)
    {
        return $user === $comment->getUser();
    }
}
