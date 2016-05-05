<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * AldeaCoord
 *
 * @ORM\Table(name="aldea_coord", options={"collate"="utf8_general_ci", "charset"="utf8"}, indexes={@ORM\Index(name="aldea_codi", columns={"aldea_codi"}), @ORM\Index(name="persona_cedu", columns={"persona_cedu"})})
 * @ORM\Entity(repositoryClass="AppBundle\Repository\AldeaCoordRepository")
 */
class AldeaCoord
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
     * @var \Aldea
     *
     * @ORM\ManyToOne(targetEntity="Aldea")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="aldea_codi", referencedColumnName="aldea_codi")
     * })
     */
    private $aldea;


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
     * @return AldeaCoord
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
     * Set aldea
     *
     * @param  \AppBundle\Entity\Aldea $aldea
     * @return AldeaCoord
     */
    public function setAldea(\AppBundle\Entity\Aldea $aldea = null)
    {
        $this->aldea = $aldea;

        return $this;
    }

    /**
     * Get aldea
     *
     * @return \AppBundle\Entity\Aldea
     */
    public function getAldea()
    {
        return $this->aldea;
    }
}
