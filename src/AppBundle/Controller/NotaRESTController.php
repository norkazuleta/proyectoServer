<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Nota;
use AppBundle\Form\NotaType;

use FOS\RestBundle\Controller\Annotations\QueryParam;
use FOS\RestBundle\Controller\Annotations\RouteResource;
use FOS\RestBundle\Controller\Annotations\View;
use FOS\RestBundle\Request\ParamFetcherInterface;
use FOS\RestBundle\Util\Codes;
use FOS\RestBundle\View\View as FOSView;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Form\Form;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

use Voryx\RESTGeneratorBundle\Controller\VoryxController;

/**
 * Nota controller.
 * @RouteResource("Nota")
 */
class NotaRESTController extends VoryxController
{
    /**
     * Get a Nota entity
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @return Response
     *
     */
    public function getAction(Nota $entity)
    {
        return $entity;
    }
    /**
     * Get all Nota entities.
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
    public function cgetAction(ParamFetcherInterface $paramFetcher)
    {
        try {
            $q = $paramFetcher->get('q');
            $offset = $paramFetcher->get('offset');
            $limit = $paramFetcher->get('limit');
            $order_by = $paramFetcher->get('order_by');
            $filters = !is_null($paramFetcher->get('filters')) ? $paramFetcher->get('filters') : array();
            $filters_operator = $paramFetcher->get('filters_operator');

            $em = $this->getDoctrine()->getManager();
            $entity = $em->getRepository('AppBundle:Nota');

            if (!empty($q)) {
                $filters = array();

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
     * Create a Nota entity.
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
        $entity = new Nota();
        $form = $this->createForm(new NotaType(), $entity, array("method" => $request->getMethod()));
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
     * Create || Update a SeccionEstu entity.
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @param Request $request
     *
     * @return Response
     *
     */
    public function postAsigAction(Request $request)
    {
        $secc = $request->request->get('secc');
        $notas = $request->request->get('notas');

        $em = $this->getDoctrine()->getManager();
        $entityNota = $em->getRepository('AppBundle:Nota')->findBy(array('secc' => $secc));

        $notaIds = array();
        $notaIdsUpdate = array();
        foreach ($entityNota as $key => $enti) {
            $ceduEstu = $enti->getCedu()->getCedu();
            $notaEstu = $enti->getNota();
            $asistEstu = $enti->getAsist();
            if (($keyx = array_search($ceduEstu, array_column($notas, 'cedu'))) !== false) {
                if ($notas[$keyx]['nota'] == $notaEstu && $notas[$keyx]['asist'] == $asistEstu) {
                    unset($notas[$keyx]);
                    sort($notas);
                } else {
                    $enti->setNota($notas[$keyx]['nota']);
                    $enti->setAsist($notas[$keyx]['asist']);
                    $notaIdsUpdate[] = $enti;
                    unset($notas[$keyx]);
                    sort($notas);
                }
            } else {
                $notaIds[] = $enti;
            }
        }

        //delete entity
        foreach ($notaIds as $key => $value) {
            $em->remove($value);
        }

        if ($notaIds) {
            $em->flush();
        }

        foreach ($notaIdsUpdate as $key => $value) {
            $em->persist($value);
        }

        if ($notaIdsUpdate) {
            $em->flush();
        }

        //add entity
        $eNota = array();
        foreach ($notas as $key => $value) {
            $entityPersona = $em->getRepository('AppBundle:Persona')->find($value['cedu']);
            if ($entityPersona) {
                $entitySeccion = $em->getRepository('AppBundle:Seccion')->find($secc);
                $entityNota = new Nota();
                $entityNota->setSecc($entitySeccion);
                $entityNota->setCedu($entityPersona);
                $entityNota->setNota($value['nota']);
                $entityNota->setAsist($value['asist']);

                $em->persist($entityNota);
                array_push($eNota, $entityNota);
            }
        }

        if (count($notas)) {
            $em->flush();
        }

        return $eNota;
    }

    /**
     * Update a Nota entity.
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @param Request $request
     * @param $entity
     *
     * @return Response
     */
    public function putAction(Request $request, Nota $entity)
    {
        try {
            $em = $this->getDoctrine()->getManager();
            $request->setMethod('PATCH'); //Treat all PUTs as PATCH
            $form = $this->createForm(new NotaType(), $entity, array("method" => $request->getMethod()));
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
     * Partial Update to a Nota entity.
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @param Request $request
     * @param $entity
     *
     * @return Response
     */
    public function patchAction(Request $request, Nota $entity)
    {
        return $this->putAction($request, $entity);
    }
    /**
     * Delete a Nota entity.
     *
     * @View(statusCode=204)
     *
     * @param Request $request
     * @param $entity
     *
     * @return Response
     */
    public function deleteAction(Request $request, Nota $entity)
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
