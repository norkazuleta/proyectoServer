<?php

namespace ReportBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use FOS\RestBundle\Controller\Annotations\QueryParam;
use FOS\RestBundle\Request\ParamFetcherInterface;
use Symfony\Component\HttpFoundation\Request;

class QueryREPORTController extends ReportController
{
    /**
     * @Route("/reports/q", name="reports_q")
     *
     * @QueryParam(name="action", nullable=false, description="Method action.")
     * @QueryParam(name="report", nullable=false, description="Report file name.")
     * @QueryParam(name="format", default="html", nullable=false, description="Report file format.")
     * @QueryParam(name="param", nullable=true, array=true, description="Report by fields. Must be an array. &param[field]=value")
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
     * Report Gral Options
     * @param  ParamFetcherInterface $paramFetcher
     * @param  Request               $request
     * @return application/*
     */
    public function rptReport(ParamFetcherInterface $paramFetcher, Request $request)
    {
        $report = $paramFetcher->get('report');
        $format = $paramFetcher->get('format');
        $param = $paramFetcher->get('param');

        $this->initialize();

        $param = array_merge($param, $this->getParamDatabase());

        if (count($param)) {
            $this->setParameters(
                array_merge(
                    array(
                        'RPT_URI_WORKSPACE' =>  dirname(realpath($this->jrxmlDir .'/' . $report . '.jasper')),
                        'RPT_DIRECTORY_SEPARATOR' => DIRECTORY_SEPARATOR
                    ),
                    $param
                )
            );
        }

        $this->setFormat(array($format));

        $this->jasperProccess($report . '.jasper');

        $file = $this->reportDir . '/' . $this->outputFilename . '.' . $format;

        return $this->outputFile($file, $format);
    }
}
