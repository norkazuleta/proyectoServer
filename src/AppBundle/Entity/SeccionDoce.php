<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * SeccionDoce
 *
 * @ORM\Table(name="seccion_doce", options={"collate"="utf8_general_ci", "charset"="utf8"}, indexes={@ORM\Index(name="secc_id", columns={"secc_id"}), @ORM\Index(name="persona_id", columns={"persona_id"})})
 * @ORM\Entity(repositoryClass="AppBundle\Repository\SeccionDoceRepository")
 */
class SeccionDoce
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
     * @ORM\OneToOne(targetEntity="Seccion")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="secc_id", referencedColumnName="secc_id")
     * })
     */
    private $secc;

    /**
     * @var \Persona
     *
     * @ORM\ManyToOne(targetEntity="Persona")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="persona_id", referencedColumnName="id")
     * })
     */
    private $persona;

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
     * @param  \AppBundle\Entity\Seccion $secc
     * @return SeccionDoce
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
     * Set persona
     *
     * @param  \AppBundle\Entity\Persona $persona
     * @return SeccionEstu
     */
    public function setPersona(\AppBundle\Entity\Persona $persona = null)
    {
        $this->persona = $persona;

        return $this;
    }

    /**
     * Get persona
     *
     * @return \AppBundle\Entity\Persona
     */
    public function getPersona()
    {
        return $this->persona;
    }
}
