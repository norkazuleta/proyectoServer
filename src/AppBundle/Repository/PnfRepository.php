<?php

namespace AppBundle\Repository;

class PnfRepository extends CustomEntityRepository
{
    public function getNbResults()
    {
        return $this->createQueryBuilder('p')
                    ->select('count(p.pnfId)')
                    ->getQuery()
                    ->getSingleScalarResult();
    }
}
