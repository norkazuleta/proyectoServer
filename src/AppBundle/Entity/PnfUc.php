<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * PnfUc
 *
 * @ORM\Table(name="pnf_uc", options={"collate"="utf8_general_ci", "charset"="utf8"}, indexes={@ORM\Index(name="id_pnf_peri", columns={"pnf_peri_id"}), @ORM\Index(name="id_uc", columns={"ud_id"})})
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
     *   @ORM\JoinColumn(name="ud_id", referencedColumnName="id_uc")
     * })
     */
    private $ud;



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
     * Set ud
     *
     * @param \AppBundle\Entity\UnidadCurricular $ud
     * @return PnfUc
     */
    public function setUd(\AppBundle\Entity\UnidadCurricular $ud = null)
    {
        $this->ud = $ud;

        return $this;
    }

    /**
     * Get ud
     *
     * @return \AppBundle\Entity\UnidadCurricular 
     */
    public function getUd()
    {
        return $this->ud;
    }
}
