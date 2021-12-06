<?php

namespace App\Form;

use App\Entity\Post;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class PostType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('title')
            ->add('slug')
            ->add('active')
            ->add('description')
            ->add('level', ChoiceType::class, [
                'placeholder' => 'Niveau',
                'choices' => [
                    'Débutant' => 1,
                    'Confirmé' => 2,
                    'Expert' => 3
                ]
            ] )
            ->add('location')
            ->add('minParticipants')
            ->add('maxParticipants')
            ->add('eventDate', DateTimeType::class, [
                'placeholder' => [
                    'day' => 'Day', 'month' => 'Month', 'year' => 'Year',
                    'hour' => 'Hour', 'minute' => 'Minute',
                ]
            ])
            //->add('createdAt')
            //->add('updatedAt')
            ->add('sport')
            ->add('author')
            ->add('participants')
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Post::class,
        ]);
    }
}
