<?php


namespace MyApp\Models;


class Sales extends Model
{
    public static function doSale($price){
        if((int)date("H")>=9 && (int)date("H")<15){
            return round($price*0.9);
        } else return $price;
    }
    public static function showNewPrice($result){
        for ($i=0; $i<count($result); $i++){
            $result[$i]['price']=self::doSale($result[$i]['price']);
        }
        return $result;
    }
}