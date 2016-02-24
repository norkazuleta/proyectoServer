<?php

namespace AppBundle\Repository;

class PeriodoRepository extends CustomEntityRepository
{
    public function getNbResults()
    {
        return $this->createQueryBuilder('p')
                    ->select('count(p.periId)')
                    ->getQuery()
                    ->getSingleScalarResult();
    }
}
