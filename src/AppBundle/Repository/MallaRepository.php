<?php

namespace AppBundle\Repository;

class MallaRepository extends CustomEntityRepository
{
    public function getNbResults()
    {
        return $this->createQueryBuilder('p')
                    ->select('count(p.mallaId)')
                    ->getQuery()
                    ->getSingleScalarResult();
    }
}
