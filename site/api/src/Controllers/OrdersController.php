<?php


namespace MyApp\Controllers;


use MyApp\Auth;
use MyApp\Models\Orders;

class OrdersController extends Controller
{
    public function actionIndex(){
        $user=Auth::getUser();
        $userId=$user['id'];
        //$userId=$_POST['userId'];
        $result=Orders::buy($userId);
        $result==="success" ? $this->success($result) : $this->error($result);
    }

    public function actionShow(){
        $user=Auth::getUser();
        $userId=$user['id'];
        $role=$user['roleName'];
        if($role==='admin' || $role==='root'){
            $result=Orders::showOrders();
        } else $result=Orders::showUserOrders($userId);
        if ($result!=="error"){
            $this->success($result);
        } else $this->error($result);
    }
}