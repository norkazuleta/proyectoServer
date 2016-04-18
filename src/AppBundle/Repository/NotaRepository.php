<?php

namespace AppBundle\Repository;

class NotaRepository extends CustomEntityRepository
{
    public function getNbResults()
    {
        return $this->createQueryBuilder('p')
                    ->select('count(p.notaId)')
                    ->getQuery()
                    ->getSingleScalarResult();
    }
}
