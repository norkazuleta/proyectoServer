<?php

namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class SeccionEstuType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('secc', 'entity', array(
                'class' => 'AppBundle:Seccion',
                'property' => 'seccId',
            ))
            ->add('cedu', 'entity', array(
                'class' => 'AppBundle:Persona',
                'property' => 'cedu',
            ))
        ;
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AppBundle\Entity\SeccionEstu'
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'appbundle_seccionestu';
    }
}
