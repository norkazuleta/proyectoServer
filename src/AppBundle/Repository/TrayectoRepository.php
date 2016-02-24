<?php

namespace AppBundle\Repository;

class TrayectoRepository extends CustomEntityRepository
{
    public function getNbResults()
    {
        return $this->createQueryBuilder('p')
                    ->select('count(p.trayId)')
                    ->getQuery()
                    ->getSingleScalarResult();
    }
}
