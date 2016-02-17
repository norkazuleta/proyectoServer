<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Seccion
 *
 * @ORM\Table(name="seccion", options={"collate"="utf8_general_ci", "charset"="utf8"}, uniqueConstraints={@ORM\UniqueConstraint(name="secc_codi", columns={"secc_codi"})}, indexes={@ORM\Index(name="pnf_id", columns={"pnf_id"}), @ORM\Index(name="tray_id", columns={"tray_id"}), @ORM\Index(name="peri_id", columns={"peri_id"}), @ORM\Index(name="uc_id", columns={"uc_id"}), @ORM\Index(name="malla_id", columns={"malla_id"}), @ORM\Index(name="turn_id", columns={"turn_id"})})
 * @ORM\Entity
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
     * @var \Malla
     *
     * @ORM\ManyToOne(targetEntity="Malla")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="malla_id", referencedColumnName="malla_id")
     * })
     */
    private $malla;



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
     * Set malla
     *
     * @param \AppBundle\Entity\Malla $malla
     * @return Seccion
     */
    public function setMalla(\AppBundle\Entity\Malla $malla = null)
    {
        $this->malla = $malla;

        return $this;
    }

    /**
     * Get malla
     *
     * @return \AppBundle\Entity\Malla 
     */
    public function getMalla()
    {
        return $this->malla;
    }
}
