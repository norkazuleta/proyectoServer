<?php

namespace AppBundle\Controller;

use FOS\RestBundle\Controller\Annotations\QueryParam;
use FOS\RestBundle\Request\ParamFetcherInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class ConsultasREPORTController extends ReportController
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

    public function recordReport(ParamFetcherInterface $paramFetcher, Request $request)
    {
        $report = $paramFetcher->get('report');
        $format = $paramFetcher->get('format');
        $param = $paramFetcher->get('param');

        $this->initialize();

        if (count($param)) {
            $this->setParameters(
                array_merge(
                    array(
                        'URI_WORKSPACE' => "\"" . dirname(realpath($this->jrxmlDir .'/' . $report . '.jrxml')) . "\"" ,
                        'URI_LOGO_LEFT' => "\"" . realpath($this->jrxmlDir .'/logo-left.png') . "\"" ,
                        'URI_LOGO_RIGHT' => "\"" . realpath($this->jrxmlDir .'/logo-right.png') . "\""
                    ),
                    $param
                )
            );
        }

        $this->setFormat(array($format));

        $this->jasperProccess($report . '.jrxml');

        $file = $this->reportDir . '/' . $this->outputFilename . '.' . $format;

        return $this->outputFile($file, $format);
    }
}
