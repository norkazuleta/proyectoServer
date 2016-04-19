<?php

namespace AppBundle\Entity;

use AppBundle\Util\Utility;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Accessor;
use JMS\Serializer\Annotation\SerializedName;
use JMS\Serializer\Annotation\Type;

/**
 * Estudiante
 *
 * @ORM\Table(name="estudiante", options={"collate"="utf8_general_ci", "charset"="utf8"})
 * @ORM\Entity(repositoryClass="AppBundle\Repository\EstudianteRepository")
 * @ORM\HasLifecycleCallbacks()
 */
class Estudiante
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
     * @SerializedName("cedu_nomb_apell")
     * @Type("string")
     * @Accessor(getter="getCeduNombApell")
     */
    private $ceduNombApell;

    /**
     * Hook on pre-persist operations.
     *
     * @ORM\PrePersist
     */
    public function prePersist()
    {
        $this->cedu = Utility::upperCase($this->cedu);
        $this->nomb = Utility::upperCase($this->nomb);
        $this->apell = Utility::upperCase($this->apell);
        $this->correo = Utility::lowerCase($this->correo);
    }

    /**
     * Hook on pre-update operations.
     *
     * @ORM\PreUpdate
     */
    public function preUpdate()
    {
        $this->cedu = Utility::upperCase($this->cedu);
        $this->nomb = Utility::upperCase($this->nomb);
        $this->apell = Utility::upperCase($this->apell);
        $this->correo = Utility::lowerCase($this->correo);
    }
    /**
     * Set cedu
     *
     * @param  string     $cedu
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
     * @param  string     $nomb
     * @return Estudiante
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
     * @param  string     $apell
     * @return Estudiante
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
     * @param  \DateTime  $fn
     * @return Estudiante
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
     * @param  string     $correo
     * @return Estudiante
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
     * @param  string     $tlf
     * @return Estudiante
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
     * Get CeduNombApell.
     *
     * @return string
     */
    public function getCeduNombApell()
    {
        return sprintf('%s (%s %s)', $this->getCedu(), $this->getNomb(), $this->getApell());
    }
}
