<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * UnidadCurricular
 *
 * @ORM\Table(name="unidad_curricular", options={"collate"="utf8_general_ci", "charset"="utf8"}, indexes={@ORM\Index(name="pnf_id", columns={"pnf_id"})})
 * @ORM\Entity(repositoryClass="AppBundle\Repository\UnidadCurricularRepository")
 */
class UnidadCurricular
{
    /**
     * @var integer
     *
     * @ORM\Column(name="uc_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $ucId;

    /**
     * @var string
     *
     * @ORM\Column(name="uc_desc", type="string", length=100, nullable=false)
     */
    private $ucDesc;

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
     * Get ucId
     *
     * @return integer
     */
    public function getUcId()
    {
        return $this->ucId;
    }

    /**
     * Set ucDesc
     *
     * @param  string           $ucDesc
     * @return UnidadCurricular
     */
    public function setUcDesc($ucDesc)
    {
        $this->ucDesc = $ucDesc;

        return $this;
    }

    /**
     * Get ucDesc
     *
     * @return string
     */
    public function getUcDesc()
    {
        return $this->ucDesc;
    }

    /**
     * Set pnf
     *
     * @param  \AppBundle\Entity\Pnf $pnf
     * @return UnidadCurricular
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
