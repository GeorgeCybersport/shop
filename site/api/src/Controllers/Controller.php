<?php


namespace MyApp\Controllers;

abstract class Controller
{

    protected function error($errorText){
        $response=[
            'response'=>"error",
            'text'=>$errorText,
        ];
        die(json_encode($response));
    }

    protected function success($data){
        $response=[
            'response'=>"ok",
            'result'=>$data,
        ];
        die(json_encode($response));
    }
}