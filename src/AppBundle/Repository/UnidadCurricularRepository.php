<?php

namespace AppBundle\Repository;

class UnidadCurricularRepository extends CustomEntityRepository
{
    public function getNbResults()
    {
        return $this->createQueryBuilder('p')
                    ->select('count(p.ucId)')
                    ->getQuery()
                    ->getSingleScalarResult();
    }
}
