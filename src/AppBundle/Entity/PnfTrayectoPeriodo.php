<?php

namespace AppBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Accessor;
use JMS\Serializer\Annotation\SerializedName;
use JMS\Serializer\Annotation\Type;

/**
 * PnfTrayectoPeriodo
 *
 * @ORM\Table(name="pnf_tray_peri", options={"collate"="utf8_general_ci", "charset"="utf8"}, indexes={@ORM\Index(name="pnf_id", columns={"pnf_id"}), @ORM\Index(name="tray_id", columns={"tray_id"}), @ORM\Index(name="peri_id", columns={"peri_id"})})
 * @ORM\Entity(repositoryClass="AppBundle\Repository\PnfTrayectoPeriodoRepository")
 */
class PnfTrayectoPeriodo
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
     * @var \PnfTrayectoPeriodoUc
     *
     * @ORM\OneToMany(targetEntity="PnfTrayectoPeriodoUc", mappedBy="pnfTrayPeri", cascade={"persist", "remove"})
     */
    private $uc;

    /**
     * @var string
     *
     * @SerializedName("pnf_tray_peri")
     * @Type("string")
     * @Accessor(getter="getPnfTrayPeri")
     */
    private $pnfTrayPeriodo;

    /**
     * Constructor.
     */
    public function __construct()
    {

        $this->uc = new ArrayCollection();
    }

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
     * Set pnf
     *
     * @param  \AppBundle\Entity\Pnf $pnf
     * @return PnfTrayectoPeriodo
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
     * @param  \AppBundle\Entity\Trayecto $tray
     * @return PnfTrayectoPeriodo
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
     * @param  \AppBundle\Entity\Periodo $peri
     * @return PnfTrayectoPeriodo
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
     * Add uc
     *
     * @param  \AppBundle\Entity\PnfTrayectoPeriodoUc $uc
     * @return PnfTrayectoPeriodo
     */
    public function addUc(\AppBundle\Entity\PnfTrayectoPeriodoUc $uc)
    {
        $this->uc[] = $uc;
        $uc->setPnfTrayPeri($this);

        return $this;
    }

    /**
     * Remove uc
     *
     * @param \AppBundle\Entity\PnfTrayectoPeriodoUc $uc
     */
    public function removeUc(\AppBundle\Entity\PnfTrayectoPeriodoUc $uc)
    {
        $this->uc->removeElement($uc);
    }

    /**
     * Get uc
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getUc()
    {
        return $this->uc;
    }

    /**
     * Get Pnf Tray Peri.
     *
     * @return string
     */
    public function getPnfTrayPeri()
    {
        return sprintf('[ PNF: %s ] [TRAYECTO: %s ]  [ PERIODO: %s ]', $this->getPnf()->getPnfDesc(), $this->getTray()->getTrayDesc(), $this->getPeri()->getPeriDesc());
    }
}
