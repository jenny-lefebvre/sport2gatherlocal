<?php

namespace App\Controller\Api;

use App\Entity\Post;
use App\Repository\PostRepository;
use App\Repository\UserRepository;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use PhpParser\Node\Expr\Cast\String_;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class PostController extends AbstractController
{
    /**
     * Get posts collection
     * 
     * @Route("/api/posts", name="api_posts_list", methods="GET")
     */
    public function list(PostRepository $postRepository): Response
    {
        $posts = $postRepository->findAllOrderByDate();

        // On demande à Symfony de "sérialiser" nos entités
        // sous forme de JSON
        return $this->json($posts, 200, [], ['groups' => 'posts_get']);
    }


    /**
     * Get posts by id
     * 
     * @Route("/api/posts/{id<\d+>}", name="api_posts_read", methods="GET")
     */
    public function read(Post $post): Response
    {
        // On demande à Symfony de "sérialiser" nos entités
        // sous forme de JSON
        return $this->json($post, 200, [], ['groups' => 'posts_get']);
    }

    /**
     * Create a new post
     * 
     * @Route("/api/posts", name="api_posts_add", methods="POST")
     */
    public function add(Request $request, SerializerInterface $serializer, EntityManagerInterface $entityManager, ValidatorInterface $validator)
    {
        // On récupère le contenu de la requête (du JSON)
        $jsonContent = $request->getContent();

        // On désérialise le JSON vers une entité post
        // @see https://symfony.com/doc/current/components/serializer.html#deserializing-an-object
        $post = $serializer->deserialize($jsonContent, Post::class, 'json');

        // On valide l'entité avec le service Validator
        $errors = $validator->validate($post);

        // Si la validation rencontre des erreurs
        // ($errors se comporte comme un tableau et contient un élément par erreur)
        if (count($errors) > 0) {
            return $this->json(['errors' => $errors], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        // We set the createdAt property to today
        $post->setCreatedAt(new DateTime('now'));
        $post->setActive(true);


        // On persist, on flush
        $entityManager->persist($post);
        $entityManager->flush();

        // REST nous demande un statut 201 et un header Location: url
        // Si on le fait "à la mano"
        return $this->json(
            // Le film que l'on retourne en JSON directement au front
            $post,
            // Le status code
            // C'est cool d'utiliser les constantes de classe !
            // => ça aide à la lecture du code et au fait de penser objet
            Response::HTTP_CREATED,
            // Un header Location + l'URL de la ressource créée
            ['Location' => $this->generateUrl('api_posts_read', ['id' => $post->getId()])],
            // Le groupe de sérialisation pour que $post soit sérialisé sans erreur de référence circulaire
            ['groups' => 'posts_get']
        );
    }

    /**
     * @Route("/api/posts/{id<\d+>}", name="api_posts_edit", methods={"PUT", "PATCH"})
     */
    public function edit(Post $post = null, SerializerInterface $serializer, ValidatorInterface $validator, EntityManagerInterface $entityManager, Request $request): Response
    {
        $this->denyAccessUnlessGranted('post_edit', $post);

        // post not found
        if ($post === null) {
            return new JsonResponse(
                ["message" => "Annonce non trouvée"],
                Response::HTTP_NOT_FOUND
            );
        }

        // Récupère les données de la requête
        $data = $request->getContent();

        // @todo Pour PUT, s'assurer qu'on ait un certain nombre de champs
        // @todo Pour PATCH, s'assurer qu'on au moins un champ
        // sinon => 422 HTTP_UNPROCESSABLE_ENTITY

        // On désérialise le JSON vers *l'entité post existante*
        // @see https://symfony.com/doc/current/components/serializer.html#deserializing-in-an-existing-object
        $post = $serializer->deserialize($data, Post::class, 'json', [AbstractNormalizer::OBJECT_TO_POPULATE => $post]);

        // On valide l'entité
        $errors = $validator->validate($post);

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
        $post->setUpdatedAt(new DateTime('now'));

        // Enregistrement en BDD
        $entityManager->flush();

        // @todo Conditionner le message de retour au cas où
        // l'entité ne serait pas modifiée
        return new JsonResponse(["message" => "Post modifié"], Response::HTTP_OK);
    }

    /**
     * Delete a post
     * 
     * @Route("/api/posts/{id<\d+>}", name="api_posts_delete", methods="DELETE")
     */
    public function delete(Post $post = null, EntityManagerInterface $em)
    {
        $this->denyAccessUnlessGranted('post_delete', $post);

        if (null === $post) {

            $error = 'Ce post n\'existe pas';

            return $this->json(['error' => $error], Response::HTTP_NOT_FOUND);
        }

        $em->remove($post);
        $em->flush();

        return $this->json(['message' => 'Le post a bien été supprimé.'], Response::HTTP_OK);
    }

    /**
     * Get posts by place
     * 
     * @Route("/api/posts/place/{place}", name="api_posts_place", methods="GET")
     */
    public function getByPlace(PostRepository $postRepository, string $place): Response
    {
        $posts = $postRepository->findAllByPlace($place);

        return $this->json($posts, 200, [], ['groups' => 'posts_get']);
    }

    /**
     * Get posts by sport
     * 
     * @Route("/api/posts/sport/{sport}", name="api_posts_sport", methods="GET")
     */
    public function getBySport(PostRepository $postRepository, string $sport): Response
    {
        $posts = $postRepository->findAllBySport($sport);

        return $this->json($posts, 200, [], ['groups' => 'posts_get']);
    }

    /**
     * Get posts by date
     * 
     * @Route("/api/posts/date/{date}", name="api_posts_date", methods="GET")
     */
    public function getByDate(PostRepository $postRepository, string $date): Response
    {
        $posts = $postRepository->findAllByDate($date);

        return $this->json($posts, 200, [], ['groups' => 'posts_get']);
    }

    /**
     * Get posts by date
     * 
     * @Route("/api/posts/{sport}/{place}/{date}", name="api_posts_get", methods="GET")
     */
    public function getByParameters(PostRepository $postRepository, string $sport, string $place, string $date): Response
    {
        $posts = $postRepository->findAllByParameters($sport, $place, $date);

        return $this->json($posts, 200, [], ['groups' => 'posts_get']);
    }


    /**
     * Random post
     * 
     * @Route("/api/random/posts", name="api_posts_random", methods="GET")
     */
    public function random(PostRepository $postRepository, EntityManagerInterface $em)
    {
        $posts = $postRepository->randomPosts();

        // On demande à Symfony de "sérialiser" nos entités
        // sous forme de JSON
        return $this->json($posts, 200, [], ['groups' => 'posts_get']);
    }

    /**
     * Add a new participant
     * 
     * @Route("/api/posts/{id}/add/{participant}", name="api_posts_add_participant", methods="POST")
     */
    public function addParticipant(EntityManagerInterface $entityManager, PostRepository $postRepository, UserRepository $userRepository, String $id, String $participant)
    {
        $post = $postRepository->find($id);
        $user = $userRepository->find($participant);

        if ($post->getMaxParticipants() == null || count($post->getParticipants()) < $post->getMaxParticipants()) {
            // dump('maxparticipants ' . $post->getMaxParticipants());
            // dd(count($post->getParticipants()));

            $post->addParticipant($user);

            // On persist, on flush
            $entityManager->flush();

            // REST nous demande un statut 201 et un header Location: url
            // Si on le fait "à la mano"
            return $this->json(
                // Le film que l'on retourne en JSON directement au front
                $post,
                // Le status code
                // C'est cool d'utiliser les constantes de classe !
                // => ça aide à la lecture du code et au fait de penser objet
                Response::HTTP_CREATED,
                // Un header Location + l'URL de la ressource créée
                ['Location' => $this->generateUrl('api_posts_read', ['id' => $post->getId()])],
                // Le groupe de sérialisation pour que $post soit sérialisé sans erreur de référence circulaire
                ['groups' => 'posts_get']
            );
        }

        return new JsonResponse(
            ["message" => "Annonce complète"],
            Response::HTTP_UNAUTHORIZED
        ); 
    }

    /**
     * Remove a participant
     * 
     * @Route("/api/posts/{id}/delete/{participant}", name="api_posts_delete_participant", methods="DELETE")
     */
    public function removeParticipant(EntityManagerInterface $entityManager, PostRepository $postRepository, UserRepository $userRepository, String $id, String $participant)
    {
        $post = $postRepository->find($id);
        $user = $userRepository->find($participant);

        $post->removeParticipant($user);

        // On persist, on flush
        $entityManager->flush();

        // REST nous demande un statut 201 et un header Location: url
        // Si on le fait "à la mano"
        return $this->json(
            // Le film que l'on retourne en JSON directement au front
            $post,
            // Le status code
            // C'est cool d'utiliser les constantes de classe !
            // => ça aide à la lecture du code et au fait de penser objet
            Response::HTTP_CREATED,
            // Un header Location + l'URL de la ressource créée
            ['Location' => $this->generateUrl('api_posts_read', ['id' => $post->getId()])],
            // Le groupe de sérialisation pour que $post soit sérialisé sans erreur de référence circulaire
            ['groups' => 'posts_get']
        );
    }
}
