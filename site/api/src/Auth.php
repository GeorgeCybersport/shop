<?php


namespace MyApp;


class Auth
{
    public static function login($user){
        $_SESSION['user']=$user;
    }
    public static function logout(){
        $_SESSION['user']=null;
    }
    public static function getUser(){
        return $_SESSION['user'];
    }
}