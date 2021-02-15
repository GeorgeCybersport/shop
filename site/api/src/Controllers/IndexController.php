<?php


namespace MyApp\Controllers;


use MyApp\Models\Catalog;

class IndexController extends Controller
{
    public function actionCatalog(){
        if($result=Catalog::show()){
            $this->success($result);
        } else $this->error("Не удалось получить данные");
    }

    public function actionError()
    {
        $this->error("url not founded");
    }
}