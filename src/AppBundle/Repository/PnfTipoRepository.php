<?php

namespace AppBundle\Repository;

class PnfTipoRepository extends CustomEntityRepository
{
    public function getNbResults()
    {
        return $this->createQueryBuilder('p')
                    ->select('count(p.tipoId)')
                    ->getQuery()
                    ->getSingleScalarResult();
    }
}
