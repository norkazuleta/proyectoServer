<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Aldea;
use AppBundle\Entity\AldeaTurno;
use AppBundle\Form\AldeaType;
use FOS\RestBundle\Controller\Annotations\QueryParam;
use FOS\RestBundle\Controller\Annotations\RouteResource;
use FOS\RestBundle\Controller\Annotations\View;
use FOS\RestBundle\Request\ParamFetcherInterface;
use FOS\RestBundle\Util\Codes;
use FOS\RestBundle\View\View as FOSView;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Form\Form;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Voryx\RESTGeneratorBundle\Controller\VoryxController;

/**
 * Aldea controller.
 * @RouteResource("Aldea")
 */
class AldeaRESTController extends VoryxController
{
    /**
     * Get a Aldea entity
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @return Response
     *
     */
    public function getAction(Aldea $entity)
    {
        return $entity;
    }
    /**
     * Get all Aldea entities.
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @param ParamFetcherInterface $paramFetcher
     *
     * @return Response
     *
     * @QueryParam(name="q", nullable=true, description="Search text.")
     * @QueryParam(name="offset", requirements="\d+", nullable=true, description="Offset from which to start listing notes.")
     * @QueryParam(name="limit", requirements="\d+", default="20", description="How many notes to return.")
     * @QueryParam(name="order_by", nullable=true, array=true, description="Order by fields. Must be an array ie. &order_by[name]=ASC&order_by[description]=DESC")
     * @QueryParam(name="filters", nullable=true, array=true, description="Filter by fields. Must be an array ie. &filters[id]=3")
     * @QueryParam(name="filters_operator", default="LIKE %...%", description="Option filter operator.")
     */
    public function cgetAction(ParamFetcherInterface $paramFetcher, Request $request)
    {
        try {
            $q = $paramFetcher->get('q');
            $offset = $paramFetcher->get('offset');
            $limit = $paramFetcher->get('limit');
            $order_by = $paramFetcher->get('order_by');
            $filters = !is_null($paramFetcher->get('filters')) ? $paramFetcher->get('filters') : array();
            $filters_operator = $paramFetcher->get('filters_operator');

            $em = $this->getDoctrine()->getManager();
            $entity = $em->getRepository('AppBundle:Aldea');
            if (!empty($q)) {
                $filters = array(
                    'aldeaCodi' => '',
                    'aldeaNomb' => '',
                );

                $adapter = $entity->findByAdapter($filters, $order_by, $q, $filters_operator);
                $nbResults = $adapter->getNbResults();
                $entities = $adapter->getSlice($offset, $limit)->getArrayCopy();
            } else {
                $nbResults = $entity->getNbResults();
                $entities = ($nbResults > 0) ? $entity->findBy($filters, $order_by, $limit, $offset) : array();
            }

            if ($entities) {
                $request->attributes->set('_x_total_count', $nbResults);

                return $entities;
            }

            return FOSView::create('Not Found', Codes::HTTP_NO_CONTENT);
        } catch (\Exception $e) {
            return FOSView::create($e->getMessage(), Codes::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    /**
     * Create a Aldea entity.
     *
     * @View(statusCode=201, serializerEnableMaxDepthChecks=true)
     *
     * @param Request $request
     *
     * @return Response
     *
     */
    public function postAction(Request $request)
    {
        $entity = new Aldea();
        $form = $this->createForm(new AldeaType(), $entity, array("method" => $request->getMethod()));
        $this->aldeaTurnoEntity($request, $entity);
        $this->removeExtraFields($request, $form);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($entity);
            $em->flush();

            return $entity;
        }

        return FOSView::create(array('errors' => $form->getErrors()), Codes::HTTP_INTERNAL_SERVER_ERROR);
    }
    /**
     * Update a Aldea entity.
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @param Request $request
     * @param $entity
     *
     * @return Response
     */
    public function putAction(Request $request, Aldea $entity)
    {
        $this->aldeaTurnoEntity($request, $entity);
        try {
            $em = $this->getDoctrine()->getManager();
            $request->setMethod('PATCH'); //Treat all PUTs as PATCH
            $form = $this->createForm(new AldeaType(), $entity, array("method" => $request->getMethod()));
            $this->removeExtraFields($request, $form);
            $form->handleRequest($request);
            if ($form->isValid()) {
                $em->flush();

                return $entity;
            }

            return FOSView::create(array('errors' => $form->getErrors()), Codes::HTTP_INTERNAL_SERVER_ERROR);
        } catch (\Exception $e) {
            return FOSView::create($e->getMessage(), Codes::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    /**
     * Partial Update to a Aldea entity.
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @param Request $request
     * @param $entity
     *
     * @return Response
     */
    public function patchAction(Request $request, Aldea $entity)
    {
        return $this->putAction($request, $entity);
    }


    public function aldeaTurnoEntity(Request $request, Aldea $entity)
    {
        if (is_array($request->request->get('aldeaTurno'))) {
            $turn = $request->request->get('aldeaTurno');
            $em = $this->getDoctrine()->getManager();
            $entityAldeaTurno = $em->getRepository('AppBundle:AldeaTurno')->findBy(
                array('aldea' => $entity->getAldeaCodi())
            );

            $aldeaTurnoIds = array();
            foreach ($entityAldeaTurno as $key => $enti) {
                $turnId = $enti->getTurno()->getTurnId();
                if (in_array($turnId, $turn)) {
                    if (($key = array_search($turnId, $turn)) !== false) {
                        unset($turn[$key]);
                    }
                } else {
                    $aldeaTurnoIds[] = $enti;
                }
            }

            //delete entity
            foreach ($aldeaTurnoIds as $key => $value) {
                $em->remove($value);
            }

            if ($aldeaTurnoIds) {
                $em->flush();
            }

            //add entity
            foreach ($turn as $key => $value) {
                $entityTurno = $em->getRepository('AppBundle:Turno')->find($value);
                if ($entityTurno) {
                    $entityAldeaTurno = new AldeaTurno();
                    $entityAldeaTurno->setTurno($entityTurno);
                    $entity->addAldeaTurno($entityAldeaTurno);
                }
            }
        }
    }

    /**
     * Delete a Aldea entity.
     *
     * @View(statusCode=204)
     *
     * @param Request $request
     * @param $entity
     *
     * @return Response
     */
    public function deleteAction(Request $request, Aldea $entity)
    {
        try {
            $em = $this->getDoctrine()->getManager();
            $em->remove($entity);
            $em->flush();

            return null;
        } catch (\Exception $e) {
            return FOSView::create($e->getMessage(), Codes::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
