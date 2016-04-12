<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Accessor;
use JMS\Serializer\Annotation\SerializedName;
use JMS\Serializer\Annotation\Type;
/**
 * Docente
 *
 * @ORM\Table(name="docente", options={"collate"="utf8_general_ci", "charset"="utf8"})
 * @ORM\Entity(repositoryClass="AppBundle\Repository\DocenteRepository")
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
     * @var string
     *
     * @SerializedName("nomb_apell")
     * @Type("string")
     * @Accessor(getter="getNombApell")
     */
    private $nombApell;

    /**
     * @var string
     *
     * @SerializedName("nomb_apell_cedu")
     * @Type("string")
     * @Accessor(getter="getNombApellCedu")
     */
    private $nombApellCedu;

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
    public function setFn(\DateTime $fn = null)
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

    /**
     * Get NombApell.
     *
     * @return string
     */
    public function getNombApell()
    {
        return sprintf('%s %s', $this->getNomb(), $this->getApell());
    }

    /**
     * Get NombApellCedu.
     *
     * @return string
     */
    public function getNombApellCedu()
    {
        return sprintf('%s %s (%s)', $this->getNomb(), $this->getApell(), $this->getCedu());
    }
}
