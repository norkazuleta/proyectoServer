<?php

namespace AppBundle\Controller;

use AppBundle\Entity\PnfTrayectoPeriodo;
use AppBundle\Entity\PnfTrayectoPeriodoUc;
use AppBundle\Form\PnfTrayectoPeriodoType;
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
 * PnfTrayectoPeriodo controller.
 * @RouteResource("PnfTrayectoPeriodo")
 */
class PnfTrayectoPeriodoRESTController extends VoryxController
{
    /**
     * Get a PnfTrayectoPeriodo entity
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @return Response
     *
     */
    public function getAction(PnfTrayectoPeriodo $entity)
    {
        return $entity;
    }
    /**
     * Get all PnfTrayectoPeriodo entities.
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
            $entity = $em->getRepository('AppBundle:PnfTrayectoPeriodo');
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
     * Create a PnfTrayectoPeriodo entity.
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
        $entity = new PnfTrayectoPeriodo();
        $form = $this->createForm(new PnfTrayectoPeriodoType(), $entity, array("method" => $request->getMethod()));
        $this->ucEntity($request, $entity);
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
     * Update a PnfTrayectoPeriodo entity.
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @param Request $request
     * @param $entity
     *
     * @return Response
     */
    public function putAction(Request $request, PnfTrayectoPeriodo $entity)
    {
        $this->ucEntity($request, $entity);
        try {
            $em = $this->getDoctrine()->getManager();
            $request->setMethod('PATCH'); //Treat all PUTs as PATCH
            $form = $this->createForm(new PnfTrayectoPeriodoType(), $entity, array("method" => $request->getMethod()));
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
     * Partial Update to a PnfTrayectoPeriodo entity.
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @param Request $request
     * @param $entity
     *
     * @return Response
     */
    public function patchAction(Request $request, PnfTrayectoPeriodo $entity)
    {
        return $this->putAction($request, $entity);
    }

    public function ucEntity(Request $request, PnfTrayectoPeriodo $entity)
    {
        if (is_array($request->request->get('uc'))) {
            $uc = $request->request->get('uc');
            $em = $this->getDoctrine()->getManager();
            $entityPnfTrayectoPeriodoUc = $em->getRepository('AppBundle:PnfTrayectoPeriodoUc')->findBy(
                array('pnfTrayPeri' => $entity->getId())
            );

            $pnfTrayectoPeriodoIds = array();
            foreach ($entityPnfTrayectoPeriodoUc as $key => $enti) {
                $ucId = $enti->getUc()->getUcId();
                if (in_array($ucId, $uc)) {
                    if (($key = array_search($ucId, $uc)) !== false) {
                        unset($uc[$key]);
                    }
                } else {
                    $pnfTrayectoPeriodoIds[] = $enti;
                }
            }

            //delete entity
            foreach ($pnfTrayectoPeriodoIds as $key => $value) {
                $em->remove($value);
            }

            if ($pnfTrayectoPeriodoIds) {
                $em->flush();
            }

            //add entity
            foreach ($uc as $key => $value) {
                $entityUnidadCurricular = $em->getRepository('AppBundle:UnidadCurricular')->find($value);
                if ($entityUnidadCurricular) {
                    $entityPnfTrayectoPeriodoUc = new PnfTrayectoPeriodoUc();
                    $entityPnfTrayectoPeriodoUc->setUc($entityUnidadCurricular);
                    $entity->addUc($entityPnfTrayectoPeriodoUc);
                }
            }
        }
    }

    /**
     * Delete a PnfTrayectoPeriodo entity.
     *
     * @View(statusCode=204)
     *
     * @param Request $request
     * @param $entity
     *
     * @return Response
     */
    public function deleteAction(Request $request, PnfTrayectoPeriodo $entity)
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
