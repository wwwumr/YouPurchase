var config = {
    shop:   {
        shopUrl: "http://localhost:9000/image/defaultStoreCover.png",
        originShop: {
            key: null, 
            storeName: '', 
            address: '', 
            coverPicUrl: "http://localhost:9000/image/defaultStoreCover.png", 
            contact: '', 
            hours: [],
            dealerId: null,
            dealerName: "",
        }
    },
    dealer: {
        avatarUrl: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        manAvatar: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1700741544,1951185347&fm=27&gp=0.jpg",
        originDealer: {   
            key: null,
            userName: "",
            address: "",
            realName: "",
            contact: "",
            storeId: null,
            storeName: "",
            password: "",
            avatar: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1700741544,1951185347&fm=27&gp=0.jpg",
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
        validFormat: ["image/jpge", "image/png"],
        url: "http://img.jiuzheng.com/pic/s/53/c7/53c79f851522da7f2b032a44.jpg",
        maxCapicity: 2 << 21,
        action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    },
    autoInput: {
        url : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        alt : "店面",
    },
    avatar: {
        url: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",

    },
    homePageImageUrl: "url(http://img.jiuzheng.com/pic/s/53/c7/53c79f851522da7f2b032a44.jpg)",
    url: {
        root: "http://localhost:9000/",
        logIn: "http://localhost:9000/login/admin",
        stores: "http://localhost:9000/stores/",
        dealers: "http://localhost:9000/dealers/",
        newdealer: "http://localhost:9000/dealers/",
        unbindDealers: "http://localhost:9000/stores/unbindDealers",
        unbindStores: "http://localhost:9000/dealers/unbindStores",
        updateStoreCover: "http://localhost:9000/stores/cover",
    }
}

export default config;