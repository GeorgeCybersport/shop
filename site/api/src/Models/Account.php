<?php


namespace MyApp\Models;


class Account extends Model
{
    const TABLE = 'users';
    const ROLES='users_roles';
    const ROLES_NAMES='roles_names';

    public static function register($userName, $login, $pass)
    {
        try {
            $result = self::link()->prepare('SELECT * FROM ' . self::TABLE .
                ' WHERE login=:login'
                );
            $result->bindParam(':login', $login, \PDO::PARAM_STR);
            $result->execute();
            $alreadyReg = $result->fetch(\PDO::FETCH_ASSOC);
        } catch (\PDOException $e) {
            return "error";
        }
        if (!$alreadyReg) {
            try {
                $reg = self::link()->prepare("INSERT INTO ".self::TABLE." SET userName=:userName, login=:login, pass=:pass");
                $reg->bindParam(':userName', $userName, \PDO::PARAM_STR);
                $reg->bindParam(':login', $login, \PDO::PARAM_STR);
                $reg->bindParam(':pass', $pass, \PDO::PARAM_STR);
                if ($reg->execute())
                    return "success";
            } catch (\PDOException $e) {
                return "error";
            }
        } else return "registered";
    }
    public static function login($login, $pass){
        try{
            $result = self::link()->prepare('SELECT '.self::TABLE.'.userName, '.self::TABLE.'.pass, '.self::TABLE.'.id, '.self::ROLES_NAMES.'.roleName FROM ' . self::TABLE .
                ' LEFT JOIN '.self::ROLES.' ON '.self::TABLE.'.id='.self::ROLES.'.user_id'.
                ' LEFT JOIN '.self::ROLES_NAMES.' ON '.self::ROLES_NAMES.'.roleId='.self::ROLES.'.role_id'.
                ' WHERE login=:login');
            $result->bindParam(':login', $login, \PDO::PARAM_STR);
            $result->execute();
            $user = $result->fetch(\PDO::FETCH_ASSOC);
        } catch (\PDOException $e) {
            return "error";
        }
        if($user){
            return password_verify($pass, $user['pass']) ? $user : "incorrect password";
        }

    }
}