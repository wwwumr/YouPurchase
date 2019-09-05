/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 80016
 Source Host           : localhost:3306
 Source Schema         : you_purchase

 Target Server Type    : MySQL
 Target Server Version : 80016
 File Encoding         : 65001

 Date: 04/09/2019 16:15:52
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `admin_id` bigint(20) NOT NULL,
  `password` varchar(31) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_name` varchar(31) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`admin_id`) USING BTREE,
  UNIQUE INDEX `UK_kqgbjr9wso54y7u1xlsqloc4b`(`user_name`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES (1, '1234', 'admin');

-- ----------------------------
-- Table structure for alcohol
-- ----------------------------
DROP TABLE IF EXISTS `alcohol`;
CREATE TABLE `alcohol`  (
  `alcohol_id` bigint(20) NOT NULL,
  `alcohol_info` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `available` bit(1) NOT NULL,
  `cover_pic_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `degree` smallint(6) NULL DEFAULT NULL,
  PRIMARY KEY (`alcohol_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for commodity
-- ----------------------------
DROP TABLE IF EXISTS `commodity`;
CREATE TABLE `commodity`  (
  `commodity_id` bigint(20) NOT NULL,
  `commodity_info` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `inventory` int(11) NULL DEFAULT NULL,
  `on_shelves` bit(1) NULL DEFAULT NULL,
  `price` double NULL DEFAULT NULL,
  `remaining` int(11) NULL DEFAULT NULL,
  `commodity_cover_pic_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `commodity_class_id` bigint(20) NULL DEFAULT NULL,
  PRIMARY KEY (`commodity_id`) USING BTREE,
  INDEX `FK4w38s1v3738w87o9p9mt7fal0`(`commodity_class_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of commodity
-- ----------------------------
INSERT INTO `commodity` VALUES (73, '西瓜', 120, b'1', 12, 12, 'image/-120992363.jpg', 7);
INSERT INTO `commodity` VALUES (74, '手机', 12, b'1', 13, 12, 'image/2025874514.png', 1);
INSERT INTO `commodity` VALUES (71, '学习笔记', 23, b'1', 34, 23, 'image/defaultCommodityPic.png', 2);
INSERT INTO `commodity` VALUES (69, '服装', 12, b'0', 12, 2, 'image/564650884.png', 3);
INSERT INTO `commodity` VALUES (82, '冰激凌', 50, b'1', 12.5, 10, 'image/-963174610.jpg', 5);
INSERT INTO `commodity` VALUES (83, '梦幻神奇海螺', 1314, b'1', 52, 50, 'image/defaultCommodityPic.png', 6);
INSERT INTO `commodity` VALUES (86, '火焰瓶', 25, b'1', 15000, 5, 'image/defaultCommodityPic.png', 6);
INSERT INTO `commodity` VALUES (87, '必刷题练习册', 50, b'1', 25, 50, 'image/2026642376.jpg', 2);
INSERT INTO `commodity` VALUES (103, '冰激凌1', 56, b'0', 43, 0, 'image/-566500237.jpg', 5);
INSERT INTO `commodity` VALUES (114, 'sadsdad', 100, b'1', -100, 10, 'image/defaultCommodityPic.png', 1);
INSERT INTO `commodity` VALUES (113, '12', 6, b'1', 1, 5, 'image/defaultCommodityPic.png', 2);

-- ----------------------------
-- Table structure for commodity_class
-- ----------------------------
DROP TABLE IF EXISTS `commodity_class`;
CREATE TABLE `commodity_class`  (
  `commodity_class_id` bigint(20) NOT NULL,
  `class_info` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `store_id` bigint(20) NULL DEFAULT NULL,
  PRIMARY KEY (`commodity_class_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of commodity_class
-- ----------------------------
INSERT INTO `commodity_class` VALUES (0, '其它', 46);
INSERT INTO `commodity_class` VALUES (1, '电子产品', 46);
INSERT INTO `commodity_class` VALUES (2, '文具', 46);
INSERT INTO `commodity_class` VALUES (3, '服装', 46);
INSERT INTO `commodity_class` VALUES (4, '化妆品', 46);
INSERT INTO `commodity_class` VALUES (5, '零食', 46);
INSERT INTO `commodity_class` VALUES (6, '玩具', 46);
INSERT INTO `commodity_class` VALUES (7, '水果', 46);
INSERT INTO `commodity_class` VALUES (90, '其他', 89);
INSERT INTO `commodity_class` VALUES (91, NULL, NULL);
INSERT INTO `commodity_class` VALUES (93, '其他', 92);
INSERT INTO `commodity_class` VALUES (94, NULL, NULL);
INSERT INTO `commodity_class` VALUES (101, '其他', 100);
INSERT INTO `commodity_class` VALUES (102, NULL, NULL);
INSERT INTO `commodity_class` VALUES (105, '其他', 104);
INSERT INTO `commodity_class` VALUES (106, NULL, NULL);
INSERT INTO `commodity_class` VALUES (108, '其他', 107);
INSERT INTO `commodity_class` VALUES (109, NULL, NULL);

-- ----------------------------
-- Table structure for commodity_pic_urls
-- ----------------------------
DROP TABLE IF EXISTS `commodity_pic_urls`;
CREATE TABLE `commodity_pic_urls`  (
  `commodity_id` bigint(20) NOT NULL,
  `commodity_pic_urls` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  INDEX `FK72n0e8auajf7ju90gi0euwx7t`(`commodity_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for dealer
-- ----------------------------
DROP TABLE IF EXISTS `dealer`;
CREATE TABLE `dealer`  (
  `dealer_id` bigint(20) NOT NULL,
  `contact` varchar(31) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(31) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `real_name` varchar(31) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_name` varchar(31) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `store_id` bigint(20) NULL DEFAULT NULL,
  `attached` bit(1) NOT NULL,
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `birthday` datetime(0) NULL DEFAULT NULL,
  `gender` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`dealer_id`) USING BTREE,
  INDEX `FKkmhkswhk05fta89pdn2w826h2`(`store_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dealer
-- ----------------------------
INSERT INTO `dealer` VALUES (123, '12345', 'password', 'jack', 'jinggongmen', 31, b'1', 'image/257220362.jpg', '2004-01-01 08:00:00', 1);
INSERT INTO `dealer` VALUES (124, '233333', 'abc123', 'cristiano', 'hello', 29, b'1', 'image/-1443340863.jpg', '1999-01-01 09:00:16', 1);
INSERT INTO `dealer` VALUES (2, '12345678', '1234', '小甜甜', 'test1', 46, b'1', 'image/-519549821.jpg', '2019-06-20 08:00:00', 1);
INSERT INTO `dealer` VALUES (5, '11223748', '1234', 'mark', 'rika', NULL, b'0', 'image/1502415902.jpg', '2019-07-17 09:14:25', 1);
INSERT INTO `dealer` VALUES (88, '123768575', '1234', 'ming', 'xue', NULL, b'0', 'image/dealerDefaultAvatar.png', '2009-08-05 08:00:00', 0);
INSERT INTO `dealer` VALUES (99, '12879832', '1234', 'uzi', 'uzi', 32, b'1', 'image/dealerDefaultAvatar.png', '2009-08-02 08:00:00', 1);

-- ----------------------------
-- Table structure for delivery_address
-- ----------------------------
DROP TABLE IF EXISTS `delivery_address`;
CREATE TABLE `delivery_address`  (
  `delivery_address_id` bigint(20) NOT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `contact` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `detail_address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `gender` int(11) NULL DEFAULT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `tag` int(11) NULL DEFAULT NULL,
  `user_id` bigint(20) NULL DEFAULT NULL,
  PRIMARY KEY (`delivery_address_id`) USING BTREE,
  INDEX `FK6s7ir6nojgmxvx67mx13nx18n`(`user_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of delivery_address
-- ----------------------------
INSERT INTO `delivery_address` VALUES (200, '上海交通大学', '13900001234', '东18宿舍楼', 1, 120.321, 40.212, 'cyx', NULL, 120);
INSERT INTO `delivery_address` VALUES (48, 'dongchuanglu', '123456', 'dong13', 2, 123.434, 34.2121, 'wanglaowu', 1, 120);

-- ----------------------------
-- Table structure for grade
-- ----------------------------
DROP TABLE IF EXISTS `grade`;
CREATE TABLE `grade`  (
  `grade_id` bigint(20) NOT NULL,
  `context` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `grade_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `score` double NULL DEFAULT NULL,
  `store_id` bigint(20) NOT NULL,
  `store_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `user_id` bigint(20) NOT NULL,
  `user_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `valid` bit(1) NOT NULL,
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `create_date` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `order_info_id` bigint(20) NOT NULL,
  PRIMARY KEY (`grade_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for hibernate_sequence
-- ----------------------------
DROP TABLE IF EXISTS `hibernate_sequence`;
CREATE TABLE `hibernate_sequence`  (
  `next_val` bigint(20) NULL DEFAULT NULL
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Records of hibernate_sequence
-- ----------------------------
INSERT INTO `hibernate_sequence` VALUES (117);
INSERT INTO `hibernate_sequence` VALUES (117);
INSERT INTO `hibernate_sequence` VALUES (117);
INSERT INTO `hibernate_sequence` VALUES (117);
INSERT INTO `hibernate_sequence` VALUES (117);
INSERT INTO `hibernate_sequence` VALUES (117);
INSERT INTO `hibernate_sequence` VALUES (117);
INSERT INTO `hibernate_sequence` VALUES (117);

-- ----------------------------
-- Table structure for message
-- ----------------------------
DROP TABLE IF EXISTS `message`;
CREATE TABLE `message`  (
  `message_id` bigint(20) NOT NULL,
  `code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `create_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `time` bigint(20) NOT NULL,
  PRIMARY KEY (`message_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for order_info
-- ----------------------------
DROP TABLE IF EXISTS `order_info`;
CREATE TABLE `order_info`  (
  `order_info_id` bigint(20) NOT NULL,
  `create_date` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `judged` bit(1) NOT NULL,
  `status` int(11) NOT NULL,
  `store_id` bigint(20) NOT NULL,
  `tar_address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `tar_people` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `tar_phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `total_price` double NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `valid` bit(1) NOT NULL,
  `delivery_address_id` bigint(20) NULL DEFAULT NULL,
  `order_info_no` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`order_info_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of order_info
-- ----------------------------
INSERT INTO `order_info` VALUES (0, '2018-09-03 12:03:00.0', b'0', 2, 46, '上海交通大学', '藏宾语', '12345678', 58, 12, b'1', 200, '214', NULL);
INSERT INTO `order_info` VALUES (1, '2019-07-03 11:30:04.0', b'0', 2, 46, '上海市闵行区东川路', '王志刚', '1234567', 30025, 1, b'1', 48, '321', NULL);

-- ----------------------------
-- Table structure for order_item
-- ----------------------------
DROP TABLE IF EXISTS `order_item`;
CREATE TABLE `order_item`  (
  `order_item_id` bigint(20) NOT NULL,
  `amount` int(11) NULL DEFAULT NULL,
  `commodity_id` bigint(20) NOT NULL,
  `order_info_id` bigint(20) NOT NULL,
  `price` double NULL DEFAULT NULL,
  PRIMARY KEY (`order_item_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Records of order_item
-- ----------------------------
INSERT INTO `order_item` VALUES (0, 2, 69, 0, 12);
INSERT INTO `order_item` VALUES (1, 1, 71, 0, 34);
INSERT INTO `order_item` VALUES (2, 2, 86, 1, 15000);
INSERT INTO `order_item` VALUES (3, 1, 87, 1, 25);

-- ----------------------------
-- Table structure for store
-- ----------------------------
DROP TABLE IF EXISTS `store`;
CREATE TABLE `store`  (
  `store_id` bigint(20) NOT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `contact` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `cover_pic_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `open_hour_end` datetime(0) NULL DEFAULT NULL,
  `open_hour_start` datetime(0) NULL DEFAULT NULL,
  `store_name` varchar(31) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `dealer_id` bigint(20) NULL DEFAULT NULL,
  `attached` bit(1) NOT NULL,
  `delivery_type` int(11) NULL DEFAULT NULL,
  `delivery_range` double NOT NULL,
  PRIMARY KEY (`store_id`) USING BTREE,
  INDEX `FK9tr0wp594oexrr008q9rdhbag`(`dealer_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of store
-- ----------------------------
INSERT INTO `store` VALUES (29, '上海市闵行区颛桥镇环球商城', '123000', 'image/1615354242.jpg', 31.034951, 121.434625, '1970-01-01 23:00:00', '1970-01-01 01:00:00', '全家sjtu1店', 124, b'1', 0, 0);
INSERT INTO `store` VALUES (31, '玉兰苑', '1234567', 'image/1736254917.jpg', 0, 0, '1970-01-01 20:00:00', '1970-01-01 06:30:00', '煎饼果子', 123, b'1', 0, 0);
INSERT INTO `store` VALUES (32, '东川路798', '12300000', 'image/1101077851.jpg', 0, 0, '1970-01-01 21:00:00', '1970-01-01 08:00:00', 'KFC', 99, b'1', 0, 0);
INSERT INTO `store` VALUES (46, '上海市闵行区江川路街道上海交通大学闵行校区', '-54749111', 'image/1474897441.jpg', 31.02812, 121.445641, '1970-01-01 17:30:00', '1970-01-01 16:27:00', '神奇海螺', 2, b'1', 0, 7);
INSERT INTO `store` VALUES (100, '上海市闵行区梅陇镇澄江路1588号', '1234', 'image/defaultStoreCover.png', 31.079361, 121.42999, '1970-01-01 17:30:00', '1970-01-01 08:30:00', '十点三', NULL, b'0', 0, 1);

-- ----------------------------
-- Table structure for store_commodity
-- ----------------------------
DROP TABLE IF EXISTS `store_commodity`;
CREATE TABLE `store_commodity`  (
  `store_id` bigint(20) NOT NULL,
  `commodity_id` bigint(20) NOT NULL,
  UNIQUE INDEX `UK_f906qiseashnkrd4t2pq6kttf`(`commodity_id`) USING BTREE,
  INDEX `FK9rmowjxkuu8hdxnv4t19tybmo`(`store_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Records of store_commodity
-- ----------------------------
INSERT INTO `store_commodity` VALUES (46, 114);
INSERT INTO `store_commodity` VALUES (46, 113);
INSERT INTO `store_commodity` VALUES (46, 87);
INSERT INTO `store_commodity` VALUES (46, 86);
INSERT INTO `store_commodity` VALUES (46, 83);
INSERT INTO `store_commodity` VALUES (46, 82);
INSERT INTO `store_commodity` VALUES (46, 69);
INSERT INTO `store_commodity` VALUES (46, 71);
INSERT INTO `store_commodity` VALUES (46, 73);
INSERT INTO `store_commodity` VALUES (46, 74);
INSERT INTO `store_commodity` VALUES (46, 103);

-- ----------------------------
-- Table structure for store_total_score
-- ----------------------------
DROP TABLE IF EXISTS `store_total_score`;
CREATE TABLE `store_total_score`  (
  `store_total_score_id` bigint(20) NOT NULL,
  `store_id` bigint(20) NULL DEFAULT NULL,
  `total_judge_time` bigint(20) NULL DEFAULT NULL,
  `total_score` double NOT NULL,
  PRIMARY KEY (`store_total_score_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `user_id` bigint(20) NOT NULL,
  `address` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `area` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `img_file` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `password` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `phone` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `user_name` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `photo` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `reg_date` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `valid` bit(1) NOT NULL,
  `status` bit(1) NOT NULL,
  `gender` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`) USING BTREE,
  UNIQUE INDEX `UK_lqjrcobrh9jc8wpcar64q1bfh`(`user_name`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (6, '东川路800', NULL, NULL, '123456', '123123', 'zzz', 11.1, 11.1, 'root/data/images', '01/01/2019', b'1', b'0', NULL);
INSERT INTO `user` VALUES (120, '啦啦啦', 'lalala', '', '1234567', '19099998888', 'lalauser', 120.3232, 39.121, 'root/data/images', '17/07/2019', b'1', b'0', '');

SET FOREIGN_KEY_CHECKS = 1;
