<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * UnidadCurricular
 *
 * @ORM\Table(name="unidad_curricular", options={"collate"="utf8_general_ci", "charset"="utf8"}, indexes={@ORM\Index(name="id_pnf", columns={"pnf_id"})})
 * @ORM\Entity
 */
class UnidadCurricular
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id_uc", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idUc;

    /**
     * @var string
     *
     * @ORM\Column(name="desc_uc", type="string", length=100, nullable=false)
     */
    private $descUc;

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
     * Get idUc
     *
     * @return integer 
     */
    public function getIdUc()
    {
        return $this->idUc;
    }

    /**
     * Set descUc
     *
     * @param string $descUc
     * @return UnidadCurricular
     */
    public function setDescUc($descUc)
    {
        $this->descUc = $descUc;

        return $this;
    }

    /**
     * Get descUc
     *
     * @return string 
     */
    public function getDescUc()
    {
        return $this->descUc;
    }

    /**
     * Set pnf
     *
     * @param \AppBundle\Entity\Pnf $pnf
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
