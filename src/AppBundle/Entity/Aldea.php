<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Aldea
 *
 * @ORM\Table(name="aldea", options={"collate"="utf8_general_ci", "charset"="utf8"}, indexes={@ORM\Index(name="parroq_codi", columns={"parroq_codi"})})
 * @ORM\Entity
 */
class Aldea
{
    /**
     * @var string
     *
     * @ORM\Column(name="aldea_codi", type="string", length=10, nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $aldeaCodi;

    /**
     * @var string
     *
     * @ORM\Column(name="aldea_nomb", type="string", length=100, nullable=false)
     */
    private $aldeaNomb;

    /**
     * @var \Parroquia
     *
     * @ORM\ManyToOne(targetEntity="Parroquia")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="parroq_codi", referencedColumnName="parroq_codi")
     * })
     */
    private $parroqCodi;



    /**
     * Get aldeaCodi
     *
     * @return string 
     */
    public function getAldeaCodi()
    {
        return $this->aldeaCodi;
    }

    /**
     * Set aldeaNomb
     *
     * @param string $aldeaNomb
     * @return Aldea
     */
    public function setAldeaNomb($aldeaNomb)
    {
        $this->aldeaNomb = $aldeaNomb;

        return $this;
    }

    /**
     * Get aldeaNomb
     *
     * @return string 
     */
    public function getAldeaNomb()
    {
        return $this->aldeaNomb;
    }

    /**
     * Set parroqCodi
     *
     * @param \AppBundle\Entity\Parroquia $parroqCodi
     * @return Aldea
     */
    public function setParroqCodi(\AppBundle\Entity\Parroquia $parroqCodi = null)
    {
        $this->parroqCodi = $parroqCodi;

        return $this;
    }

    /**
     * Get parroqCodi
     *
     * @return \AppBundle\Entity\Parroquia 
     */
    public function getParroqCodi()
    {
        return $this->parroqCodi;
    }
}
