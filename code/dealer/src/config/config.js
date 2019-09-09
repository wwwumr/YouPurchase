
let root = "http://202.120.40.8:30414/";
let root1 = "http://202.120.40.8:30413/";
/*
let root = "http://localhost:9000/";
let root1 = "http://localhost:9001/";*/
var config = {
    /* 商店信息模板 */ 
    shop: {
        originShop: {
            key: null, 
            storeName: '', 
            address: '', 
            coverPicUrl: "image/defaultStoreCover.png", 
            contact: '', 
            startHour: '',
            endHour: '',
            dealerId: null,
            dealerName: "",
            deliveryType: null,
            deliveryRange: null,
        }
    },
    /* 经销商信息模板 */
    dealer: {
        originDealer: {   
            key: null,
            userName: "",
            gender: null,
            birthday: "",
            realName: "",
            contact: "",
            storeId: null,
            storeName: "",
            password: "",
            avatar: "image/dealerDefaultAvatar.png",
        }
    },
    /* 货物模板 */
    goods: {
        originGoods: {
            "key": null,
            "price": null,
            "commodityInfo": "",
            "commodityCoverPicUrl": "image/defaultCommodityPic.png",
            "commodityPicUrls": [].concat(),
            "onShelves": true,
            "inventory": null,
            "remaining": null,
            "classInfo": '',
        },
        defaultClassName: "其它",
    },
    /* 订单信息 */
    orderInfo: {
        "orderInfoId": null,
        "storeName": '',
        "tarPeople": '',
        "tarPhone": '',
        "tarAddress": '',
        "totalPrice": null,
        "createDate": "",
        "judged": false,
        "orderItemList": []
    },
    /* 订单统计数据 */
    orderItem: {
        commodityId: null,
        price: null,
        amount: null,
        commodityInfo: '',
        commodityCoverPicUrl: '',
    },
    /* 头像、店面、货物图片上传配置 */
    uploadImage: {
        validFormat: ["image/jpeg", "image/png", "image/gif"],
        maxCapicity: 2 << 21,
        storeAction: root + "api/ad/stores/cover/",
        avatarAction: root + "api/ad/dealers/avatar/",
        goodsAction: root + "api/d/commodities/cover/",
        goodsPicsAction: root + "api/d/commodities/pics/",
    },
    /* 主页背景图片与默认背景 */
    homePage: {
        imageUrl: root +"image/defaultLogInCover.png",
        originBgCmd: "initial",
        adminLogIn: "ADMIN",
        dealerLogIn: "DEALER",
    },
    /* 高德地图的appkey */
    mapKey: "29e2ca8db90b7c1fa55dd09e4ce13414",
    /* 后端接口 */
    url: {
        /* root */
        root: root,
        logIn: root + "login/dealer/",
        logOut: root + "logout/",
        userName: root + "login/userName/",
        userId: root + "login/userId",
        dealers: root + "api/d/dealers/",
        /* 经销商信息接口 */
        dealer: root + "api/d/dealers/dealer/",
        renewPassword: {
            post: root + "api/d/dealers/password/",
        },
        /* 商店接口 */
        stores: root +  "api/d/stores/",
        updateStoreCover: root + "api/d/stores/cover/",
        store: root + "api/d/stores/dealer/store/",
        putStorePos: root + "api/d/stores/address/",
        getStorePos: root + "api/d/stores/address/",
        /* 货物接口 */
        storeGoods: root + "api/d/stores/commodities/",
        goods: root + "api/d/commodities/",
        goodsP: root + "api/d/commodities/",
        updateGoodsCover: root + "api/d/commodities/cover/",
        goodsClass: {
            get: root + "api/d/commodities/classes/",
            post: root + "api/d/commodities/classes/",
            put: root + "api/d/commodities/classes/",
            delete: root + "api/d/commodities/classes/",
        }, 
        alcoholClass: {
            get: root + "api/d/alcohol/",
        },
        allGoodsClass: root + "api/ad/commodities/classes/all/" ,
        /* root1 */
        root1: root1,
        /* 订单接口 */
        orderInfo: root1 + "order/storeCheck/",
        orderModify: {
            get: root1 + "order/modify/",
        },
        orderDetail: {
            get: root1 + "order/check/",
        },
        orderByTime: {
            post: root1 + "order/storeTimeCheck/",
        }
    },
}



export default config;