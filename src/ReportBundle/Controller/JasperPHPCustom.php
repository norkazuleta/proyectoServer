<?php
namespace ReportBundle\Controller;

use JasperPHP\JasperPHP;

class JasperPHPCustom extends JasperPHP
{
    public function noscape()
    {
        if (!$this->windows) {
            $this->the_command = str_replace('\\', '', $this->the_command);
        }

        return $this;
    }
}
