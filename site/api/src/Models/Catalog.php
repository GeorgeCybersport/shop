<?php


namespace MyApp\Models;


class Catalog extends Model
{
    const TABLE="items";

    public static function show(){
        try {
            $result= self::db()->getAllData(self::TABLE);
            $result=Sales::showNewPrice($result);
            return $result;
        } catch (\PDOException $e){
            return "error";
        }
    }
}