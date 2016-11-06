Installation
------------

Add this bundle to your `composer.json` file:

    {
        "require": {
            "jms/serializer-bundle": "1.0.0",
            "friendsofsymfony/rest-bundle": "1.4.*@dev",
            "voryx/restgeneratorbundle": "dev-master",
            "cossou/jasperphp": "dev-master"
        }
    }

Register the bundle in `app/AppKernel.php`:

    // app/AppKernel.php
    public function registerBundles()
    {
        return array(
            // ...
            new ReportBundle\ReportBundle(),
        );
    }

Import the routing definition in `routing.yml`:

    # app/config/routing.yml
    ReportBundle:
        resource: "@ReportBundle/Resources/config/routing.yml"

Usage
------------

Add code the bundle in `src/AppBundle/ReportRESTController.php`:



Add codehe bundle in `src/AppBundle/ReportRESTController.php`
    namespace AppBundle\Controller;

    use FOS\RestBundle\Controller\Annotations\QueryParam;
    use FOS\RestBundle\Controller\Annotations\Route;
    use FOS\RestBundle\Controller\Annotations\RouteResource;
    use FOS\RestBundle\Controller\Annotations\View;
    use FOS\RestBundle\Request\ParamFetcherInterface;
    use Voryx\RESTGeneratorBundle\Controller\VoryxController;
    use ReportBundle\Controller\ReportRESTController as ReportREST;

    /**
     * Report controller.
     */

    class ReportRESTController extends ReportREST
    {
        // You code ... method custom
    }


Import the routing definition in `routing.yml`:

    app_report_api:
    resource: "@AppBundle/Controller/ReportRESTController.php"
    type:   rest
    prefix:   /api


Add code the bundle in `src/AppBundle/Entity/Ajuste.php`:

    namespace AppBundle\Entity;

    use Doctrine\ORM\Mapping as ORM;

    /**
     * Ajuste
     *
     * @ORM\Table(name="ajuste", options={"collate"="utf8_general_ci", "charset"="utf8"})
     * @ORM\Entity
     */
    class Ajuste
    {
        /**
         * @var string
         *
         * @ORM\Column(name="id", type="integer", nullable=false)
         * @ORM\Id
         * @ORM\GeneratedValue(strategy="IDENTITY")
         */
        private $id;

        /**
         * @var string
         *
         * @ORM\Column(name="clave", type="string", length=100, nullable=false)
         */
        private $key;

        /**
         * @var string
         *
         * @ORM\Column(name="valor", type="string", length=255, nullable=false)
         */
        private $value;
    }


Execute query sql database in phpmyadmin:

    CREATE TABLE IF NOT EXISTS `ajuste` (
      `id` int(11) NOT NULL AUTO_INCREMENT,
      `clave` varchar(100) NOT NULL,
      `valor` varchar(255) NOT NULL,
      PRIMARY KEY (`id`)
    ) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=0 ;


    INSERT INTO `ajuste` (`id`, `clave`, `valor`) VALUES
    (null, 'RPT_PAGE_TITLE', 'TITLE FOR REPORT'),
    (null, 'RPT_PAGE_UBICATION', 'UBICATION REGION || CITY || OTHER'),
    (null, 'RPT_URI_LOGO_LEFT', 'logo-left.png'),
    (null, 'RPT_URI_LOGO_RIGHT', 'logo-right.png'),
    (null, 'RPT_PATH_DIR', '/../../path_workspace');


Import the config definition in `config.yml`:

    parameters:
        database_driver:   pdo_mysql

    doctrine:
        dbal:
            driver:   "%database_driver%"
