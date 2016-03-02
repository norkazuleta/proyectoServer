<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * AldeaTurno
 *
 * @ORM\Table(name="aldea_turno", options={"collate"="utf8_general_ci", "charset"="utf8"}, indexes={@ORM\Index(name="aldea_codi", columns={"aldea_codi"}), @ORM\Index(name="turn_id", columns={"turn_id"})})
 * @ORM\Entity
 */
class AldeaTurno
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
     * @var \Aldea
     *
     * @ORM\ManyToOne(targetEntity="Aldea")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="aldea_codi", referencedColumnName="aldea_codi")
     * })
     */
    private $aldea;

    /**
     * @var \Turno
     *
     * @ORM\ManyToOne(targetEntity="Turno")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="turn_id", referencedColumnName="turn_id")
     * })
     */
    private $turno;


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
     * Set aldea
     *
     * @param \AppBundle\Entity\Aldea $aldea
     * @return AldeaTurno
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

    /**
     * Set turno
     *
     * @param \AppBundle\Entity\Turno $turno
     * @return AldeaTurno
     */
    public function setTurno(\AppBundle\Entity\Turno $turno = null)
    {
        $this->turno = $turno;

        return $this;
    }

    /**
     * Get turno
     *
     * @return \AppBundle\Entity\Turno 
     */
    public function getTurno()
    {
        return $this->turno;
    }
}
