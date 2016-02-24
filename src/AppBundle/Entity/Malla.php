<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Malla
 *
 * @ORM\Table(name="malla", options={"collate"="utf8_general_ci", "charset"="utf8"}, indexes={@ORM\Index(name="pnf_tipo_id", columns={"pnf_tipo_id"})})
 * @ORM\Entity(repositoryClass="AppBundle\Repository\MallaRepository")
 */
class Malla
{
    /**
     * @var integer
     *
     * @ORM\Column(name="malla_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $mallaId;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="malla_anio", columnDefinition="YEAR", nullable=false)
     */
    private $mallaAnio;

    /**
     * @var string
     *
     * @ORM\Column(name="malla_codi", type="string", length=10, nullable=false)
     */
    private $mallaCodi;

    /**
     * @var boolean
     *
     * @ORM\Column(name="status", type="boolean", nullable=false)
     */
    private $status;

    /**
     * @var \PnfTipo
     *
     * @ORM\ManyToOne(targetEntity="PnfTipo")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="pnf_tipo_id", referencedColumnName="tipo_id")
     * })
     */
    private $pnfTipo;



    /**
     * Get mallaId
     *
     * @return integer 
     */
    public function getMallaId()
    {
        return $this->mallaId;
    }

    /**
     * Set mallaAnio
     *
     * @param \DateTime $mallaAnio
     * @return Malla
     */
    public function setMallaAnio($mallaAnio)
    {
        $this->mallaAnio = $mallaAnio;

        return $this;
    }

    /**
     * Get mallaAnio
     *
     * @return \DateTime 
     */
    public function getMallaAnio()
    {
        return $this->mallaAnio;
    }

    /**
     * Set mallaCodi
     *
     * @param string $mallaCodi
     * @return Malla
     */
    public function setMallaCodi($mallaCodi)
    {
        $this->mallaCodi = $mallaCodi;

        return $this;
    }

    /**
     * Get mallaCodi
     *
     * @return string 
     */
    public function getMallaCodi()
    {
        return $this->mallaCodi;
    }

    /**
     * Set status
     *
     * @param boolean $status
     * @return Malla
     */
    public function setStatus($status)
    {
        $this->status = $status;

        return $this;
    }

    /**
     * Get status
     *
     * @return boolean 
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * Set pnfTipo
     *
     * @param \AppBundle\Entity\PnfTipo $pnfTipo
     * @return Malla
     */
    public function setPnfTipo(\AppBundle\Entity\PnfTipo $pnfTipo = null)
    {
        $this->pnfTipo = $pnfTipo;

        return $this;
    }

    /**
     * Get pnfTipo
     *
     * @return \AppBundle\Entity\PnfTipo 
     */
    public function getPnfTipo()
    {
        return $this->pnfTipo;
    }
}
