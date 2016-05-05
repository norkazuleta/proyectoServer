<?php

namespace AppBundle\Repository;

class PersonaRepository extends CustomEntityRepository
{
    public function getNbResults()
    {
        return $this->createQueryBuilder('p')
                    ->select('count(p.cedu)')
                    ->getQuery()
                    ->getSingleScalarResult();
    }

    public function getPersonaPnf($data = array())
    {
        $sql = "SELECT *
        FROM estudiante estu
        WHERE ";

        if (in_array('cedu', array_keys($data))) {
            $sql .= 'estu.persona_cedu= :cedu ';
        }

        $stmt = $this->getEntityManager()
                    ->getConnection()
                    ->prepare($sql);

        if (in_array('cedu', array_keys($data))) {
            $stmt->bindValue('cedu', $data['cedu']);
        }

        $stmt->execute();
        $result = $stmt->fetchAll();

        if (count($result) > 0) {
            $pnf = array();
            foreach ($result as $key => $value) {
                array_push($pnf, $value['pnf_id']);
            }

            $sql = "SELECT * FROM pnf WHERE pnf_id NOT IN (" . join(',', $pnf) . ")";
        } else {
            $sql = "SELECT * FROM pnf";
        }
        $stmt = $this->getEntityManager()
                    ->getConnection()
                    ->prepare($sql);

        $stmt->execute();

        return $stmt->fetchAll();
    }

    public function getPersonaEstu()
    {
        $sql = "SELECT * FROM docente GROUP BY persona_cedu";
        $stmt = $this->getEntityManager()
                    ->getConnection()
                    ->prepare($sql);

        $stmt->execute();
        $result1 = $stmt->fetchAll();

        $sql = "SELECT * FROM aldea_coord GROUP BY persona_cedu";
            $stmt = $this->getEntityManager()
                        ->getConnection()
                        ->prepare($sql);

        $stmt->execute();
        $result2 = $stmt->fetchAll();

        $sql = "SELECT cedu, CONCAT(cedu, ' (', nomb, ' ', apell, ')') AS cedu_nomb_apell FROM persona";

        if (count($result1) > 0 || count($result2) > 0) {
            $persona = array();
            foreach ($result1 as $key => $value) {
                array_push($persona, $value['persona_cedu']);
            }

            foreach ($result2 as $key => $value) {
                array_push($persona, $value['persona_cedu']);
            }

            $sql .= " WHERE cedu NOT IN ('" . join("','", $persona) . "')";
        }

        $stmt = $this->getEntityManager()
                    ->getConnection()
                    ->prepare($sql);

        $stmt->execute();

        return $stmt->fetchAll();
    }

    public function getPersonaDoce()
    {
        $sql = "SELECT * FROM estudiante GROUP BY persona_cedu";
        $stmt = $this->getEntityManager()
                    ->getConnection()
                    ->prepare($sql);

        $stmt->execute();
        $result1 = $stmt->fetchAll();

        $sql = "SELECT * FROM aldea_coord GROUP BY persona_cedu";
            $stmt = $this->getEntityManager()
                        ->getConnection()
                        ->prepare($sql);

        $stmt->execute();
        $result2 = $stmt->fetchAll();

        $sql = "SELECT * FROM docente GROUP BY persona_cedu";
            $stmt = $this->getEntityManager()
                        ->getConnection()
                        ->prepare($sql);

        $stmt->execute();
        $result3 = $stmt->fetchAll();

        $sql = "SELECT cedu, CONCAT(cedu, ' (', nomb, ' ', apell, ')') AS cedu_nomb_apell FROM persona";

        if (count($result1) > 0 || count($result2) > 0 || count($result3) > 0) {
            $persona = array();
            foreach ($result1 as $key => $value) {
                array_push($persona, $value['persona_cedu']);
            }

            foreach ($result2 as $key => $value) {
                array_push($persona, $value['persona_cedu']);
            }

            foreach ($result3 as $key => $value) {
                array_push($persona, $value['persona_cedu']);
            }

            $sql .= " WHERE cedu NOT IN ('" . join("','", $persona) . "')";
        }

        $stmt = $this->getEntityManager()
                    ->getConnection()
                    ->prepare($sql);

        $stmt->execute();

        return $stmt->fetchAll();
    }

    public function getPersonaCoord()
    {
        $sql = "SELECT * FROM estudiante GROUP BY persona_cedu";
        $stmt = $this->getEntityManager()
                    ->getConnection()
                    ->prepare($sql);

        $stmt->execute();
        $result1 = $stmt->fetchAll();


        $sql = "SELECT * FROM docente GROUP BY persona_cedu";
            $stmt = $this->getEntityManager()
                        ->getConnection()
                        ->prepare($sql);

        $stmt->execute();
        $result3 = $stmt->fetchAll();

        $sql = "SELECT cedu, CONCAT(cedu, ' (', nomb, ' ', apell, ')') AS cedu_nomb_apell FROM persona";

        if (count($result1) > 0 || count($result3) > 0) {
            $persona = array();
            foreach ($result1 as $key => $value) {
                array_push($persona, $value['persona_cedu']);
            }

            foreach ($result3 as $key => $value) {
                array_push($persona, $value['persona_cedu']);
            }

            $sql .= " WHERE cedu NOT IN ('" . join("','", $persona) . "')";
        }

        $stmt = $this->getEntityManager()
                    ->getConnection()
                    ->prepare($sql);

        $stmt->execute();

        return $stmt->fetchAll();
    }
}
