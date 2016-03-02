<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * PnfUc
 *
 * @ORM\Table(name="pnf_uc", options={"collate"="utf8_general_ci", "charset"="utf8"}, indexes={@ORM\Index(name="id_pnf_peri", columns={"pnf_peri_id"}), @ORM\Index(name="uc_id", columns={"uc_id"})})
 * @ORM\Entity
 */
class PnfUc
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id_pnf_uc", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idPnfUc;

    /**
     * @var \PnfPeri
     *
     * @ORM\ManyToOne(targetEntity="PnfPeri")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="pnf_peri_id", referencedColumnName="pnf_peri_id")
     * })
     */
    private $pnfPeri;

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
     * Get idPnfUc
     *
     * @return integer 
     */
    public function getIdPnfUc()
    {
        return $this->idPnfUc;
    }

    /**
     * Set pnfPeri
     *
     * @param \AppBundle\Entity\PnfPeri $pnfPeri
     * @return PnfUc
     */
    public function setPnfPeri(\AppBundle\Entity\PnfPeri $pnfPeri = null)
    {
        $this->pnfPeri = $pnfPeri;

        return $this;
    }

    /**
     * Get pnfPeri
     *
     * @return \AppBundle\Entity\PnfPeri 
     */
    public function getPnfPeri()
    {
        return $this->pnfPeri;
    }

    /**
     * Set uc
     *
     * @param \AppBundle\Entity\UnidadCurricular $uc
     * @return PnfUc
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
