<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Accessor;
use JMS\Serializer\Annotation\SerializedName;
use JMS\Serializer\Annotation\Type;

/**
 * PeriodoAcademico
 *
 * @ORM\Table(name="periodo_academico", options={"collate"="utf8_general_ci", "charset"="utf8"}, indexes={@ORM\Index(name="pnf_tipo_id", columns={"pnf_tipo_id"})})
 * @ORM\Entity(repositoryClass="AppBundle\Repository\PeriodoAcademicoRepository")
 */
class PeriodoAcademico
{
    /**
     * @var integer
     *
     * @ORM\Column(name="pa_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $paId;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="pa_anio", columnDefinition="YEAR", nullable=false)
     */
    private $paAnio;

    /**
     * @var string
     *
     * @ORM\Column(name="pa_codi", type="string", length=10, nullable=false)
     */
    private $paCodi;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="pa_ini", type="date", nullable=false)
     */
    private $paIni;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="pa_fin", type="date", nullable=false)
     */
    private $paFin;

    /**
     * @var boolean
     *
     * @ORM\Column(name="status", type="boolean", nullable=false)
     */
    private $paStatus;

    /**
     * @var \PnfTipo
     *
     * @ORM\ManyToOne(targetEntity="PnfTipo")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="pnf_tipo_id", referencedColumnName="tipo_id")
     * })
     */
    private $pnfTipo;



    /**
     * @var string
     *
     * @SerializedName("pa")
     * @Type("string")
     * @Accessor(getter="getPa")
     */
    private $pa;

    /**
     * Get paId
     *
     * @return integer 
     */
    public function getPaId()
    {
        return $this->paId;
    }

    /**
     * Set paAnio
     *
     * @param string $paAnio
     * @return PeriodoAcademico
     */
    public function setPaAnio($paAnio)
    {
        $this->paAnio = $paAnio;

        return $this;
    }

    /**
     * Get paAnio
     *
     * @return string 
     */
    public function getPaAnio()
    {
        return $this->paAnio;
    }

    /**
     * Set paCodi
     *
     * @param string $paCodi
     * @return PeriodoAcademico
     */
    public function setPaCodi($paCodi)
    {
        $this->paCodi = $paCodi;

        return $this;
    }

    /**
     * Get paCodi
     *
     * @return string 
     */
    public function getPaCodi()
    {
        return $this->paCodi;
    }

    /**
     * Set paIni
     *
     * @param \DateTime $paIni
     * @return PeriodoAcademico
     */
    public function setPaIni(\Datetime $paIni = null)
    {
        $this->paIni = $paIni;

        return $this;
    }

    /**
     * Get paIni
     *
     * @return \DateTime 
     */
    public function getPaIni()
    {
        return $this->paIni;
    }

    /**
     * Set paFin
     *
     * @param \DateTime $paFin
     * @return PeriodoAcademico
     */
    public function setPaFin(\Datetime $paFin = null)
    {
        $this->paFin = $paFin;

        return $this;
    }

    /**
     * Get paFin
     *
     * @return \DateTime 
     */
    public function getPaFin()
    {
        return $this->paFin;
    }

    /**
     * Set paStatus
     *
     * @param boolean $paStatus
     * @return PeriodoAcademico
     */
    public function setPaStatus($paStatus)
    {
        $this->paStatus = $paStatus;

        return $this;
    }

    /**
     * Get paStatus
     *
     * @return boolean 
     */
    public function getPaStatus()
    {
        return $this->paStatus;
    }

    /**
     * Set pnfTipo
     *
     * @param \AppBundle\Entity\PnfTipo $pnfTipo
     * @return PeriodoAcademico
     */
    public function setPnfTipo(\AppBundle\Entity\PnfTipo $pnfTipo = null)
    {
        $this->pnfTipo = $pnfTipo;

        return $this;
    }

    /**
     * Get pnfTipo
     *
     * @return \AppBundle\Entity\PnfTipo 
     */
    public function getPnfTipo()
    {
        return $this->pnfTipo;
    }

    /**
     * Get PaAnio PaCodi PaPnfTipo.
     *
     * @return string
     */
    public function getPa()
    {
        return sprintf(' %s - %s %s ', $this->getPaAnio(), $this->getPaCodi(), $this->getPnfTipo()->getTipoDesc());
    }
}
