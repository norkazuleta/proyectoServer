<?php

namespace AppBundle\Tests\Controller;

use AppBundle\Tests\WebTestCase;

class AldeaRESTControllerTest extends WebTestCase
{
    /**
     * @param array $user
     * @dataProvider getUsers
     */
    public function testGetAldeas($user)
    {
        $client = $this->createAuthenticatedClient($username = 'admin', $password = '123456');

        $client->request('GET', $this->getUrl('get_aldeas'));

        $response = $client->getResponse();
        $this->assertJsonResponse($response, 200);

        $content = json_decode($response->getContent(), true);
        $this->assertInternalType('array', $content);
        $this->assertCount(1, $content);

        $row = $content[0];
        $this->assertArrayHasKey('aldea_codi', $row);
        $this->assertArrayHasKey('aldea_nomb', $row);

    }

    /**
     * @return array
     */
    public function getUsers()
    {
        return array(
            //array('username' => 'admin', 'password' => '123456'),
            array('admin', '123456'),

        );
    }
}
