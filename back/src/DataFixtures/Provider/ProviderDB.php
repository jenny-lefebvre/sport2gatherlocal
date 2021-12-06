<?php

namespace App\DataFixtures\Provider;

class ProviderDB
{
    // Tableau des sports disponibles pour les Fixtures
    private $sportsList = [
        
        'courses à pied',
        'randonnée',
        'canoë-kayak',
        'ski/snowboard',
        'cyclisme',
        'tennis',
        'equitation',
        'badminton',
        'ping-pong',
        'squash',
        'football',
        'basketball',
        'pétanque',
        'futsal',
        'rugby',
        'volleyball',
        'handball',
        'water-polo',
        'natation',
        'planche à voile',
        'paddle',
        'surf',
        'golf',
        'tir à l\'arc',
        'bowling',
        'fléchette',
        'yoga',
        'danse',
        'musculation',
        'crossfit',
    ];

    private $categories = [
        'Outdoor',
        'Indoor',
        'Raquettes',
        'Collectifs',
        'Aquatiques',
        'Précision',
        'Fitness'
        
    ];


    /**
     * Returns a random sport
     */
    public function randomSport()
    {
        return $this->sportsList[array_rand($this->sportsList)];
    }

    /**
     * Returns a random category
     */
    public function randomCategory()
    {
        return $this->categories[array_rand($this->categories)];
    }

}