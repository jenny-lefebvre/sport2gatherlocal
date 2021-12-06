<?php

namespace App\Controller\Back;

use App\Entity\Sport;
use App\Repository\SportRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class MainController extends AbstractController
{
    /**
     * Liste des sports
     * 
     * @Route("/back", name="home")
     */
    public function home(SportRepository $sportRepository): Response
    {
        return $this->render('back/home.html.twig', [
            'sports' => $sportRepository->findAll(),
        ]);
    }
    
}