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
}
