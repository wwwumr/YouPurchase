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
        storeAction: root + "stores/cover/",
        avatarAction: root + "dealers/avatar/"
    },
    avatar: {
        url: "image/defaultAvatar.png",
    },
    homePageImageUrl: "url(" + root + "image/defaultLogInCover.png)",
    url: {
        root: root,
        logIn: root + "login/admin",
        stores: root + "stores/",
        dealers: root + "dealers/",
        newdealer: root + "dealers/",
        unbindDealers: root + "dealers/unbindDealers",
        unbindStores: root + "stores/unbindStores",
        updateStoreCover: root + "stores/cover",
    }
}

export default config;