<?php

namespace AppBundle\Entity;

use AppBundle\Util\Utility;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * Aldea
 *
 * @ORM\Table(name="aldea", options={"collate"="utf8_general_ci", "charset"="utf8"}, indexes={@ORM\Index(name="parroq_codi", columns={"parroq_codi"})})
 * @ORM\Entity(repositoryClass="AppBundle\Repository\AldeaRepository")
 * @ORM\HasLifecycleCallbacks()
 */
class Aldea
{
    /**
     * @var string
     *
     * @ORM\Column(name="aldea_codi", type="string", length=10, nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $aldeaCodi;

    /**
     * @var string
     *
     * @ORM\Column(name="aldea_nomb", type="string", length=100, nullable=false)
     */
    private $aldeaNomb;

    /**
     * @var \Parroquia
     *
     * @ORM\ManyToOne(targetEntity="Parroquia")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="parroq_codi", referencedColumnName="parroq_codi")
     * })
     */
    private $parroq;


    /**
     * @var \AldeaTurno
     *
     * @ORM\OneToMany(targetEntity="AldeaTurno", mappedBy="aldea", cascade={"persist", "remove"})
     */
    private $aldeaTurno;

    /**
     * Hook on pre-persist operations.
     *
     * @ORM\PrePersist
     */
    public function prePersist()
    {
        $this->aldeaNomb = Utility::upperCase($this->aldeaNomb);
    }

    /**
     * Hook on pre-update operations.
     *
     * @ORM\PreUpdate
     */
    public function preUpdate()
    {
        $this->aldeaNomb = Utility::upperCase($this->aldeaNomb);
    }

    /**
     * Constructor.
     */
    public function __construct()
    {

        $this->aldeaTurno = new ArrayCollection();
    }

    /**
     * Set aldeaCodi.
     *
     * @param string $aldeaCodi
     *
     * @return Parroquia
     */
    public function setAldeaCodi($aldeaCodi)
    {
        $this->aldeaCodi = $aldeaCodi;

        return $this;
    }

    /**
     * Get aldeaCodi
     *
     * @return string 
     */
    public function getAldeaCodi()
    {
        return $this->aldeaCodi;
    }

    /**
     * Set aldeaNomb
     *
     * @param string $aldeaNomb
     * @return Aldea
     */
    public function setAldeaNomb($aldeaNomb)
    {
        $this->aldeaNomb = $aldeaNomb;

        return $this;
    }

    /**
     * Get aldeaNomb
     *
     * @return string 
     */
    public function getAldeaNomb()
    {
        return $this->aldeaNomb;
    }

    /**
     * Set parroq
     *
     * @param \AppBundle\Entity\Parroquia $parroq
     * @return Aldea
     */
    public function setParroq(\AppBundle\Entity\Parroquia $parroq = null)
    {
        $this->parroq = $parroq;

        return $this;
    }

    /**
     * Get parroq
     *
     * @return \AppBundle\Entity\Parroquia 
     */
    public function getParroq()
    {
        return $this->parroq;
    }

    /**
     * Add aldeaTurno
     *
     * @param \AppBundle\Entity\AldeaTurno $aldeaTurno
     * @return Aldea
     */
    public function addAldeaTurno(\AppBundle\Entity\AldeaTurno $aldeaTurno)
    {
        $this->aldeaTurno[] = $aldeaTurno;
        $aldeaTurno->setAldea($this);

        return $this;
    }

    /**
     * Remove aldeaTurno
     *
     * @param \AppBundle\Entity\AldeaTurno $aldeaTurno
     */
    public function removeAldeaTurno(\AppBundle\Entity\AldeaTurno $aldeaTurno)
    {
        $this->aldeaTurno->removeElement($aldeaTurno);
    }

    /**
     * Get aldeaTurno
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getAldeaTurno()
    {
        return $this->aldeaTurno;
    }
}
