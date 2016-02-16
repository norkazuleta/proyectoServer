<?php

namespace AppBundle\Repository;

class EstudianteRepository extends CustomEntityRepository
{
    public function getNbResults()
    {
        return $this->createQueryBuilder('p')
                    ->select('count(p.cedu)')
                    ->getQuery()
                    ->getSingleScalarResult();
    }
}
