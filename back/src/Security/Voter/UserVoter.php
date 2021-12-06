<?php

namespace App\Security\Voter;

use App\Entity\User;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;

class UserVoter extends Voter
{
    const USER_EDIT = "user_edit";
    const USER_ADD = "user_add";
    const USER_DELETE = "user_delete";

    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    protected function supports(string $attribute, $subject): bool
    {
        // replace with your own logic
        // https://symfony.com/doc/current/security/voters.html
        return in_array($attribute, [self::USER_EDIT, self::USER_ADD, self::USER_DELETE])
            && $subject instanceof \App\Entity\User;
    }

    protected function voteOnAttribute(string $attribute, $userEntity, TokenInterface $token): bool
    {
        $user = $token->getUser();
        // if the user is anonymous, do not grant access
        if (!$user instanceof UserInterface) {
            return false;
        }

         // On vérifie si l'utilisateur est admin
         if($this->security->isGranted('ROLE_ADMIN')) return true;

         // On vérifie si l'annonce a un propriétaire
         if(null === $userEntity) return false;

        // ... (check conditions and return true to grant permission) ...
        switch ($attribute) {
            case self::USER_EDIT:
                // logic to determine if the user can EDIT
                return $this->canEdit($userEntity, $user);
                break;
            case self::USER_ADD:
                // logic to determine if the user can ADD
                // return true or false
                break;
            case self::USER_DELETE:
                    // logic to determine if the user can DELETE
                    return $this->canDelete($userEntity, $user);
                break;    
        }

        return false;
    }

    private function canEdit(User $userEntity, User $user)
    {
        return $userEntity === $user;
    }

    private function canDelete(User $userEntity, User $user)
    {
        return $userEntity === $user;
    }

}
