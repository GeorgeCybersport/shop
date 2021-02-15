<?php


namespace MyApp\Controllers;


use MyApp\Auth;
use MyApp\Models\Basket;

class BasketController extends Controller
{
    public function actionIndex(){
        $user=Auth::getUser();
        $userId=$user['id'];
        $result=Basket::show($userId);
        is_array($result) ? $this->success($result) : $this->error($result);

    }
    public function actionAdd(){
        $user=Auth::getUser();
        $userId=$user['id'];
        $itemId=$_POST['itemId'];
        $result=Basket::add($userId, $itemId);
        is_array($result) ? $this->success($result) : $this->error($result);
    }
    public function actionRemove(){
        $user=Auth::getUser();
        $userId=$user['id'];
        $itemId=$_POST['itemId'];
        $result=Basket::remove($userId, $itemId);
        is_array($result) ? $this->success($result) : $this->error($result);
    }
    public function actionClear(){
        $user=Auth::getUser();
        $userId=$user['id'];
        $result=Basket::clear($userId);
        $result==="success" ? $this->success($result) : $this->error($result);
    }
    public function actionOrder(){
        $user=Auth::getUser();
        $userId=$user['id'];
        $result=Basket::order($userId);
        $result==="success" ? $this->success($result) : $this->error($result);
    }
}