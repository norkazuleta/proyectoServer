<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use JasperPHP\JasperPHP;

class ReportController extends Controller
{
    /**
     * JasperReport Library
     * @var null
     */
    public $jasper;

    /**
     * Store Report Directory
     * @var string
     */
    public $reportDir;

    /**
     * Filename output
     * @var string
     */
    public $outputFilename = '_sicap';

    /**
     * jrxml Project Store Directory
     * @var string
     */
    public $jrxmlDir;

    /**
     * Parameters
     * @var array
     */
    public $parameters = array('IS_IGNORE_PAGINATION' => true);

    /**
     * Format print
     * @var array
     */
    public $formats = array('html', 'pdf');


    /**
     * Format View
     * @var array
     */
    public $formatViews = array('html', 'pdf');

    /**
     * Initialize vars
     * @return void
     */
    public function initialize()
    {
        $this->jasper = new JasperPHP;

        $rootDir = $this->getParameter('kernel.root_dir');

        $this->reportDir =  $rootDir . '/../web/reports';
        $this->jrxmlDir =  $rootDir . '/../../sicapReport';

        $this->outputFilename = time() . '_sicap';

        $this->dbConnection = array(
            'driver' => str_replace('pdo_', '', $this->container->getParameter('database_driver')),
            'host' => $this->container->getParameter('database_host'),
            'database' => $this->container->getParameter('database_name'),
            'username' => $this->container->getParameter('database_user'),
            'password' => $this->container->getParameter('database_password'),
            'port' => $this->container->getParameter('database_port') | '3306',
        );
    }


    public function jasperProccess($inputFile)
    {
        return $this->jasper->process(
            $this->jrxmlDir . '/' . $inputFile,
            $this->reportDir . '/' . $this->outputFilename,
            $this->formats,
            $this->parameters,
            $this->dbConnection,
            false,
            false
        )->execute();
    }

    /**
     * outputBinaryFile response
     * @param  string  $file                file path absolute
     * @param  boolean $deleteFileAfterSend
     * @return Response
     */
    public function outputBinaryFile($file = null, $deleteFileAfterSend = false)
    {
        $response = new BinaryFileResponse($file);
        $response->setContentDisposition(ResponseHeaderBag::DISPOSITION_ATTACHMENT);

        if ($deleteFileAfterSend) {
            $response->deleteFileAfterSend(true);
        }

        return $response;
    }

    public function outputFile($file = null, $format = null)
    {
        if (in_array($format, $this->formatViews)) {
            $content = file_get_contents($file);
            $bf = new BinaryFileResponse($file);
            return  new Response($content, 200, array('Content-Type' => $bf->getFile()->getMimeType()));
        } else {
            return $this->outputBinaryFile($file);
        }
    }

    /**
     * Add parameters
     * @param array $params
     */
    public function setParameters($params = array())
    {
        foreach ($params as $key => $value) {
            $this->parameters[$key] = $value;
        }
    }

    /**
     * Add formats
     * @param array $formats
     */
    public function setFormat($formats = array())
    {
        foreach ($formats as $key => $value) {
            $this->formats[$key] = $value;
        }
    }

    public function redirectOutput($ext = 'html')
    {
        $url = $this->getRequest()->getUriForPath('/reports/'. $this->outputFilename. '.' . $ext);

        return $this->redirect($url);
    }
}
