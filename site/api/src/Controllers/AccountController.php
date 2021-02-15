<?php


namespace MyApp\Controllers;


use MyApp\Auth;
use MyApp\Models\Account;

class AccountController extends Controller
{
    public function actionRegistration(){
        {
            if (strlen($_POST['name']) > 0 && strlen($_POST['login']) > 0 && strlen($_POST['password']) > 0) {
                if ($_POST['password'] === $_POST['repeat']) {
                    $result = Account::register($_POST['name'], $_POST['login'], password_hash($_POST['password'], PASSWORD_DEFAULT));
                    if ($result==="success")
                        $this->success("Регистрация прошла успешно");
                    if ($result!=="success") $this->error($result);
                } else $this->error("пароли не совпадают");
            } else $this->error("Введите все данные");
        }
    }
    public function actionAuthorized(){
        if($user=Auth::getUser())
            $this->success($user['userName']);
        else $this->error("Не авторизован");
    }
    public function actionLogin(){
        if(strlen($_POST['login']) > 0 && strlen($_POST['password']) > 0){
            $result=Account::login($_POST['login'], $_POST['password']);
            if(is_array($result)) {
                Auth::login($result);
                $this->success($result);
            } else $this->error($result);
        } else $this->error("Введите все данные");
    }
    public function actionLogout(){
        Auth::logout();
        $this->success('successfully exit');
    }
}