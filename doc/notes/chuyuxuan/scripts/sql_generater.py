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
        commodity_class_id1 = 40000 + i // 3
        store_id = i // 3 + 30000
        if i < 2999:
            f_gen_commodity.write("(" + str(commodity_id) + ", 'image/defaultCommodityPic.png', 'commodity_name_" + str(commodity_id) + "', " + str(inventory) + ", true, " + str(price) + ", " + str(inventory) + ", " + str(commodity_class_id1) + ") , " )
            f_gen_store_commodity.write("(" + str(store_id) + ", " + str(commodity_id) + "), ")
        else:
            f_gen_commodity.write("(" + str(commodity_id) + ", 'image/defaultCommodityPic.png', 'commodity_name_" + str(commodity_id) + "', " + str(inventory) + ", true, " + str(price) + ", " + str(inventory) + ", " + str(commodity_class_id1) + ") ;" )
            f_gen_store_commodity.write("(" + str(store_id) + ", " + str(commodity_id) + "); ")
    f_gen_commodity.close()
    f_gen_commodity_class.close()
    f_gen_store_commodity.close()
        
def gen_order():
    date_start = (2018, 1, 1, 0, 0, 0, 0, 0, 0)
    date_stop = (2018, 12, 31, 23, 59, 59, 0, 0, 0)
    start = time.mktime(date_start)  # 生成开始时间戳
    end = time.mktime(date_stop)
# INSERT INTO `you_purchase`.`order_info`(`order_info_id`, `judged`, `status`, `store_id`, `tar_address`, `tar_people`, `tar_phone`, `total_price`, `user_id`, `valid`, `delivery_address_id`, `create_date`, `order_info_no`) VALUES (1, b'1', 2, 1, NULL, NULL, NULL, 200, 200, b'1', NULL, '2019-07-23 12:03:00', NULL);
    f_gen_order = codecs.open("gen_order.sql", "w", "utf-8")
    f_gen_order.write("INSERT INTO `you_purchase`.`order_info`(`order_info_id`, `judged`, `status`, `store_id`, `tar_address`, `tar_people`, `tar_phone`, `total_price`, `user_id`, `valid`, `delivery_address_id`, `create_date`, `order_info_no`) VALUES ")
    # for every store, generate random number of orders
    for i in range(1000):
        number_of_orders = random.randint(4,9)
        store_id = 30000 + i
        for k in range(number_of_orders):
            date_tmp = random.randint(start, end)
            date_touple = time.localtime(date_tmp)
            order_date_str = time.strftime("%Y-%m-%d %H:%M:%S", date_touple)
            order_id = 50000 + i * 10 + k
            user_id = random.randint(70000,71000)
            total_price = random.randint(100,200)
            if i == 999 and k == number_of_orders-1:
                f_gen_order.write("(" + str(order_id) + ", true, 3, "+str(store_id)+", 'receiver_addr', 'receiver_name', 'receiver_phone', " + str(total_price) + ", " + str(user_id) + ", true, 1, '" + order_date_str + "', "+str(order_id) + "); ")
            else:
                f_gen_order.write("(" + str(order_id) + ", true, 3, "+str(store_id)+", 'receiver_addr', 'receiver_name', 'receiver_phone', " + str(total_price) + ", " + str(user_id) + ", true, 1, '" + order_date_str + "', "+str(order_id) + "), ")
    f_gen_order.close()
      
'''
生成评分数据
'''
def gen_total_score():
    # INSERT INTO `you_purchase`.`store_total_score`(`store_total_score_id`, `store_id`, `total_judge_time`, `total_score`) VALUES (1, 1, 1, 1);
    f_gen_total_score = open("gen_total_score.sql", "w")
    f_gen_total_score.write("INSERT INTO `you_purchase`.`store_total_score`(`store_total_score_id`, `store_id`, `total_judge_time`, `total_score`) VALUES ")
    for i in range(1000):
        store_id = 30000 + i
        total_score_id = 1 + i
        total_score = random.randint(300,500)
        total_judge_time = random.randint(100,120)
        if i < 999:
            f_gen_total_score.write("(" + str(total_score_id) + ", "+str(store_id)+", " + str(total_judge_time)+", "+str(total_score)+") , ")
        else:
            f_gen_total_score.write("(" + str(total_score_id) + ", "+str(store_id)+", " + str(total_judge_time)+", "+str(total_score)+") ;")
    f_gen_total_score.close()

'''
需要生成的数据,取消该行注释
'''
# generate_store_and_dealer()
# generate_longitude_and_latitude()
# gen_commodity()
gen_order()
# gen_total_score()