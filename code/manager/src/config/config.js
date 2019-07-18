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
        },
        postDealer: {
            key: null,
            userName: "",
            address: "",
            realName: "",
            contact: "",
            storeId: null,
            storeName: "",
            password: "",
        }
    },
    uploadImage: {
        validFormat: ["image/jpeg", "image/png", "image/gif"],
        maxCapicity: 2 << 21,
        storeAction: "http://localhost:9000/stores/cover/",
        avatarAction: "http://localhost:9000/dealers/avatar/"
    },
    avatar: {
        url: "image/defaultAvatar.png",
    },
    homePageImageUrl: "url(http://localhost:9000/image/defaultLogInCover.png)",
    url: {
        root: "http://localhost:9000/",
        logIn: "http://localhost:9000/login/admin",
        stores: "http://localhost:9000/stores/",
        dealers: "http://localhost:9000/dealers/",
        newdealer: "http://localhost:9000/dealers/",
        unbindDealers: "http://localhost:9000/dealers/unbindDealers",
        unbindStores: "http://localhost:9000/stores/unbindStores",
        updateStoreCover: "http://localhost:9000/stores/cover",
    }
}

export default config;