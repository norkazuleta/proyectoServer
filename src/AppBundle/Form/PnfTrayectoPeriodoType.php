<?php

namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class PnfTrayectoPeriodoType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
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
        ;
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AppBundle\Entity\PnfTrayectoPeriodo',
            'csrf_protection' => false,
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'appbundle_pnftrayectoperiodo';
    }
}
