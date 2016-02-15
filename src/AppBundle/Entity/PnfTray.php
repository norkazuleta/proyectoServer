<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * PnfTray
 *
 * @ORM\Table(name="pnf_tray", options={"collate"="utf8_general_ci", "charset"="utf8"}, indexes={@ORM\Index(name="id_pnf", columns={"pnf_id"}), @ORM\Index(name="id_tray", columns={"tray_id"})})
 * @ORM\Entity
 */
class PnfTray
{
    /**
     * @var integer
     *
     * @ORM\Column(name="pnf_tray_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $pnfTrayId;

    /**
     * @var integer
     *
     * @ORM\Column(name="tray_id", type="integer", nullable=false)
     */
    private $trayId;

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
     * Get pnfTrayId
     *
     * @return integer 
     */
    public function getPnfTrayId()
    {
        return $this->pnfTrayId;
    }

    /**
     * Set trayId
     *
     * @param integer $trayId
     * @return PnfTray
     */
    public function setTrayId($trayId)
    {
        $this->trayId = $trayId;

        return $this;
    }

    /**
     * Get trayId
     *
     * @return integer 
     */
    public function getTrayId()
    {
        return $this->trayId;
    }

    /**
     * Set pnf
     *
     * @param \AppBundle\Entity\Pnf $pnf
     * @return PnfTray
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
}
