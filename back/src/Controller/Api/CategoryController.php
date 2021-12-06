<?php

namespace App\Controller\Api;

use App\Entity\Category;
use App\Repository\CategoryRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class CategoryController extends AbstractController
{
    /**
     * Get categories collection
     * 
     * @Route("/api/categories", name="api_categories_list", methods="GET")
     */
    public function list(CategoryRepository $categoryRepository): Response
    {
        $categories = $categoryRepository->findAll();

        // On demande à Symfony de "sérialiser" nos entités
        // sous forme de JSON
        return $this->json($categories, 200, [], ['groups' => 'categories_get']);
    }


    /**
     * Get categories by id
     * 
     * @Route("/api/categories/{id<\d+>}", name="api_categories_read", methods="GET")
     */
    public function read(Category $category): Response
    {
        // On demande à Symfony de "sérialiser" nos entités
        // sous forme de JSON
        return $this->json($category, 200, [], ['groups' => 'categories_get']);
    }

     /**
     * Create a new category
     * 
     * @Route("/api/categories", name="api_categories_add", methods="POST")
     */
    public function add(Request $request, SerializerInterface $serializer, EntityManagerInterface $entityManager, ValidatorInterface $validator)
    {
        // On récupère le contenu de la requête (du JSON)
        $jsonContent = $request->getContent();
        // $categoryName = $request->request->get('name');
        // dump($categoryName);
        

        // On désérialise le JSON vers une entité category
        // @see https://symfony.com/doc/current/components/serializer.html#deserializing-an-object
        $category = $serializer->deserialize($jsonContent, Category::class, 'json');

        // On valide l'entité avec le service Validator
        $errors = $validator->validate($category);

        // Si la validation rencontre des erreurs
        // ($errors se comporte comme un tableau et contient un élément par erreur)
        if (count($errors) > 0) {
            return $this->json(['errors' => $errors], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        // On persist, on flush
        $entityManager->persist($category);
        $entityManager->flush();

        // REST nous demande un statut 201 et un header Location: url
        // Si on le fait "à la mano"
        return $this->json(
            // Le film que l'on retourne en JSON directement au front
            $category,
            // Le status code
            // C'est cool d'utiliser les constantes de classe !
            // => ça aide à la lecture du code et au fait de penser objet
            Response::HTTP_CREATED,
            // Un header Location + l'URL de la ressource créée
            ['Location' => $this->generateUrl('api_categories_read', ['id' => $category->getId()])],
            // Le groupe de sérialisation pour que $category soit sérialisé sans erreur de référence circulaire
            ['groups' => 'categories_get']
        );
    }

    /**
     * @Route("/api/categories/{id<\d+>}", name="api_categories_edit", methods={"PUT", "PATCH"})
     */
    public function edit(category $category = null, SerializerInterface $serializer, ValidatorInterface $validator, EntityManagerInterface $entityManager, Request $request): Response
    {

        // Category not found
        if ($category === null) {
            return new JsonResponse(
                ["message" => "Catégorie non trouvée"],
                Response::HTTP_NOT_FOUND
            );
        }

        // Récupère les données de la requête
        $data = $request->getContent();

        // @todo Pour PUT, s'assurer qu'on ait un certain nombre de champs
        // @todo Pour PATCH, s'assurer qu'on au moins un champ
        // sinon => 422 HTTP_UNPROCESSABLE_ENTITY

        // On désérialise le JSON vers *l'entité category existante*
        // @see https://symfony.com/doc/current/components/serializer.html#deserializing-in-an-existing-object
        $category = $serializer->deserialize($data, category::class, 'json', [AbstractNormalizer::OBJECT_TO_POPULATE => $category]);

        // On valide l'entité
        $errors = $validator->validate($category);

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
        return new JsonResponse(["message" => "Catégorie modifiée"], Response::HTTP_OK);
    }

    /**
     * Delete a category
     * 
     * @Route("/api/categories/{id<\d+>}", name="api_categories_delete", methods="DELETE")
     */
    public function delete(category $category = null, EntityManagerInterface $em)
    {
        if (null === $category) {

            $error = 'Cette catégorie n\'existe pas';

            return $this->json(['error' => $error], Response::HTTP_NOT_FOUND);
        }

        $em->remove($category);
        $em->flush();

        return $this->json(['message' => 'La categorie a bien été supprimée.'], Response::HTTP_OK);
    }
}
