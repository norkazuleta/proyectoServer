<?php

namespace ReportBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;

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
    public $outputFilename = '_';

    /**
     * jrxml Project Store Directory
     * @var string
     */
    public $jrxmlDir;

    /**
     * Parameters
     * @var array
     */
    public $parameters = array('IS_IGNORE_PAGINATION' => 'false');

    /**
     * Parameters Default
     * @var array
     */
    public $parameters_default = array('IS_IGNORE_PAGINATION');

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
        $this->jasper = new JasperPHPCustom;

        $this->paramDatabase();

        $rootDir = $this->getParameter('kernel.root_dir');

        $this->reportDir =  $rootDir . '/../web/reports';

        if (!isset($this->dbParameters['RPT_PATH_DIR'])) {
            throw new \Exception("Your report has an error! Not defined RPT_PATH_DIR in database.", 1);
        } else {
            $path = realpath($this->dbParameters['RPT_PATH_DIR']);
            if ($path !== false && is_dir($path)) {
                $this->jrxmlDir =  $path;
            } else {
                $path = realpath($rootDir . $this->dbParameters['RPT_PATH_DIR']);
                if ($path !== false && is_dir($path)) {
                    $this->jrxmlDir =  $path;
                } else {
                    throw new \Exception("Your report has an error! Not defined path dir report.", 1);
                }
            }
        }

        $this->outputFilename = time() . '_';

        $this->dbConnection = array(
            'driver' => str_replace('pdo_', '', $this->container->getParameter('database_driver')),
            'host' => $this->container->getParameter('database_host'),
            'database' => $this->container->getParameter('database_name'),
            'username' => $this->container->getParameter('database_user'),
            'password' => $this->container->getParameter('database_password'),
            'port' => $this->container->getParameter('database_port') | '3306',
        );
    }

    /**
     * jasperProccess outfile process
     * @param  string $inputFile
     * @return application/*
     */
    public function jasperProccess($inputFile)
    {
        $this->parseParameters($this->jrxmlDir . '/' . $inputFile);

        return $this->jasper->process(
            $this->jrxmlDir . '/' . $inputFile,
            $this->reportDir . '/' . $this->outputFilename,
            $this->formats,
            $this->parameters,
            $this->dbConnection,
            false,
            false
        )->noscape()->execute();
    }

    /**
     * outputBinaryFile response
     * @param  string   $file                file path absolute
     * @param  boolean  $deleteFileAfterSend
     * @return BinaryFileResponse
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

    /**
     * outputFile
     * @param  string $file
     * @param  string $format
     * @return Response|BinaryFileResponse
     */
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
     * @return void
     */
    public function setParameters($params = array())
    {
        foreach ($params as $key => $value) {
            $this->parameters[$key] = $value;
        }
    }

    /**
     * Parse paramentes
     * @param  string $file pathfilename
     * @return void
     */
    public function parseParameters($file)
    {
         $parameters = $this->parameters;

        $out = $this->jasper->list_parameters($file)->execute();

        $param = array();
        foreach ($out as $value) {
            $item = explode(' ', $value);
            (count($item) > 0) ? array_push($param, $item[1]) : false;
        }

        foreach ($parameters as $key => $value) {
            if (in_array($key, $param) || in_array($key, $this->parameters_default)) {
                continue;
            } else {
                unset($parameters[$key]);
            }
        }

        $this->parameters = $parameters;
    }

    /**
     * Add formats
     * @param array $formats
     * @return void
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

    /**
     * Parameters get database entity ajuste
     * @return void
     */
    public function paramDatabase()
    {
        $em = $this->getDoctrine()->getManager();
        $this->dbParameters = $em->getRepository('AppBundle:Ajuste')->getAjustes();
    }

    /**
     * Parameters get database dbParameters
     * @return array
     */
    public function getParamDatabase()
    {
        $param = array();
        foreach ($this->dbParameters as $key => $value) {
            $param[$key] = "\"" . $value . "\"";
        }

        return $param;
    }
}
