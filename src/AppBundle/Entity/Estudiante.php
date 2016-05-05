<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Estudiante
 *
 * @ORM\Table(name="estudiante", options={"collate"="utf8_general_ci", "charset"="utf8"}, indexes={@ORM\Index(name="pnf_id", columns={"pnf_id"}), @ORM\Index(name="persona_cedu", columns={"persona_cedu"})})
 * @ORM\Entity(repositoryClass="AppBundle\Repository\EstudianteRepository")
 */
class Estudiante
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
     * @var \Persona
     *
     * @ORM\ManyToOne(targetEntity="Persona")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="persona_cedu", referencedColumnName="cedu")
     * })
     */
    private $persona;

    /**
     * @var \Pnf
     *
     * @ORM\ManyToOne(targetEntity="Pnf")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="pnf_id", referencedColumnName="pnf_id")
     * })
     */
    private $pnf;

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
     * Set persona
     *
     * @param  \AppBundle\Entity\Persona $persona
     * @return Estudiante
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

    /**
     * Set pnf
     *
     * @param  \AppBundle\Entity\Pnf $pnf
     * @return Estudiante
     */
    public function setPnf(\AppBundle\Entity\Pnf $pnf = null)
    {
        $this->pnf = $pnf;

        return $this;
    }

    /**
     * Get pnf
     *
     * @return \AppBundle\Entity\Pnf
     */
    public function getPnf()
    {
        return $this->pnf;
    }
}
