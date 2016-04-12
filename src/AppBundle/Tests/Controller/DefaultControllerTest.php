<?php

namespace AppBundle\Tests\Controller;

use AppBundle\Tests\WebTestCase;

class DefaultControllerTest extends WebTestCase
{
    public function testIndex()
    {
        $client = static::createClient();

        $crawler = $client->request('GET', '/');

        $this->assertEquals(200, $client->getResponse()->getStatusCode());
        $this->assertContains('SISTEMA ADMINISTRATIVO', $crawler->filter('title')->text());
    }
}
