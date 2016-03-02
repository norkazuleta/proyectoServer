<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Turno
 *
 * @ORM\Table(name="turno", options={"collate"="utf8_general_ci", "charset"="utf8"})
 * @ORM\Entity(repositoryClass="AppBundle\Repository\TurnoRepository")
 */
class Turno
{
    /**
     * @var integer
     *
     * @ORM\Column(name="turn_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $turnId;

    /**
     * @var string
     *
     * @ORM\Column(name="turn_desc", type="string", length=100, nullable=false)
     */
    private $turnDesc;



    /**
     * Get turnId
     *
     * @return integer 
     */
    public function getTurnId()
    {
        return $this->turnId;
    }

    /**
     * Set turnDesc
     *
     * @param string $turnDesc
     * @return Turno
     */
    public function setTurnDesc($turnDesc)
    {
        $this->turnDesc = $turnDesc;

        return $this;
    }

    /**
     * Get turnDesc
     *
     * @return string 
     */
    public function getTurnDesc()
    {
        return $this->turnDesc;
    }
}
