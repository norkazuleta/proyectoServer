<?php

namespace AppBundle\Repository;

class TurnoRepository extends CustomEntityRepository
{
    public function getNbResults()
    {
        return $this->createQueryBuilder('p')
                    ->select('count(p.turnId)')
                    ->getQuery()
                    ->getSingleScalarResult();
    }
}
