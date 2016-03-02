<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * EstuPnf
 *
 * @ORM\Table(name="estu_pnf", options={"collate"="utf8_general_ci", "charset"="utf8"}, indexes={@ORM\Index(name="cedu", columns={"cedu"}), @ORM\Index(name="pnf_id", columns={"pnf_id"})})
 * @ORM\Entity
 */
class EstuPnf
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;


    /**
     * @var \Estudiante
     *
     * @ORM\ManyToOne(targetEntity="Estudiante")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="cedu", referencedColumnName="cedu")
     * })
     */
    private $estu;

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
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set estu
     *
     * @param \AppBundle\Entity\Estudiante $estu
     * @return EstuPnf
     */
    public function setEstu(\AppBundle\Entity\Estudiante $estu = null)
    {
        $this->estu = $estu;

        return $this;
    }

    /**
     * Get estu
     *
     * @return \AppBundle\Entity\Estudiante
     */
    public function getEstu()
    {
        return $this->estu;
    }

    /**
     * Set pnf
     *
     * @param \AppBundle\Entity\Pnf $pnf
     * @return EstuPnf
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
