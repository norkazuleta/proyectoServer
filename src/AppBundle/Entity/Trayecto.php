<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Trayecto
 *
 * @ORM\Table(name="trayecto", options={"collate"="utf8_general_ci", "charset"="utf8"})
 * @ORM\Entity(repositoryClass="AppBundle\Repository\TrayectoRepository")
 */
class Trayecto
{
    /**
     * @var integer
     *
     * @ORM\Column(name="tray_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $trayId;

    /**
     * @var string
     *
     * @ORM\Column(name="tray_desc", type="string", length=100, nullable=false)
     */
    private $trayDesc;

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
     * Set trayDesc
     *
     * @param  string   $trayDesc
     * @return Trayecto
     */
    public function setTrayDesc($trayDesc)
    {
        $this->trayDesc = $trayDesc;

        return $this;
    }

    /**
     * Get trayDesc
     *
     * @return string
     */
    public function getTrayDesc()
    {
        return $this->trayDesc;
    }
}
