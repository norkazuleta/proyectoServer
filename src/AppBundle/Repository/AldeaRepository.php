<?php

namespace AppBundle\Repository;

class AldeaRepository extends CustomEntityRepository
{
    public function getNbResults()
    {
        return $this->createQueryBuilder('p')
                    ->select('count(p.aldeaCodi)')
                    ->getQuery()
                    ->getSingleScalarResult();
    }
}
