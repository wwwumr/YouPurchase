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
        }
    },
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
    uploadImage: {
        validFormat: ["image/jpeg", "image/png", "image/gif"],
        maxCapicity: 2 << 21,
        storeAction: root + "api/a/stores/cover/",
        avatarAction: root + "api/a/dealers/avatar/"
    },
    avatar: {
        url: "image/defaultAvatar.png",
    },
    homePage: {
        homePageImageUrl: root + "image/defaultLogInCover.png",
        originBgCmd: "initial",
        changeBgCmd: "change",
        adminLogIn: "ADMIN",
    },
    homePageImageUrl: "url(" + root + "image/defaultLogInCover.png)",
    adminLogIn: "ADMIN",
    url: {
        root: root,
        logIn: root + "login/admin",
        stores: root + "api/a/stores/",
        storeUnbind: root + "api/a/stores/unbind/",
        dealers: root + "api/a/dealers/",
        newdealer: root + "api/a/dealers/",
        getDealer: root + "api/a/dealers/",
        putDealer: root + "api/a/dealers/",
        unbindDealers: root + "api/a/dealers/unbindDealers",
        unbindStores: root + "api/a/stores/unbindStores",
        updateStoreCover: root + "api/a/stores/cover",
    }
}

export default config;