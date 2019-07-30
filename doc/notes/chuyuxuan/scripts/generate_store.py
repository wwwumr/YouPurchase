import random
import time
import os


def generate_store_and_dealer():
    f = open("gen_store_dealer.sql", "w")   
# INSERT INTO `you_purchase`.`dealer`(`dealer_id`, `attached`, `avatar`, `contact`, `password`, `real_name`, `user_name`, `store_id`, `birthday`, `gender`, `address`) VALUES (123, b'1', 'image/-1689274444.jpg', '022-1112233', '1234', '小王', 'test', 124, '2019-07-26 14:43:02', 1, '');
# INSERT INTO `you_purchase`.`store`(`store_id`, `address`, `attached`, `contact`, `cover_pic_url`, `delivery_type`, `latitude`, `longitude`, `open_hour_end`, `open_hour_start`, `store_name`, `dealer_id`, `delivery_range`) VALUES (2, '剑川路', b'0', '020-9998888', 'image/defaultStoreCover.png', 0, 31.018484, 121.434637, '1970-01-01 05:00:00', '1970-01-01 04:00:00', '黄焖鸡', NULL, 6);
    for i in range(3000):
        longitude = round(121 + random.random(), 6)
        latitude = round(30.8 + random.random(), 6)
        dealerId = 20000 + i
        storeId = 30000 + i
        avatar = "image/dealerDefaultAvatar.png"
        cover_pic_url = "image/defaultStoreCover.png"
        f.write("INSERT INTO `you_purchase`.`dealer`(`dealer_id`, `attached`, `avatar`, `contact`, `password`, `real_name`, `user_name`, `store_id`, `birthday`, `gender`, `address`) VALUES " +
                "(" + str(dealerId) + ", true, '" + avatar + "', '020-123456', '1234', 'realname', 'user" + str(dealerId) + "', " + str(storeId) + ", '2000-07-01', 0, 'address') ; \n")
        f.write("INSERT INTO `you_purchase`.`store`(`store_id`, `address`, `attached`, `contact`, `cover_pic_url`, `delivery_type`, `latitude`, `longitude`, `open_hour_end`, `open_hour_start`, `store_name`, `dealer_id`, `delivery_range`) VALUES " +
                "(" + str(storeId) + ", 'address', true, '020-123456', '" + cover_pic_url + "', 0, " + str(latitude) + ", " + str(longitude) + ", '2019-07-01 08:00:00', '2019-07-01 19:00:00', 'store" + str(storeId) + "', " + str(dealerId) + ", 20) ; \n")
    f.close()

generate_store_and_dealer()