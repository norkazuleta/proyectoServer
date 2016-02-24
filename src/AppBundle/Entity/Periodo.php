<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Periodo
 *
 * @ORM\Table(name="periodo", options={"collate"="utf8_general_ci", "charset"="utf8"})
 * @ORM\Entity(repositoryClass="AppBundle\Repository\PeriodoRepository")
 */
class Periodo
{
    /**
     * @var integer
     *
     * @ORM\Column(name="peri_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $periId;

    /**
     * @var string
     *
     * @ORM\Column(name="peri_desc", type="string", length=50, nullable=false)
     */
    private $periDesc;



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
     * Set periDesc
     *
     * @param string $periDesc
     * @return Periodo
     */
    public function setPeriDesc($periDesc)
    {
        $this->periDesc = $periDesc;

        return $this;
    }

    /**
     * Get periDesc
     *
     * @return string 
     */
    public function getPeriDesc()
    {
        return $this->periDesc;
    }
}
