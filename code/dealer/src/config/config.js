var root = "http://localhost:9000/";
let root1 = "http://localhost:9001/";
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
        }
    },
    /* 经销商信息模板 */
    dealer: {
        originDealer: {   
            key: null,
            userName: "",
            address: "",
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
        },
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
    },
    /* 后端接口 */
    url: {
        /* root */
        root: root,
        logIn: root + "login/dealer/",
        logOut: root + "logout/",
        userName: root + "login/userName/",
        userId: root + "login/userId",
        dealers: root + "api/ad/dealers/",
        /* 经销商信息接口 */
        unbindDealers: root + "api/a/dealers/unbindDealers/",
        dealer: root + "api/d/dealers/dealer/",
        /* 商店接口 */
        stores: root +  "api/ad/stores/",
        unbindStores: root + "api/a/stores/unbindStores/",
        updateStoreCover: root + "api/ad/stores/cover/",
        store: root + "api/d/stores/dealer/store/",
        /* 货物接口 */
        storeGoods: root + "api/d/stores/commodities/",
        goods: root + "api/du/commodities/",
        goodsP: root + "api/d/commodities/",
        updateGoodsCover: root + "api/d/commodities/cover/",
        /* root1 */
        root1: root1,
        orderInfo: root1 + "order/storeCheck/",
    },
}



export default config;