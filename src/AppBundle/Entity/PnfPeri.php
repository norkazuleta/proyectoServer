<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * PnfPeri
 *
 * @ORM\Table(name="pnf_peri", options={"collate"="utf8_general_ci", "charset"="utf8"}, indexes={@ORM\Index(name="id_pnf_tray", columns={"pnf_tray_Id"}), @ORM\Index(name="id_peri", columns={"peri_Id"})})
 * @ORM\Entity
 */
class PnfPeri
{
    /**
     * @var integer
     *
     * @ORM\Column(name="pnf_peri_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $pnfPeriId;

    /**
     * @var integer
     *
     * @ORM\Column(name="peri_Id", type="integer", nullable=false)
     */
    private $periId;

    /**
     * @var \PnfTray
     *
     * @ORM\ManyToOne(targetEntity="PnfTray")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="pnf_tray_Id", referencedColumnName="pnf_tray_id")
     * })
     */
    private $pnfTray;



    /**
     * Get pnfPeriId
     *
     * @return integer 
     */
    public function getPnfPeriId()
    {
        return $this->pnfPeriId;
    }

    /**
     * Set periId
     *
     * @param integer $periId
     * @return PnfPeri
     */
    public function setPeriId($periId)
    {
        $this->periId = $periId;

        return $this;
    }

    /**
     * Get periId
     *
     * @return integer 
     */
    public function getPeriId()
    {
        return $this->periId;
    }

    /**
     * Set pnfTray
     *
     * @param \AppBundle\Entity\PnfTray $pnfTray
     * @return PnfPeri
     */
    public function setPnfTray(\AppBundle\Entity\PnfTray $pnfTray = null)
    {
        $this->pnfTray = $pnfTray;

        return $this;
    }

    /**
     * Get pnfTray
     *
     * @return \AppBundle\Entity\PnfTray 
     */
    public function getPnfTray()
    {
        return $this->pnfTray;
    }
}
