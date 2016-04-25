<?php

namespace AppBundle\Repository;

class SeccionRepository extends CustomEntityRepository
{
    public function getNbResults()
    {
        return $this->createQueryBuilder('p')
                    ->select('count(p.seccId)')
                    ->getQuery()
                    ->getSingleScalarResult();
    }

    public function getSeccionLastId()
    {
        return $this->createQueryBuilder('p')
                    ->select('MAX(p.seccId)')
                    ->getQuery()
                    ->getSingleScalarResult();
    }
}
