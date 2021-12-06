<?php

namespace App\Controller\Api;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserController extends AbstractController
{
    /**
     * Get users collection
     * 
     * @Route("/api/users", name="api_users_list", methods="GET")
     */
    public function list(UserRepository $userRepository): Response
    {
        $users = $userRepository->findAll();

        // On demande à Symfony de "sérialiser" nos entités
        // sous forme de JSON
        return $this->json($users, 200, [], ['groups' => 'users_get']);
    }


    /**
     * Get users by id
     * 
     * @Route("/api/users/{id<\d+>}", name="api_users_read", methods="GET")
     */
    public function read(User $user): Response
    {
        // On demande à Symfony de "sérialiser" nos entités
        // sous forme de JSON
        return $this->json($user, 200, [], ['groups' => 'users_get']);
    }

     /**
     * Create a new user
     * 
     * @Route("/api/users", name="api_users_add", methods="POST")
     */
    public function add(Request $request, SerializerInterface $serializer, EntityManagerInterface $entityManager, ValidatorInterface $validator, UserPasswordHasherInterface $userPasswordHasher)
    {
        // On récupère le contenu de la requête (du JSON)
        
        $jsonContent = $request->getContent();

        //dd($jsonContent);

        // On désérialise le JSON vers une entité user
        // @see https://symfony.com/doc/current/components/serializer.html#deserializing-an-object
        $user = $serializer->deserialize($jsonContent, User::class, 'json');

        // On valide l'entité avec le service Validator
        $errors = $validator->validate($user);

        // Si la validation rencontre des erreurs
        // ($errors se comporte comme un tableau et contient un élément par erreur)
        if (count($errors) > 0) {
            return $this->json(['errors' => $errors], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        // On hash le mot de passe
        $hashedPassword = $userPasswordHasher->hashPassword($user, $user->getPassword());
        // On le remet dans $user->password
        $user->setPassword($hashedPassword);

        // We set the role to ["ROLE_USER"] for new users. We have to edit the users to make them administrators.
        $user->setRoles(["ROLE_USER"]);
        
        // On persist, on flush
        $entityManager->persist($user);
        $entityManager->flush();

        // REST nous demande un statut 201 et un header Location: url
        // Si on le fait "à la mano"
        return $this->json(
            // Le film que l'on retourne en JSON directement au front
            $user,
            // Le status code
            // C'est cool d'utiliser les constantes de classe !
            // => ça aide à la lecture du code et au fait de penser objet
            Response::HTTP_CREATED,
            // Un header Location + l'URL de la ressource créée
            ['Location' => $this->generateUrl('api_users_read', ['id' => $user->getId()])],
            // Le groupe de sérialisation pour que $user soit sérialisé sans erreur de référence circulaire
            ['groups' => 'users_get']
        );
    }

     /**
     * @Route("/api/users/{id<\d+>}", name="api_users_edit", methods={"PUT", "PATCH"})
     */
    public function edit(User $user= null, SerializerInterface $serializer, ValidatorInterface $validator, EntityManagerInterface $entityManager, Request $request, UserPasswordHasherInterface $userPasswordHasher): Response
    {
        $this->denyAccessUnlessGranted('user_edit', $user);

        // user not found
        if ($user === null) {
            return new JsonResponse(
                ["message" => "utilisateur non trouvé"],
                Response::HTTP_NOT_FOUND
            );
        }

        // Récupère les données de la requête
        $data = $request->getContent();

        // @todo Pour PUT, s'assurer qu'on ait un certain nombre de champs
        // @todo Pour PATCH, s'assurer qu'on au moins un champ
        // sinon => 422 HTTP_UNPROCESSABLE_ENTITY

        // On désérialise le JSON vers *l'entité user existante*
        // @see https://symfony.com/doc/current/components/serializer.html#deserializing-in-an-existing-object
        $user = $serializer->deserialize($data, User::class, 'json', [AbstractNormalizer::OBJECT_TO_POPULATE => $user]);

        // On valide l'entité
        $errors = $validator->validate($user);

        // Affichage des erreurs
        if (count($errors) > 0) {

            // Objectif : créer ce format de sortie
            // {
            //     "errors": {
            //         "title": [
            //             "Cette valeur ne doit pas être vide."
            //         ],
            //         "releaseDate": [
            //             "Cette valeur doit être de type string."
            //         ],
            //         "rating": [
            //             "Cette chaîne est trop longue. Elle doit avoir au maximum 1 caractère.",
            //             "Cette valeur doit être l'un des choix proposés."
            //         ]
            //     }
            // }

            // On va créer un joli tableau d'erreurs
            $newErrors = [];

            // Pour chaque erreur
            foreach ($errors as $error) {
                // Astuce ici ! on poush dans un taleau
                // = similaire à la structure des Flash Messages
                // On push le message, à la clé qui contient la propriété
                $newErrors[$error->getPropertyPath()][] = $error->getMessage();
            }

            return new JsonResponse(["errors" => $newErrors], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        // On hash le mot de passe
        $hashedPassword = $userPasswordHasher->hashPassword($user, $user->getPassword());
        // On le remet dans $user->password
        $user->setPassword($hashedPassword);
        // Enregistrement en BDD
        $entityManager->flush();

        // @todo Conditionner le message de retour au cas où
        // l'entité ne serait pas modifiée
        return new JsonResponse(["message" => "utilisateur modifié"], Response::HTTP_OK);
    }

    /**
     * Delete a user
     * 
     * @Route("/api/users/{id<\d+>}", name="api_users_delete", methods="DELETE")
     */
    public function delete(User $user= null, EntityManagerInterface $em)
    {
        $this->denyAccessUnlessGranted('user_delete', $user);

        if (null === $user) {

            $error = 'Cet utilisateur n\'existe pas';

            return $this->json(['error' => $error], Response::HTTP_NOT_FOUND);
        }

        $em->remove($user);
        $em->flush();

        return $this->json(['message' => 'L\'utilisateur a bien été supprimé.'], Response::HTTP_OK);
    }
}
