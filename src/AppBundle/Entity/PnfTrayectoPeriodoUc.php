<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * PnfTrayectoPeriodo
 *
 * @ORM\Table(name="pnf_tray_peri_uc", options={"collate"="utf8_general_ci", "charset"="utf8"}, indexes={@ORM\Index(name="id", columns={"id"})})
 * @ORM\Entity(repositoryClass="AppBundle\Repository\PnfTrayectoPeriodoUcRepository")
 */
class PnfTrayectoPeriodoUc
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
     * @var \PnfTrayectoPeriodo
     *
     * @ORM\ManyToOne(targetEntity="PnfTrayectoPeriodo")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="ptp_id", referencedColumnName="id")
     * })
     */
    private $pnfTrayPeri;

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
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set pnfTrayPeri
     *
     * @param  \AppBundle\Entity\PnfTrayectoPeriodo $pnfTrayPeri
     * @return PnfTrayectoPeriodoUc
     */
    public function setPnfTrayPeri(\AppBundle\Entity\PnfTrayectoPeriodo $pnfTrayPeri = null)
    {
        $this->pnfTrayPeri = $pnfTrayPeri;

        return $this;
    }

    /**
     * Get pnfTrayPeri
     *
     * @return \AppBundle\Entity\PnfTrayectoPeriodo
     */
    public function getPnfTrayPeri()
    {
        return $this->pnfTrayPeri;
    }

    /**
     * Set uc
     *
     * @param  \AppBundle\Entity\UnidadCurricular $uc
     * @return PnfTrayectoPeriodoUc
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
}
