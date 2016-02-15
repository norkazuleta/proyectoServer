<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Nota
 *
 * @ORM\Table(name="nota", options={"collate"="utf8_general_ci", "charset"="utf8"}, indexes={@ORM\Index(name="cedu", columns={"cedu"}), @ORM\Index(name="secc_id", columns={"secc_id"})})
 * @ORM\Entity
 */
class Nota
{
    /**
     * @var integer
     *
     * @ORM\Column(name="nota_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $notaId;

    /**
     * @var integer
     *
     * @ORM\Column(name="nota", type="integer", nullable=false)
     */
    private $nota;

    /**
     * @var string
     *
     * @ORM\Column(name="asist", type="string", length=4, nullable=false)
     */
    private $asist;

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
     * @var \Seccion
     *
     * @ORM\ManyToOne(targetEntity="Seccion")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="secc_id", referencedColumnName="secc_id")
     * })
     */
    private $secc;



    /**
     * Get notaId
     *
     * @return integer 
     */
    public function getNotaId()
    {
        return $this->notaId;
    }

    /**
     * Set nota
     *
     * @param integer $nota
     * @return Nota
     */
    public function setNota($nota)
    {
        $this->nota = $nota;

        return $this;
    }

    /**
     * Get nota
     *
     * @return integer 
     */
    public function getNota()
    {
        return $this->nota;
    }

    /**
     * Set asist
     *
     * @param string $asist
     * @return Nota
     */
    public function setAsist($asist)
    {
        $this->asist = $asist;

        return $this;
    }

    /**
     * Get asist
     *
     * @return string 
     */
    public function getAsist()
    {
        return $this->asist;
    }

    /**
     * Set cedu
     *
     * @param \AppBundle\Entity\Estudiante $cedu
     * @return Nota
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

    /**
     * Set secc
     *
     * @param \AppBundle\Entity\Seccion $secc
     * @return Nota
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
}
