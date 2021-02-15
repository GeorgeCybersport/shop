<?php

namespace MyApp\Models;

use MyApp\Models\Basket;
use MyApp\Models\Sales;

class Orders extends Model
{
    const USERS="users";
    const JOIN_CART="items";
    const TABLE="cart";
    const ORDER_DATA="order_data";
    const ORDER_ITEMS="order_items";

    public static function buy($personId){
        try {
            self::link()->beginTransaction();
            $cart = self::link()->query("SELECT ".self::TABLE.".itemAmount, "
                .self::JOIN_CART.".id, ".self::JOIN_CART.".price FROM "
                .self::TABLE." LEFT JOIN " .self::JOIN_CART." ON cart.itemId=items.id WHERE `personId` ="
                .(int)$personId)
                ->fetchAll(\PDO::FETCH_ASSOC);
            $sum=Basket::getTotalPrice($cart);
            $addOrder=self::link()->query("INSERT INTO ".self::ORDER_DATA." SET user_id=".(int)$personId.
                ", summary=".(int)$sum) ? true : false;
            $ordersData=self::link()->query("SELECT * FROM ".self::ORDER_DATA." WHERE user_id="
                .(int)$personId." ORDER BY id DESC")->fetchAll(\PDO::FETCH_ASSOC);
            $orderData=array_shift($ordersData);
            $results=[];
            foreach ($cart as $item){
                $price=Sales::doSale($item['price']);
                $subtotal=$price*$item['itemAmount'];
                $results[]=self::link()->query('INSERT INTO '.self::ORDER_ITEMS.
                    " SET order_id=".(int)$orderData['id'].', item_price='.(int)$price.', item_amount='
                    .(int)$item['itemAmount'].
                    ', item_id='.(int)$item['id'].', item_subtotal='.(int)$subtotal.", user_id="
                    .(int)$personId) ? true : false;
            }
            Basket::clear($personId);
            //print_r([$cart, $addOrder, $orderData, $results]);
            if(self::checkValues($cart, $addOrder, $orderData, $results)){
                self::link()->commit();
                return "success";
            }
            self::link()->rollBack();
            return "error";
        } catch (\PDOException $e){
            self::link()->rollBack();
            return $e;
        }
    }
    public static function showOrders()
    {
        try {
            $orders= self::link()->query("SELECT ".self::USERS.".userName, ".self::ORDER_DATA.".date, "
                .self::ORDER_DATA.".summary, ".self::ORDER_DATA.".id FROM ".self::ORDER_DATA." LEFT JOIN "
                .self::USERS
                ." ON ".self::ORDER_DATA.".user_id=".self::USERS.".id ORDER BY ".self::ORDER_DATA.".id DESC")
                ->fetchAll(\PDO::FETCH_ASSOC);
            $items=self::link()->query("SELECT * FROM ".self::ORDER_ITEMS." LEFT JOIN ".self::JOIN_CART
                ." ON ".self::ORDER_ITEMS.".item_id=".self::JOIN_CART.".id")->fetchAll(\PDO::FETCH_ASSOC);
            return self::getResult($orders, $items);
        } catch (\PDOException $e) {
            return "error";
        }
    }
    public static function showUserOrders($user_id){
        try {
            $orders= self::link()->query("SELECT ".self::USERS.".userName, ".self::ORDER_DATA.".date, "
                .self::ORDER_DATA.".summary, ".self::ORDER_DATA.".id FROM ".self::ORDER_DATA." LEFT JOIN "
                .self::USERS
                ." ON ".self::ORDER_DATA.".user_id=".self::USERS.".id WHERE user_id=".(int)$user_id." ORDER BY "
                .self::ORDER_DATA.".id DESC")->fetchAll(\PDO::FETCH_ASSOC);
            $items=self::link()->query("SELECT * FROM ".self::ORDER_ITEMS." LEFT JOIN ".self::JOIN_CART
                ." ON ".self::ORDER_ITEMS.".item_id=".self::JOIN_CART.".id WHERE user_id=".(int)$user_id)
                ->fetchAll(\PDO::FETCH_ASSOC);
            return self::getResult($orders, $items);
        } catch (\PDOException $e) {
            return "error";
        }
    }
    private static function getResult($orders, $items){
        for($i=0; $i<count($orders); $i++){
            $res=[];
            foreach ($items as $item){
                if($item['order_id']===$orders[$i]['id'])
                    $res[]=$item;
            }
            $orders[$i]['items'] = $res;
        }
        if($orders && $items){
            return $orders;
        } else return "error";
    }
    private static function checkValues($cart, $addOrder, $orderData, $results){
        if(!$cart || !$orderData || !$addOrder) return false;
        foreach ($results as $result){
            if(!$result) return false;
        }
        return true;
    }
}