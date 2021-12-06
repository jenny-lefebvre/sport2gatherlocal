<?php

namespace App\Controller\Api;

use App\Entity\Sport;
use App\Repository\SportRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class SportController extends AbstractController
{
    /**
     * Get sports collection
     * 
     * @Route("/api/sports", name="api_sports_list", methods="GET")
     */
    public function list(SportRepository $sportRepository): Response
    {
        $sports = $sportRepository->findAll();

        // On demande à Symfony de "sérialiser" nos entités
        // sous forme de JSON
        return $this->json($sports, 200, [], ['groups' => 'sports_get']);
    }


    /**
     * Get sports by id
     * 
     * @Route("/api/sports/{id<\d+>}", name="api_sports_read", methods="GET")
     */
    public function read(Sport $sport): Response
    {
        // On demande à Symfony de "sérialiser" nos entités
        // sous forme de JSON
        return $this->json($sport, 200, [], ['groups' => 'sports_get']);
    }

     /**
     * Create a new sport
     * 
     * @Route("/api/sports", name="api_sports_add", methods="POST")
     */
    public function add(Request $request, SerializerInterface $serializer, EntityManagerInterface $entityManager, ValidatorInterface $validator)
    {
        // On récupère le contenu de la requête (du JSON)
        $jsonContent = $request->getContent();

        // On désérialise le JSON vers une entité sport
        // @see https://symfony.com/doc/current/components/serializer.html#deserializing-an-object
        $sport = $serializer->deserialize($jsonContent, Sport::class, 'json');

        // On valide l'entité avec le service Validator
        $errors = $validator->validate($sport);

        // Si la validation rencontre des erreurs
        // ($errors se comporte comme un tableau et contient un élément par erreur)
        if (count($errors) > 0) {
            return $this->json(['errors' => $errors], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        // On persist, on flush
        $entityManager->persist($sport);
        $entityManager->flush();

        // REST nous demande un statut 201 et un header Location: url
        // Si on le fait "à la mano"
        return $this->json(
            // Le film que l'on retourne en JSON directement au front
            $sport,
            // Le status code
            // C'est cool d'utiliser les constantes de classe !
            // => ça aide à la lecture du code et au fait de penser objet
            Response::HTTP_CREATED,
            // Un header Location + l'URL de la ressource créée
            ['Location' => $this->generateUrl('api_sports_read', ['id' => $sport->getId()])],
            // Le groupe de sérialisation pour que $sport soit sérialisé sans erreur de référence circulaire
            ['groups' => 'sports_get']
        );
    }

    /**
     * @Route("/api/sports/{id<\d+>}", name="api_sports_edit", methods={"PUT", "PATCH"})
     */
    public function edit(Sport $sport = null, SerializerInterface $serializer, ValidatorInterface $validator, EntityManagerInterface $entityManager, Request $request): Response
    {

        // sport not found
        if ($sport === null) {
            return new JsonResponse(
                ["message" => "sport non trouvé"],
                Response::HTTP_NOT_FOUND
            );
        }

        // Récupère les données de la requête
        $data = $request->getContent();

        // @todo Pour PUT, s'assurer qu'on ait un certain nombre de champs
        // @todo Pour PATCH, s'assurer qu'on au moins un champ
        // sinon => 422 HTTP_UNPROCESSABLE_ENTITY

        // On désérialise le JSON vers *l'entité sport existante*
        // @see https://symfony.com/doc/current/components/serializer.html#deserializing-in-an-existing-object
        $sport = $serializer->deserialize($data, Sport::class, 'json', [AbstractNormalizer::OBJECT_TO_POPULATE => $sport]);

        // On valide l'entité
        $errors = $validator->validate($sport);

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

        // Enregistrement en BDD
        $entityManager->flush();

        // @todo Conditionner le message de retour au cas où
        // l'entité ne serait pas modifiée
        return new JsonResponse(["message" => "sport modifié"], Response::HTTP_OK);
    }

    /**
     * Delete a sport
     * 
     * @Route("/api/sports/{id<\d+>}", name="api_sports_delete", methods="DELETE")
     */
    public function delete(Sport $sport= null, EntityManagerInterface $em)
    {
        if (null === $sport) {

            $error = 'Ce sport n\'existe pas';

            return $this->json(['error' => $error], Response::HTTP_NOT_FOUND);
        }

        $em->remove($sport);
        $em->flush();

        return $this->json(['message' => 'Le sport a bien été supprimé.'], Response::HTTP_OK);
    }

     /**
     * Random sport
     * 
     * @Route("/api/random/sports", name="api_sports_random", methods="GET")
     */
    public function random(SportRepository $sportRepository, EntityManagerInterface $em)
    {
        $sports = $sportRepository->randomSports();

        // On demande à Symfony de "sérialiser" nos entités
        // sous forme de JSON
        return $this->json($sports, 200, [], ['groups' => 'sports_get']);
    }
}
