<?php

namespace AppBundle\Controller;

use AppBundle\Entity\EstuPnf;
use AppBundle\Entity\Estudiante;
use AppBundle\Form\EstudianteType;
use FOS\RestBundle\Controller\Annotations\QueryParam;
use FOS\RestBundle\Controller\Annotations\Route;
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
 * Estudiante controller.
 * @RouteResource("Estudiante")
 */
class EstudianteRESTController extends VoryxController
{
    /**
     * Get a Estudiante entity
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @return Response
     *
     */
    public function getAction(Estudiante $entity)
    {
        return $entity;
    }
    /**
     * Get all Estudiante entities.
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
            $entity = $em->getRepository('AppBundle:Estudiante');

            if (!empty($q)) {
                $filters = array(
                    'cedu' => '',
                    'nomb' => '',
                    'apell' => '',
                    'fn' => '',
                    'correo' => '',
                    'tlf' => '',
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
     * Create a Estudiante entity.
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
        $fn = $request->request->get('fn');
        $fn = new \DateTime($fn);

        $entity = new Estudiante();
        $entity->setFn($fn);
        $form = $this->createForm(new EstudianteType(), $entity, array("method" => $request->getMethod()));
        $this->estuPnfEntity($request, $entity);
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
     * Update a Estudiante entity.
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @param Request $request
     * @param $entity
     *
     * @return Response
     */
    public function putAction(Request $request, Estudiante $entity)
    {
        $this->estuPnfEntity($request, $entity);

        try {
            if ($fn = $request->request->get('fn')) {
                $fn = new \DateTime($fn);
                $entity->setFn($fn);
            }
            $em = $this->getDoctrine()->getManager();
            $request->setMethod('PATCH'); //Treat all PUTs as PATCH
            $form = $this->createForm(new EstudianteType(), $entity, array("method" => $request->getMethod()));
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
     * Partial Update to a Estudiante entity.
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @param Request $request
     * @param $entity
     *
     * @return Response
     */
    public function patchAction(Request $request, Estudiante $entity)
    {
        return $this->putAction($request, $entity);
    }

    public function estuPnfEntity(Request $request, Estudiante $entity)
    {
        if (is_array($request->request->get('estuPnf'))) {
            $pnf = $request->request->get('estuPnf');
            $em = $this->getDoctrine()->getManager();
            $entityEstuPnf = $em->getRepository('AppBundle:EstuPnf')->findBy(
                array('estu' => $entity->getCedu())
            );

            $estuPnfIds = array();
            foreach ($entityEstuPnf as $key => $enti) {
                $pnfId = $enti->getPnf()->getPnfId();
                if (in_array($pnfId, $pnf)) {
                    if (($key = array_search($pnfId, $pnf)) !== false) {
                        unset($pnf[$key]);
                        sort($pnf);
                    }
                } else {
                    $estuPnfIds[] = $enti;
                }
            }

            //delete entity
            foreach ($estuPnfIds as $key => $value) {
                $em->remove($value);
            }

            if ($estuPnfIds) {
                $em->flush();
            }

            //add entity
            foreach ($pnf as $key => $value) {
                $entityPnf = $em->getRepository('AppBundle:Pnf')->find($value);
                if ($entityPnf) {
                    $entityEstuPnf = new EstuPnf();
                    $entityEstuPnf->setPnf($entityPnf);
                    $entity->addEstuPnf($entityEstuPnf);
                }
            }
        }
    }
    /**
     * Delete a Estudiante entity.
     *
     * @View(statusCode=204)
     *
     * @param Request $request
     * @param $entity
     *
     * @return Response
     */
    public function deleteAction(Request $request, Estudiante $entity)
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

        /**
     * Get report s.
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @Route("/reports/s", name="reports_s")
     *
     * @QueryParam(name="uriReport", nullable=true, description="")
     * @QueryParam(name="id", nullable=true, description="")
     *
     * @return Response
     */
    public function rptAction(ParamFetcherInterface $paramFetcher)
    {
        $cedu = $paramFetcher->get('id');
        $username = $this->getUser()->getUserName();

        $param = array(
            'action'  => 'record',
            'report'  => 'record',
            'format' => 'pdf',
            'param' => array(
                'cedu' => $cedu
            )
        );

        return array(
            'url' => $this->generateUrl('reports_q', $param),
            'parameters' => $param
        );
    }
}
