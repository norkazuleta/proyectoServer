<?php

namespace ReportBundle\Util;

use FOS\RestBundle\Controller\Annotations\QueryParam;
use Symfony\Component\Config\Definition\Exception\Exception;

final class Utility
{
    /**
     * @QueryParam(name="optionDate", nullable=true,  description="Report option date")
     * @QueryParam(name="dataDate", nullable=true, array=true, description="Report by fields. Must be an array. &dataDate[field]=value")
     * @QueryParam(name="initFrom", default="2015-01-01", description="init date from between.")
     * @return array
     */
    public static function dateQuery(ParamFetcherInterface $paramFetcher)
    {
        $optionDate = $paramFetcher->get('optionDate');
        $dataDate = !is_null($paramFetcher->get('dataDate')) ? $paramFetcher->get('dataDate') : array();
        $initFrom = $paramFetcher->get('initFrom');

        $dateFormatCustom = array('day', 'dayBefore', 'week', 'weekBefore', 'month', 'monthBefore', 'all');
        $dateFormatYear = array('January','February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');

        $dateFrom = $dateTo = null;

        if ($optionDate === 'between' && $dataDate['dateFrom'] && $dataDate['dateTo']) {
            $dateFrom = new \DateTime($dataDate['dateFrom']);
            $dateTo = new \DateTime($dataDate['dateTo']);
        } elseif ($optionDate === 'del' && in_array($dataDate['dateFormat'], $dateFormatCustom)) {
            $now = new \DateTime('now');
            switch ($dataDate['dateFormat']) {
                case 'day':
                    $dateFrom = $dateTo = new \DateTime();
                    break;
                case 'dayBefore':
                    $dateFrom = $dateTo = new \DateTime('-1 days');
                    break;
                case 'week':
                    if (date('N') == 7) {
                        $dateFrom = new \DateTime('-7 days Monday this week' . $now->format('Y-m-d'));
                        $dateTo = new \DateTime('-7 days Sunday this week' . $now->format('Y-m-d'));
                    } else {
                        $dateFrom = new \DateTime('Monday this week' . $now->format('Y-m-d'));
                        $dateTo = new \DateTime('Sunday this week' . $now->format('Y-m-d'));
                    }
                    break;
                case 'weekBefore':
                    if (date('N') == 7) {
                        $dateFrom = new \DateTime('-7 days Monday last week' . $now->format('Y-m-d'));
                        $dateTo = new \DateTime('-7 days Sunday last week' . $now->format('Y-m-d'));
                    } else {
                        $dateFrom = new \DateTime('Monday last week' . $now->format('Y-m-d'));
                        $dateTo = new \DateTime('Sunday last week' . $now->format('Y-m-d'));
                    }
                    break;
                case 'month':
                    $dateFrom = new \DateTime('first day of this month' . $now->format('Y-m-d'));
                    $dateTo = new \DateTime('last day of this month' . $now->format('Y-m-d'));
                    break;
                case 'monthBefore':
                    $dateFrom = new \DateTime('first day of last month' . $now->format('Y-m-d'));
                    $dateTo = new \DateTime('last day of last month' . $now->format('Y-m-d'));
                    break;

                case 'all':
                    $dateFrom = new \DateTime($initFrom);
                    $dateTo = $now;
                    break;
            }
        } elseif ($optionDate === 'del' && in_array($dataDate['dateFormat'], $dateFormatYear)) {
            $now = new \DateTime('now');

            $dateFormat = $dataDate['dateFormat'];
            $year = ($dataDate['year'])?: $now->format('Y');

            $dateFrom = new \DateTime('first day of this month ' . $dateFormat . ' ' . $year);
            $dateTo = new \DateTime('last day of this month '  . $dateFormat . ' ' . $year);
        }

        if (!($dateFrom || $dateTo)) {
            throw new Exception("Failed date value null", 1);
            //FOSView::create("failed date value $dateFrom || $dateTo", Codes::HTTP_INTERNAL_SERVER_ERROR);
        }

        return array($dateFrom, $dateTo);
    }
}
