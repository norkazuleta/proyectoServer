<?php

namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class AldeaType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('aldeaCodi')
            ->add('aldeaNomb')
            ->add('parroq', 'entity', array(
                'class' => 'AppBundle:Parroquia',
                'property' => 'parroqCodi',
            ))
        ;
    }
    
    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AppBundle\Entity\Aldea',
            'csrf_protection' => false,
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'appbundle_aldea';
    }
}
