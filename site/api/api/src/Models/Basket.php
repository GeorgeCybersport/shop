<?php


namespace MyApp\Models;

use MyApp\Models\Sales;

class Basket extends Model
{
    const JOIN_CART="items";
    const TABLE="cart";

    public static function show($personId){
        try{
            $result=self::link()->query("SELECT ".self::TABLE.".itemAmount, ".self::JOIN_CART.".`name`, ".self::JOIN_CART.".imgUrl, "
                .self::JOIN_CART.".id, ".self::JOIN_CART.".price FROM "
                .self::TABLE." LEFT JOIN " .self::JOIN_CART." ON cart.itemId=items.id WHERE `personId` ="
                .(int)$personId)
                ->fetchAll(\PDO::FETCH_ASSOC);
            $result=Sales::showNewPrice($result);
            $totalprice=self::getTotalPrice($result);
            return [
                'items'=>$result,
                'totalprice'=>$totalprice,
            ];
        } catch (\PDOException $e){
            return "error";
        }
    }

    public static function add($personId, $itemId){
        try {
            $result=self::link()->query("SELECT ".self::TABLE.".itemAmount, ".self::TABLE.".personId, ".self::JOIN_CART.".`name`, ".self::JOIN_CART.".imgUrl, "
                .self::JOIN_CART.".id, ".self::JOIN_CART.".price FROM "
                .self::TABLE." LEFT JOIN " .self::JOIN_CART." ON cart.itemId=items.id WHERE `personId` ="
                .(int)$personId ." AND itemId=".(int)$itemId)
                ->fetch(\PDO::FETCH_ASSOC);
        } catch (\PDOException $e){
            return $e;
        }
        return self::checkItems($result, $personId, $itemId, "add");
    }

    public static function remove($personId, $itemId){
        try {
            $result=self::link()->query("SELECT * FROM ".self::TABLE." LEFT JOIN "
                .self::JOIN_CART." ON cart.itemId=items.id WHERE `personId` =".(int)$personId." AND itemId="
                .(int)$itemId)
                ->fetch(\PDO::FETCH_ASSOC);
        } catch (\Throwable $e){
            return "error";
        }
        return self::checkItems($result, $personId, $itemId, "remove");
    }

    public static function clear($personId){
        $result=self::link()->query(
            "DELETE FROM ".self::TABLE." WHERE personId=".(int)$personId);
        return $result ? "success" : "delete error";
    }

    public static function getTotalPrice($items){
        $totalprice=0;
        foreach ($items as $item){
            $totalprice+=$item['price']*$item['itemAmount'];
        }
        $_SESSION['totalprice']=$totalprice;
        return $_SESSION['totalprice'];
    }

    private static function checkItems($item, $personId, $itemId, $action){
        if($item){
            $action==="add" ? $item['itemAmount']++ : $item['itemAmount']--;
            return $item['itemAmount']<=0 ? self::deleteItem($item) : self::updateBase($item, $action);
        } else {
            if($action==="add"){
                $addItem = self::db()->getById(self::JOIN_CART, $itemId);
                if($addItem){
                    return self::addToBase($addItem, $personId);
                } else return "item not found";
            } else return "error";
        }
    }

    private static function updateBase($item, $action){
        $result=self::link()->query(
            "UPDATE ".self::TABLE." SET itemAmount=".(int)$item['itemAmount']
            ." WHERE personId=".(int)$item['personId']." AND itemId=".(int)$item['id']) ? true : false;
        $item['price']=Sales::doSale((int)$item['price']);
        if($result){
            $_SESSION['totalprice']+=$action==="add" ? $item['price'] : -$item['price'];
            return ["item"=>$item, "totalprice"=>$_SESSION['totalprice']];
        }
        return "update error";
    }

    private static function addToBase($item, $personId){
        $result=self::link()->query(
            "INSERT INTO ".self::TABLE." SET itemAmount=1, personId=".(int)$personId
            .", itemId=".(int)$item['id']) ? true : false;
        $item['price']=Sales::doSale((int)$item['price']);
        if($result){
            $_SESSION['totalprice']+=$item['price'];
            $item+=['itemAmount'=>1];
            return ["item"=>$item, "totalprice"=>$_SESSION['totalprice']];
        }
        return "add error";
    }

    private static function deleteItem($item){
        try{
            $result=self::link()->query(
                "DELETE FROM ".self::TABLE." WHERE personId=".(int)$item['personId']
                ." AND itemId=".(int)$item['id']) ? true : false;
            if($result){
                $item['price']=Sales::doSale($item['price']);
                $_SESSION['totalprice']-=$item['price'];
                return ["item"=>$item, "totalprice"=>$_SESSION['totalprice']];
            }
            return "delete error";
        } catch (\PDOException $e){
            return $e;
        }
    }
}