<?php

return $config=[
    'db' => [
        'dsn' => 'mysql:host=localhost;dbname=cartsql',
        'user' => 'root',
        'pwd' => 'root',
    ],
    'templates' => __DIR__ . '/../templates',
    'routing' => [
        'login' => 'account/login',
        'logout' => 'account/logout',
        'catalog'=>'index/catalog',
        'authorized'=>'account/authorized',
        "registration"=>"account/registration",
        '(\w+)\/(\w+)' => '<controller>/<action>',
        '(\w+)' => '<controller>/index',
        '^$' => 'index/index',
        '(.*)' => 'index/error',
    ],
];