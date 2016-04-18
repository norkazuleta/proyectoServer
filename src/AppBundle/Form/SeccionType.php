<?php

namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class SeccionType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('seccCodi')
            ->add('aldea', 'entity', array(
                'class' => 'AppBundle:Aldea',
                'property' => 'aldeaCodi',
            ))
            ->add('turn', 'entity', array(
                'class' => 'AppBundle:Turno',
                'property' => 'turnId',
            ))
            ->add('pnf', 'entity', array(
                'class' => 'AppBundle:Pnf',
                'property' => 'pnfId',
            ))
            ->add('tray', 'entity', array(
                'class' => 'AppBundle:Trayecto',
                'property' => 'trayId',
            ))
            ->add('peri', 'entity', array(
                'class' => 'AppBundle:Periodo',
                'property' => 'periId',
            ))
            ->add('uc', 'entity', array(
                'class' => 'AppBundle:UnidadCurricular',
                'property' => 'ucId',
            ))
            ->add('pa', 'entity', array(
                'class' => 'AppBundle:PeriodoAcademico',
                'property' => 'paId',
            ))
        ;
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AppBundle\Entity\Seccion',
            'csrf_protection' => false,
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'appbundle_seccion';
    }
}
