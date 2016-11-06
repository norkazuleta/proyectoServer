<?php

namespace ReportBundle\Controller;

use FOS\RestBundle\Controller\Annotations\QueryParam;
use FOS\RestBundle\Controller\Annotations\Route;
use FOS\RestBundle\Controller\Annotations\RouteResource;
use FOS\RestBundle\Controller\Annotations\View;
use FOS\RestBundle\Request\ParamFetcherInterface;
use Voryx\RESTGeneratorBundle\Controller\VoryxController;

/**
 * Report controller.
 * @RouteResource("Reports")
 */

class ReportRESTController extends VoryxController
{
    /**
     * Get reports
     *
     * @View(serializerEnableMaxDepthChecks=true)
     *
     * @Route("/reports")
     *
     * @QueryParam(name="action", nullable=false, description="Method recipient backend.")
     * @QueryParam(name="report", nullable=false, description="Source name report jasper.")
     * @QueryParam(name="format", nullable=true, default="pdf", description="Format out report.")
     * @QueryParam(name="param", nullable=true, array=true, description="Parameter of report.")
     *
     * @return Response
     */
    public function rptAction(ParamFetcherInterface $paramFetcher)
    {
        $action = $paramFetcher->get('action');
        $report = $paramFetcher->get('report');
        $format = $paramFetcher->get('format');
        $param = !is_null($paramFetcher->get('param')) ? $paramFetcher->get('param') : array();

        if (isset($param['username'])) {
            $param['username'] = $this->getUser()->getUserName();
        }

        $param = array(
            'action'  => $action,
            'report'  => $report,
            'format' => $format,
            'param' => $param
        );

        return array(
            'url' => $this->generateUrl('reports_q', $param),
            'parameters' => $param
        );
    }
}
