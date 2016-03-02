<?php

namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class PnfTrayectoPeriodoUcType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('pnfTrayPeri', 'entity', array(
                'class' => 'AppBundle:PnfTrayectoPeriodo',
                'property' => 'id',
            ))
            ->add('uc', 'entity', array(
                'class' => 'AppBundle:UnidadCurricular',
                'property' => 'ucId',
            ))
        ;
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AppBundle\Entity\PnfTrayectoPeriodoUc',
            'csrf_protection' => false,
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'appbundle_pnftrayectoperiodouc';
    }
}
