//var root = "http://202.120.40.8:30414/";
var root = "http://localhost:9000/";
var config = {
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
    dealer: {
        originDealer: {   
            key: null,
            userName: "",
            realName: "",
            gender: null,
            birthday: "",
            contact: "",
            storeId: null,
            storeName: "",
            password: "",
            avatar: "image/dealerDefaultAvatar.png",
        }
    },
    alcohol: {
        "alcoholId": null,
        "alcoholInfo": "",
        "remaining": null,
        "coverPicUrl": "image/defaultAlcohol.jpg",
        "price": null,
    },
    /* 上传图片设置 */
    uploadImage: {
        validFormat: ["image/jpeg", "image/png", "image/gif"],
        maxCapicity: 2 << 21,
        storeAction: root + "api/a/stores/cover/",
        avatarAction: root + "api/a/dealers/avatar/",
        alcoholAction: root + "",
    },
    /* 主页管理员头像 */
    avatar: {
        url: "image/defaultAvatar.png",
    },
    /* 高德地图的appkey */
    mapKey: "29e2ca8db90b7c1fa55dd09e4ce13414",
    homePage: {
        homePageImageUrl: root + "image/defaultLogInCover.png",
        originBgCmd: "initial",
        changeBgCmd: "change",
        adminLogIn: "ADMIN",
    },
    adminLogIn: "ADMIN",
    url: {
        root: root,
        logIn: root + "login/admin/",
        userName: {
            get: root + "login/userName/",
        },
        stores: root + "api/a/stores/",
        storeUnbind: root + "api/a/stores/unbind/",
        dealers: root + "api/a/dealers/",
        newdealer: root + "api/a/dealers/",
        getDealer: root + "api/a/dealers/",
        putDealer: root + "api/a/dealers/",
        unbindDealers: root + "api/a/dealers/unbindDealers",
        unbindStores: root + "api/a/stores/unbindStores",
        updateStoreCover: root + "api/a/stores/cover",
        storeMap: {
            get: root + "api/a/stores/address",
            post: root + "api/a/stores/address",
        },
        comodityClass: {
            get: root + "",
        },
        alcohol: {
            get: root + "api/a/alcohol/",
            post: root + "api/a/alcohol/",
            delete: root + "api/a/alcohol/",
            put: root + "api/a/alcohol/",
        }
    },
    lengthLimit: {
        
    }
}

export default config;