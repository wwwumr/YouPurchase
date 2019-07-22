var root = "http://localhost:9000/";
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
    /* 头像、店面、货物图片上传配置 */
    uploadImage: {
        validFormat: ["image/jpeg", "image/png", "image/gif"],
        maxCapicity: 2 << 21,
        storeAction: root + "stores/cover/",
        avatarAction: root + "dealers/avatar/",
        goodsAction: root + "commodities/cover/",
        goodsPicsAction: root + "commodities/pics/",
    },
    /* 主页背景图片与默认背景 */
    homePage: {
        imageUrl: root +"image/defaultLogInCover.png",
        originBgCmd: "initial",
    },
    /* 后端接口 */
    url: {
        root: root,
        logIn: root + "login/dealer/",
        logOut: root + "logout/",
        userName: root + "login/userName/",
        userId: root + "login/userId",
        stores: root +  "stores/",
        dealers: root + "dealers/",
        newdealer: root + "dealers/",
        unbindDealers: root + "dealers/unbindDealers/",
        unbindStores: root + "stores/unbindStores/",
        updateStoreCover: root + "stores/cover/",
        store: root + "stores/dealer/store/",
        storeGoods: root + "stores/commodities/",
        dealer: root + "dealers/dealer/",
        goods: root + "commodities/",
        updateGoodsCover: root + "commodities/cover/"
    },
}



export default config;