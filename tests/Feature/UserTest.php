<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testExample()
    {
        $response = $this->get('/');

        //$response->assertStatus(200);
        $response->assertStatus(302);  // ステータスコードを変更

        //resustory test
        //login test 
        //forget password test
        
    }
}
