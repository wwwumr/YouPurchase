import React,{Component} from 'react';
import{
  ToastAndroid,
} from 'react-native';
import SQLiteStorage from 'react-native-sqlite-storage';

SQLiteStorage.DEBUG(true);
var database_name = "you_purchase.db";//数据库文件
var database_version = "2.0";//版本号
var database_displayname = "MySQLite";
var database_size = 200000;//-1应该是表示无限制
var db;

export default class  Database extends Component{
	  componentWillUnmount(){
        if(db){
            this._successCB('close');
            db.close();
        }
        else {
            console.log("SQLiteStorage not open");
        }
    }
     /*********************************** 
    ****          事件处理函数    ****
    ************************************/

    /**
     * @description 打开数据库
     */
    open(){
        db = SQLiteStorage.openDatabase(
        database_name,
        database_version,
        database_displayname,
        database_size,
        ()=>{
            this._successCB('open');
        },
        (err)=>{
            this._errorCB('open',err);
        });
        return db;
    }
     /*********************************** 
    ****          事件处理函数    ****
    ************************************/

    /**
     * @description 创建一个新的table
     */
    createTable(){
        if (!db) {
            this.open();
        }
        //创建用户表 var tempString = this.state.item.commodityInfo+" "+goodId+" "+storeId+" "+storeName+" "+this.state.item.commodityCoverPicUrl+" "+this.state.item.price;
     
        db.transaction((tx)=> {
            tx.executeSql('CREATE TABLE IF NOT EXISTS ITEM(' +
                'id INTEGER PRIMARY KEY ,' +
                'commodityInfo varchar,'+
                'goodId INTEGER,' +
                'storeId INTEGER,' +
                'storeName VARCHAR,' +
                'commodityCoverPicUrl VARCHAR,' +
                'price REAL,amount INTEGER)'
            , [], ()=> {
                this._successCB('executeSql');
            }, (err)=> {
                this._errorCB('executeSql', err);
            });
        }, (err)=> {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。
            this._errorCB('transaction', err);
        }, ()=> {
        this._successCB('transaction');
        })
	  }
    deleteData(){
        if (!db) {
            this.open();
        }
        db.transaction((tx)=>{
            tx.executeSql('delete from item',[],()=>{
 
            });
        });
    }
     /*********************************** 
    ****          事件处理函数    ****
    ************************************/

    /**
     * @description 删除table
     */
    dropTable(){
        db.transaction((tx)=>{
            tx.executeSql('drop table user',[],()=>{
 
            });
        },(err)=>{
            this._errorCB('transaction', err);
        },()=>{
            this._successCB('transaction');
        });
    }
     /*********************************** 
    ****          事件处理函数    ****
    ************************************/

    /**
     * @description 增加某一个物品的id
     */
    addAmount(id){
        db.transaction((tx)=>{
            let sql1="select * from item where id=?";
            tx.executeSql(sql1,[id],(tx,results)=>{
                let sql="update item set amount=? where id=?";
                    var tempitem = results.rows.item(0);
                    let tempamount = tempitem.amount+1;
                    tx.executeSql(sql,[tempamount,id],()=>{
              
                },(err)=>{
                    console.log(err);
                }
            );
        },(err)=>{
            console.log(err)
        });
      
        },(error)=>{
            this._errorCB('transaction', error);
            ToastAndroid.show("增加数量失败",ToastAndroid.SHORT);
        },()=>{
            this._successCB('transaction insert data');
            ToastAndroid.show("成功添加购物车物品数量 ",ToastAndroid.SHORT);
        });
    }
     /*********************************** 
    ****          事件处理函数    ****
    ************************************/

    /**
     * @description 删除一个列表的id
     */
    deleteItems(idlist){
        db.transaction((tx)=>{
            let sql1="delete  from item where id=?";
            for(var i=0;i<idlist.length;i++)
                tx.executeSql(sql1,[idlist[i]],(tx,results)=>{
                },(err)=>{
                    console.log(err)
                }); 
        },(error)=>{
            this._errorCB('transaction', error);
            //ToastAndroid.show("移除购物车失败",ToastAndroid.SHORT);
        },()=>{
            this._successCB('transaction insert data');
            //ToastAndroid.show("物品成功移除购物车 ",ToastAndroid.SHORT);
        });
    }
     /*********************************** 
    ****          事件处理函数    ****
    ************************************/

    /**
     * @description 删除某一个id的数据
     */
    deleteItem(id){
        db.transaction((tx)=>{
        let sql1="delete  from item where id=?";
        tx.executeSql(sql1,[id],(tx,results)=>{
        },(err)=>{
            console.log(err)
        }); 
        },(error)=>{
            this._errorCB('transaction', error);
            ToastAndroid.show("移除购物车失败",ToastAndroid.SHORT);
        },()=>{
            this._successCB('transaction insert data');
            ToastAndroid.show("物品成功移除购物车 ",ToastAndroid.SHORT);
        });
    }
     /*********************************** 
    ****          事件处理函数    ****
    ************************************/

    /**
     * @description 减少一个物品的数量
     */
    minusAmount(id){
        db.transaction((tx)=>{
            let sql1="select * from item where id=?";
            tx.executeSql(sql1,[id],(tx,results)=>{
                let sql="update item set amount=? where id=?";
                var tempitem = results.rows.item(0);
                let tempamount = tempitem.amount-1;
                tx.executeSql(sql,[tempamount,id],()=>{
                },(err)=>{
                    console.log(err);
                }
            );
            },(err)=>{
                console.log(err)
            });
      
        },(error)=>{
            this._errorCB('transaction', error);
            ToastAndroid.show("减少数量失败",ToastAndroid.SHORT);
        },()=>{
            this._successCB('transaction insert data');
            ToastAndroid.show("成功减少购物车物品数量 ",ToastAndroid.SHORT);
        });
    }
     /*********************************** 
    ****          事件处理函数    ****
    ************************************/

    /**
     * @description 向数据库中插入一条数据
     */
	  insertUserData(userData){
      if (!db) {
          this.open();
      }
      this.createTable();
      // this.deleteData();
      db.transaction((tx)=>{
          let commodityInfo= userData.commodityInfo;
          let goodId = userData.goodId;
          let storeId = userData.storeId;
          let storeName = userData.storeName;
          let commodityCoverPicUrl = userData.commodityCoverPicUrl;
          let price = userData.price;
          let amount = userData.amount;
          let id = storeId*10000+goodId;
          let sql1="select * from item where id=?";
          tx.executeSql(sql1,[id],(tx,results)=>{
              if(results.rows.length==0){
                  let sql = "INSERT INTO ITEM(id,commodityInfo,goodId ,storeId ,storeName ,commodityCoverPicUrl,price,amount)"+"values(?,?,?,?,?,?,?,?)";
                  tx.executeSql(sql,[id,commodityInfo,goodId,storeId,storeName,commodityCoverPicUrl,price,amount],()=>{
                
                  },(err)=>{
                      console.log(err);
                  }
                  );
              }
              else {
                  let sql="update item set amount=? where id=?";
                  var tempitem = results.rows.item(0);
                  let tempamount = tempitem.amount+1;
                  tx.executeSql(sql,[tempamount,id],()=>{
                
                  },(err)=>{
                      console.log(err);
                  }
                  );
              }
          },(err)=>{
              console.log(err)
          });
        
      },(error)=>{
          this._errorCB('transaction', error);
          ToastAndroid.show("数据插入失败",ToastAndroid.SHORT);
      },()=>{
          this._successCB('transaction insert data');
          ToastAndroid.show("成功加入购物车 ",ToastAndroid.SHORT);
      });
    }
     /*********************************** 
    ****          事件处理函数    ****
    ************************************/

    /**
     * @description 关闭数据库
     */
    close(){
        if(db){
            this._successCB('close');
            db.close();
        }
        else {
            console.log("SQLiteStorage not open");
        }
        db = null;
    }
    _successCB(name){
        console.log("SQLiteStorage "+name+" success");
    }
    _errorCB(name, err){
        console.log("SQLiteStorage "+name);
        console.log(err);
    }
	  render(){
		    return null;
	  }
};