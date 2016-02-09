<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use FOS\RestBundle\Controller\Annotations\QueryParam;
use FOS\RestBundle\Request\ParamFetcherInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class ConsultasREPORTController extends ReportController
{

    /**
     * @Route("/reports/q", name="reports_q")
     *
     * @QueryParam(name="action", nullable=false, description="Method action.")
     * @QueryParam(name="report", nullable=false, description="Report file name.")
     * @QueryParam(name="format", default="html", nullable=false, description="Report file format.")
     */
    public function reportAction(ParamFetcherInterface $paramFetcher, Request $request)
    {
        $action = $paramFetcher->get('action');

        $methodReport = $action . 'Report';

        if (method_exists($this, $methodReport)) {
            return $this->{$methodReport}($paramFetcher, $request);
        } else {
            throw new \Exception("Your report has an error and couldn't be processed! Method " . $methodReport . "() not exists.", 1);
        }
    }

    /**
     * [comercioReport description]
     * @param  ParamFetcherInterface $paramFetcher [description]
     * @param  Request               $request      [description]
     * @return Response
     */
    public function comercioReport(ParamFetcherInterface $paramFetcher, Request $request)
    {
        $report = $paramFetcher->get('report');
        $format = $paramFetcher->get('format');

        $this->initialize();

        $this->setFormat(array($format));

        $this->jasperProccess($report . '.jrxml');

        $file = $this->reportDir . '/' . $this->outputFilename . '.' . $format;

        return $this->outputFile($file, $format);
    }

    /**
     * @Route("/reports/pais/q", name="reports_pais_q")
     */
    public function consultasAction()
    {
        $this->initialize();

        $this->setParameters(array('IS_IGNORE_PAGINATION' => false ));

        $this->jasperProccess('pais.jrxml');

        return $this->redirectOutput();
    }
}
