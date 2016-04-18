<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Pnf
 *
 * @ORM\Table(name="pnf", options={"collate"="utf8_general_ci", "charset"="utf8"})
 * @ORM\Entity(repositoryClass="AppBundle\Repository\PnfRepository")
 */
class Pnf
{
    /**
     * @var integer
     *
     * @ORM\Column(name="pnf_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $pnfId;

    /**
     * @var string
     *
     * @ORM\Column(name="pnf_desc", type="string", length=100, nullable=false)
     */
    private $pnfDesc;

    /**
     * Get pnfId
     *
     * @return integer
     */
    public function getPnfId()
    {
        return $this->pnfId;
    }

    /**
     * Set pnfDesc
     *
     * @param  string $pnfDesc
     * @return Pnf
     */
    public function setPnfDesc($pnfDesc)
    {
        $this->pnfDesc = $pnfDesc;

        return $this;
    }

    /**
     * Get pnfDesc
     *
     * @return string
     */
    public function getPnfDesc()
    {
        return $this->pnfDesc;
    }
}
