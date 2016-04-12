<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Accessor;
use JMS\Serializer\Annotation\SerializedName;
use JMS\Serializer\Annotation\Type;

/**
 * Seccion
 *
 * @ORM\Table(name="seccion", options={"collate"="utf8_general_ci", "charset"="utf8"}, uniqueConstraints={@ORM\UniqueConstraint(name="secc_codi", columns={"secc_codi"})}, indexes={@ORM\Index(name="pnf_id", columns={"pnf_id"}), @ORM\Index(name="tray_id", columns={"tray_id"}), @ORM\Index(name="peri_id", columns={"peri_id"}), @ORM\Index(name="uc_id", columns={"uc_id"}), @ORM\Index(name="pa_id", columns={"pa_id"}), @ORM\Index(name="aldea_codi", columns={"aldea_codi"}), @ORM\Index(name="turn_id", columns={"turn_id"})})
 * @ORM\Entity(repositoryClass="AppBundle\Repository\SeccionRepository")
 */
class Seccion
{
    /**
     * @var integer
     *
     * @ORM\Column(name="secc_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $seccId;

    /**
     * @var string
     *
     * @ORM\Column(name="secc_codi", type="string", length=50, nullable=false)
     */
    private $seccCodi;

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
    private $turn;

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
     * @var \Trayecto
     *
     * @ORM\ManyToOne(targetEntity="Trayecto")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="tray_id", referencedColumnName="tray_id")
     * })
     */
    private $tray;

    /**
     * @var \Periodo
     *
     * @ORM\ManyToOne(targetEntity="Periodo")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="peri_id", referencedColumnName="peri_id")
     * })
     */
    private $peri;

    /**
     * @var \UnidadCurricular
     *
     * @ORM\ManyToOne(targetEntity="UnidadCurricular")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="uc_id", referencedColumnName="uc_id")
     * })
     */
    private $uc;

    /**
     * @var \PeriodoAcademico
     *
     * @ORM\ManyToOne(targetEntity="PeriodoAcademico")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="pa_id", referencedColumnName="pa_id")
     * })
     */
    private $pa;

    /**
     * @var \SeccionDoce
     *
     * @ORM\OneToOne(targetEntity="SeccionDoce", mappedBy="secc", cascade={"persist", "remove"})
     */
    private $doce;

    /**
     * @var string
     *
     * @SerializedName("aldea_turno")
     * @Type("string")
     * @Accessor(getter="getAldeaTurno")
     */
    private $estbRif;

    /**
     * Get seccId
     *
     * @return integer 
     */
    public function getSeccId()
    {
        return $this->seccId;
    }

    /**
     * Set seccCodi
     *
     * @param string $seccCodi
     * @return Seccion
     */
    public function setSeccCodi($seccCodi)
    {
        $this->seccCodi = $seccCodi;

        return $this;
    }

    /**
     * Get seccCodi
     *
     * @return string 
     */
    public function getSeccCodi()
    {
        return $this->seccCodi;
    }

    /**
     * Set turn
     *
     * @param \AppBundle\Entity\Turno $turn
     * @return Seccion
     */
    public function setTurn(\AppBundle\Entity\Turno $turn = null)
    {
        $this->turn = $turn;

        return $this;
    }

    /**
     * Get turn
     *
     * @return \AppBundle\Entity\Turno 
     */
    public function getTurn()
    {
        return $this->turn;
    }

    /**
     * Set pnf
     *
     * @param \AppBundle\Entity\Pnf $pnf
     * @return Seccion
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

    /**
     * Set tray
     *
     * @param \AppBundle\Entity\Trayecto $tray
     * @return Seccion
     */
    public function setTray(\AppBundle\Entity\Trayecto $tray = null)
    {
        $this->tray = $tray;

        return $this;
    }

    /**
     * Get tray
     *
     * @return \AppBundle\Entity\Trayecto 
     */
    public function getTray()
    {
        return $this->tray;
    }

    /**
     * Set peri
     *
     * @param \AppBundle\Entity\Periodo $peri
     * @return Seccion
     */
    public function setPeri(\AppBundle\Entity\Periodo $peri = null)
    {
        $this->peri = $peri;

        return $this;
    }

    /**
     * Get peri
     *
     * @return \AppBundle\Entity\Periodo 
     */
    public function getPeri()
    {
        return $this->peri;
    }

    /**
     * Set uc
     *
     * @param \AppBundle\Entity\UnidadCurricular $uc
     * @return Seccion
     */
    public function setUc(\AppBundle\Entity\UnidadCurricular $uc = null)
    {
        $this->uc = $uc;

        return $this;
    }

    /**
     * Get uc
     *
     * @return \AppBundle\Entity\UnidadCurricular 
     */
    public function getUc()
    {
        return $this->uc;
    }

    /**
     * Set pa
     *
     * @param \AppBundle\Entity\PeriodoAcademico $pa
     * @return Seccion
     */
    public function setPa(\AppBundle\Entity\PeriodoAcademico $pa = null)
    {
        $this->pa = $pa;

        return $this;
    }

    /**
     * Get pa
     *
     * @return \AppBundle\Entity\PeriodoAcademico 
     */
    public function getPa()
    {
        return $this->pa;
    }

    /**
     * Set aldea
     *
     * @param \AppBundle\Entity\Aldea $aldea
     * @return Seccion
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
     * Set doce.
     *
     * @param \AppBundle\Entity\SeccionDoce $doce
     *
     * @return Seccion
     */
    public function setDoce(\AppBundle\Entity\SeccionDoce $doce = null)
    {
        $this->doce = $doce;
        $this->doce->setSecc($this);

        return $this;
    }

    /**
     * Get doce.
     *
     * @return \AppBundle\Entity\SeccionDoce
     */
    public function getDoce()
    {
        return $this->doce;
    }

    /**
     * Get comNombEstb comRif.
     *
     * @return string
     */
    public function getAldeaTurno()
    {
        return sprintf('%s - %s', $this->getAldea()->getAldeaNomb(), ($this->getTurn())? $this->getTurn()->getTurnDesc() : ':-)');
    }
}
