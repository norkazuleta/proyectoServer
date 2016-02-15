<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Docente
 *
 * @ORM\Table(name="docente", options={"collate"="utf8_general_ci", "charset"="utf8"})
 * @ORM\Entity
 */
class Docente
{
    /**
     * @var string
     *
     * @ORM\Column(name="cedu", type="string", length=11, nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $cedu;

    /**
     * @var string
     *
     * @ORM\Column(name="nomb", type="string", length=100, nullable=false)
     */
    private $nomb;

    /**
     * @var string
     *
     * @ORM\Column(name="apell", type="string", length=100, nullable=false)
     */
    private $apell;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="fn", type="date", nullable=false)
     */
    private $fn;

    /**
     * @var string
     *
     * @ORM\Column(name="correo", type="string", length=100, nullable=false)
     */
    private $correo;

    /**
     * @var string
     *
     * @ORM\Column(name="tlf", type="string", length=11, nullable=false)
     */
    private $tlf;


    /**
     * Set cedu
     *
     * @param string $cedu
     * @return Estudiante
     */
    public function setCedu($cedu)
    {
        $this->cedu = $cedu;

        return $this;
    }

    /**
     * Get cedu
     *
     * @return string
     */
    public function getCedu()
    {
        return $this->cedu;
    }

    /**
     * Set nomb
     *
     * @param string $nomb
     * @return Docente
     */
    public function setNomb($nomb)
    {
        $this->nomb = $nomb;

        return $this;
    }

    /**
     * Get nomb
     *
     * @return string
     */
    public function getNomb()
    {
        return $this->nomb;
    }

    /**
     * Set apell
     *
     * @param string $apell
     * @return Docente
     */
    public function setApell($apell)
    {
        $this->apell = $apell;

        return $this;
    }

    /**
     * Get apell
     *
     * @return string
     */
    public function getApell()
    {
        return $this->apell;
    }

    /**
     * Set fn
     *
     * @param \DateTime $fn
     * @return Docente
     */
    public function setFn($fn)
    {
        $this->fn = $fn;

        return $this;
    }

    /**
     * Get fn
     *
     * @return \DateTime
     */
    public function getFn()
    {
        return $this->fn;
    }

    /**
     * Set correo
     *
     * @param string $correo
     * @return Docente
     */
    public function setCorreo($correo)
    {
        $this->correo = $correo;

        return $this;
    }

    /**
     * Get correo
     *
     * @return string
     */
    public function getCorreo()
    {
        return $this->correo;
    }

    /**
     * Set tlf
     *
     * @param string $tlf
     * @return Docente
     */
    public function setTlf($tlf)
    {
        $this->tlf = $tlf;

        return $this;
    }

    /**
     * Get tlf
     *
     * @return string
     */
    public function getTlf()
    {
        return $this->tlf;
    }
}
