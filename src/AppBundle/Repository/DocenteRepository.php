<?php

namespace AppBundle\Repository;

class DocenteRepository extends CustomEntityRepository
{
    public function getNbResults()
    {
        return $this->createQueryBuilder('p')
                    ->select('count(p.cedu)')
                    ->getQuery()
                    ->getSingleScalarResult();
    }
}
