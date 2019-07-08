var config = {
    shop:   {
        shopUrl: "http://img2.imgtn.bdimg.com/it/u=2113909108,4103249324&fm=26&gp=0.jpg",
        originShop: {
            key: null, 
            storeName: '', 
            address: '', 
            coverPicUrl: "http://img2.imgtn.bdimg.com/it/u=2113909108,4103249324&fm=26&gp=0.jpg", 
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
        logIn: "http://localhost:9000/logIn/",
        stores: "http://localhost:9000/stores/",
        dealers: "http://localhost:9000/dealers/",
        newdealer: "http://localhost:9000/dealers/",
    }
}

export default config;