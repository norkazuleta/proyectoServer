<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * SeccionEstu
 *
 * @ORM\Table(name="seccion_estu", options={"collate"="utf8_general_ci", "charset"="utf8"}, indexes={@ORM\Index(name="secc_id", columns={"secc_id"}), @ORM\Index(name="cedu", columns={"cedu"})})
 * @ORM\Entity
 */
class SeccionEstu
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var \Seccion
     *
     * @ORM\ManyToOne(targetEntity="Seccion")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="secc_id", referencedColumnName="secc_id")
     * })
     */
    private $secc;

    /**
     * @var \Estudiante
     *
     * @ORM\ManyToOne(targetEntity="Estudiante")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="cedu", referencedColumnName="cedu")
     * })
     */
    private $cedu;



    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set secc
     *
     * @param \AppBundle\Entity\Seccion $secc
     * @return SeccionEstu
     */
    public function setSecc(\AppBundle\Entity\Seccion $secc = null)
    {
        $this->secc = $secc;

        return $this;
    }

    /**
     * Get secc
     *
     * @return \AppBundle\Entity\Seccion 
     */
    public function getSecc()
    {
        return $this->secc;
    }

    /**
     * Set cedu
     *
     * @param \AppBundle\Entity\Estudiante $cedu
     * @return SeccionEstu
     */
    public function setCedu(\AppBundle\Entity\Estudiante $cedu = null)
    {
        $this->cedu = $cedu;

        return $this;
    }

    /**
     * Get cedu
     *
     * @return \AppBundle\Entity\Estudiante 
     */
    public function getCedu()
    {
        return $this->cedu;
    }
}
