<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * PnfTipo
 *
 * @ORM\Table(name="pnf_tipo", options={"collate"="utf8_general_ci", "charset"="utf8"})
 * @ORM\Entity
 */
class PnfTipo
{
    /**
     * @var integer
     *
     * @ORM\Column(name="tipo_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $tipoId;

    /**
     * @var string
     *
     * @ORM\Column(name="tipo_desc", type="string", length=50, nullable=false)
     */
    private $tipoDesc;



    /**
     * Get tipoId
     *
     * @return integer 
     */
    public function getTipoId()
    {
        return $this->tipoId;
    }

    /**
     * Set tipoDesc
     *
     * @param string $tipoDesc
     * @return PnfTipo
     */
    public function setTipoDesc($tipoDesc)
    {
        $this->tipoDesc = $tipoDesc;

        return $this;
    }

    /**
     * Get tipoDesc
     *
     * @return string 
     */
    public function getTipoDesc()
    {
        return $this->tipoDesc;
    }
}
