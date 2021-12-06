<?php

namespace App\Controller\Api;

use App\Entity\Comment;
use App\Repository\CommentRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use DateTime;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class CommentController extends AbstractController
{
    /**
     * Get comments collection
     * 
     * @Route("/api/comments", name="api_comments_list", methods="GET")
     */
    public function list(CommentRepository $commentRepository): Response
    {
        $comments = $commentRepository->findAllOrderByDate();

        // On demande à Symfony de "sérialiser" nos entités
        // sous forme de JSON
        return $this->json($comments, 200, [], ['groups' => 'comments_get']);
    }


    /**
     * Get comments by id
     * 
     * @Route("/api/comments/{id<\d+>}", name="api_comments_read", methods="GET")
     */
    public function read(Comment $comment): Response
    {
        // On demande à Symfony de "sérialiser" nos entités
        // sous forme de JSON
        return $this->json($comment, 200, [], ['groups' => 'comments_get']);
    }

     /**
     * Create a new comment
     * 
     * @Route("/api/comments", name="api_comments_add", methods="POST")
     */
    public function add(Request $request, SerializerInterface $serializer, EntityManagerInterface $entityManager, ValidatorInterface $validator)
    {
        // On récupère le contenu de la requête (du JSON)
        $jsonContent = $request->getContent();

        // On désérialise le JSON vers une entité comment
        // @see https://symfony.com/doc/current/components/serializer.html#deserializing-an-object
        $comment = $serializer->deserialize($jsonContent, Comment::class, 'json');

        // On valide l'entité avec le service Validator
        $errors = $validator->validate($comment);

        // Si la validation rencontre des erreurs
        // ($errors se comporte comme un tableau et contient un élément par erreur)
        if (count($errors) > 0) {
            return $this->json(['errors' => $errors], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $comment->setCreatedAt(new DateTime('now'));

        // On persist, on flush
        $entityManager->persist($comment);
        $entityManager->flush();

        // REST nous demande un statut 201 et un header Location: url
        // Si on le fait "à la mano"
        return $this->json(
            // Le film que l'on retourne en JSON directement au front
            $comment,
            // Le status code
            // C'est cool d'utiliser les constantes de classe !
            // => ça aide à la lecture du code et au fait de penser objet
            Response::HTTP_CREATED,
            // Un header Location + l'URL de la ressource créée
            ['Location' => $this->generateUrl('api_comments_read', ['id' => $comment->getId()])],
            // Le groupe de sérialisation pour que $comment soit sérialisé sans erreur de référence circulaire
            ['groups' => 'comments_get']
        );
    }


    /**
     * @Route("/api/comments/{id<\d+>}", name="api_comments_edit", methods={"PUT", "PATCH"})
     */
    public function edit(Comment $comment = null, SerializerInterface $serializer, ValidatorInterface $validator, EntityManagerInterface $entityManager, Request $request): Response
    {
        $this->denyAccessUnlessGranted('comment_edit', $comment);

        // Comment not found
        if ($comment === null) {
            return new JsonResponse(
                ["message" => "Commentaire non trouvé"],
                Response::HTTP_NOT_FOUND
            );
        }

        // Récupère les données de la requête
        $data = $request->getContent();

        // @todo Pour PUT, s'assurer qu'on ait un certain nombre de champs
        // @todo Pour PATCH, s'assurer qu'on au moins un champ
        // sinon => 422 HTTP_UNPROCESSABLE_ENTITY

        // On désérialise le JSON vers *l'entité comment existante*
        // @see https://symfony.com/doc/current/components/serializer.html#deserializing-in-an-existing-object
        $comment = $serializer->deserialize($data, Comment::class, 'json', [AbstractNormalizer::OBJECT_TO_POPULATE => $comment]);

        // On valide l'entité
        $errors = $validator->validate($comment);

        // Affichage des erreurs
        if (count($errors) > 0) {


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
         // We set the updatedAt to now
         $comment->setUpdatedAt(new DateTime('now'));

        // Enregistrement en BDD
        $entityManager->flush();

        // @todo Conditionner le message de retour au cas où
        // l'entité ne serait pas modifiée
        return new JsonResponse(["message" => "Commentaire modifié"], Response::HTTP_OK);
    }

    /**
     * Delete a comment
     * 
     * @Route("/api/comments/{id<\d+>}", name="api_comments_delete", methods="DELETE")
     */
    public function delete(Comment $comment = null, EntityManagerInterface $em)
    {
        $this->denyAccessUnlessGranted('comment_delete', $comment);

        if (null === $comment) {

            $error = 'Ce commentaire n\'existe pas';

            return $this->json(['error' => $error], Response::HTTP_NOT_FOUND);
        }

        $em->remove($comment);
        $em->flush();

        return $this->json(['message' => 'Le commentaire a bien été supprimé.'], Response::HTTP_OK);
    }
}
