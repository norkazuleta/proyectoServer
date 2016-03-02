<?php

namespace AppBundle\Repository;

class PeriodoAcademicoRepository extends CustomEntityRepository
{
    public function getNbResults()
    {
        return $this->createQueryBuilder('p')
                    ->select('count(p.paId)')
                    ->getQuery()
                    ->getSingleScalarResult();
    }
}
