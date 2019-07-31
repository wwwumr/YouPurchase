# coding=utf-8
import random
import time
import os
import codecs

'''
生成jmeter测试的参数
'''
def generate_longitude_and_latitude():
    f = open("position.csv", "w")
    for i in range(500):
        longitude = round(121 + random.random(), 6)
        latitude = round(30.8 + random.random(), 6)
        f.write(str(longitude) + "," + str(latitude) + "\n")
    f.close()
'''
生成经销商和店铺的信息
'''
def generate_store_and_dealer():
    f_gen_store = open("gen_store.sql", "w")   
    f_gen_dealer = open("gen_dealer.sql", "w")
# INSERT INTO `you_purchase`.`dealer`(`dealer_id`, `attached`, `avatar`, `contact`, `password`, `real_name`, `user_name`, `store_id`, `birthday`, `gender`) VALUES (123, b'1', 'image/-1689274444.jpg', '022-1112233', '1234', '小王', 'test', 124, '2019-07-26 14:43:02', 1);
# INSERT INTO `you_purchase`.`store`(`store_id`, `address`, `attached`, `contact`, `cover_pic_url`, `delivery_type`, `latitude`, `longitude`, `open_hour_end`, `open_hour_start`, `store_name`, `dealer_id`, `delivery_range`) VALUES (2, '剑川路', b'0', '020-9998888', 'image/defaultStoreCover.png', 0, 31.018484, 121.434637, '1970-01-01 05:00:00', '1970-01-01 04:00:00', '黄焖鸡', NULL, 6);
    f_gen_dealer.write("INSERT INTO `you_purchase`.`dealer`(`dealer_id`, `attached`, `avatar`, `contact`, `password`, `real_name`, `user_name`, `store_id`, `birthday`, `gender`) VALUES ")
    f_gen_store.write("INSERT INTO `you_purchase`.`store`(`store_id`, `address`, `attached`, `contact`, `cover_pic_url`, `delivery_type`, `latitude`, `longitude`, `open_hour_end`, `open_hour_start`, `store_name`, `dealer_id`, `delivery_range`) VALUES ")
    for i in range(1000):
        longitude = round(121 + random.random(), 6)
        latitude = round(30.8 + random.random(), 6)
        dealerId = 20000 + i
        storeId = 30000 + i
        avatar = "image/dealerDefaultAvatar.png"
        cover_pic_url = "image/defaultStoreCover.png"
        if i < 999:
            f_gen_dealer.write("(" + str(dealerId) + ", true, '" + avatar + "', '020-123456', '1234', 'realname', 'user" + str(dealerId) + "', " + str(storeId) + ", '2000-07-01', 0) , ")
            f_gen_store.write("(" + str(storeId) + ", 'address', true, '020-123456', '" + cover_pic_url + "', 0, " + str(latitude) + ", " + str(longitude) + ", '2019-07-01 08:00:00', '2019-07-01 19:00:00', 'store" + str(storeId) + "', " + str(dealerId) + ", 20) , ")
        else:
            f_gen_dealer.write("(" + str(dealerId) + ", true, '" + avatar + "', '020-123456', '1234', 'realname', 'user" + str(dealerId) + "', " + str(storeId) + ", '2000-07-01', 0) ;")            
            f_gen_store.write("(" + str(storeId) + ", 'address', true, '020-123456', '" + cover_pic_url + "', 0, " + str(latitude) + ", " + str(longitude) + ", '2019-07-01 08:00:00', '2019-07-01 19:00:00', 'store" + str(storeId) + "', " + str(dealerId) + ", 20) ;")
    f_gen_dealer.close()
    f_gen_store.close()


'''
生成商品数据
'''
def gen_commodity():
# INSERT INTO `you_purchase`.`commodity`(`commodity_id`, `commodity_cover_pic_url`, `commodity_info`, `inventory`, `on_shelves`, `price`, `remaining`, `commodity_class_id`) VALUES (7, 'image/defaultCommodityPic.png', '宫保鸡丁', 12, b'0', 6, 10, 369);
# INSERT INTO `you_purchase`.`commodity_class`(`commodity_class_id`, `class_info`, `store_id`) VALUES (366, '水果', 124);
# INSERT INTO `you_purchase`.`store_commodity`(`store_id`, `commodity_id`) VALUES (124, 6);

    f_gen_commodity = open("gen_commodity.sql", "w")
    f_gen_commodity_class = codecs.open("gen_commodity_class.sql", "w", "utf-8")
    f_gen_store_commodity = open("gen_store_commodity.sql", "w")
    f_gen_commodity.write("INSERT INTO `you_purchase`.`commodity`(`commodity_id`, `commodity_cover_pic_url`, `commodity_info`, `inventory`, `on_shelves`, `price`, `remaining`, `commodity_class_id`) VALUES ")
    f_gen_commodity_class.write("INSERT INTO `you_purchase`.`commodity_class`(`commodity_class_id`, `class_info`, `store_id`) VALUES ")
    f_gen_store_commodity.write("INSERT INTO `you_purchase`.`store_commodity`(`store_id`, `commodity_id`) VALUES ")
    for j in list(range(1000)):
        storeId = 30000 + j
        for k in list(range(5)):
            commodity_class_id = 40000 + j * 5 + k
            if k != 4:
                f_gen_commodity_class.write("(" + str(commodity_class_id) + ", 'commodityClass" + str(k) + "', " + str(storeId) + ") , ")
            if j != 999 and k == 4:
                f_gen_commodity_class.write("(" + str(commodity_class_id) + ", '其它', " + str(storeId) + ") , ")
            if j == 999 and k == 4:
                f_gen_commodity_class.write("(" + str(commodity_class_id) + ", '其它', " + str(storeId) + ");")


    for i in range(3000):
        commodity_id = 10000 + i
        inventory = random.randint(10,100)
        price = random.randint(1, 300)
        commodity_class_id1 = random.randint(40000, 44999)
        store_id = (commodity_class_id1 - 40000)//5 + 30000
        if i < 2999:
            f_gen_commodity.write("(" + str(commodity_id) + ", 'image/defaultCommodityPic.png', 'commodity_name_" + str(commodity_id) + "', " + str(inventory) + ", true, " + str(price) + ", " + str(inventory) + ", " + str(commodity_class_id1) + ") , " )
            f_gen_store_commodity.write("(" + str(store_id) + ", " + str(commodity_id) + "), ")
        else:
            f_gen_commodity.write("(" + str(commodity_id) + ", 'image/defaultCommodityPic.png', 'commodity_name_" + str(commodity_id) + "', " + str(inventory) + ", true, " + str(price) + ", " + str(inventory) + ", " + str(commodity_class_id1) + ") ;" )
            f_gen_store_commodity.write("(" + str(store_id) + ", " + str(commodity_id) + "); ")
    f_gen_commodity.close()
    f_gen_commodity_class.close()
    f_gen_store_commodity.close()
        
        


'''
需要生成的数据,取消该行注释
'''
# generate_store_and_dealer()
# generate_longitude_and_latitude()
gen_commodity()