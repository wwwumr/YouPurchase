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
/**
 * @description android 本地存储user
 * @constructor
 */
export default class  UserSqlite extends Component{
	componentWillUnmount(){
        if(db){
            this._successCB('close');
            db.close();
        }
        else {
            console.log("SQLiteStorage not open");
        }
    }
    /**
     * @description 打开本地数据
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
    /**
     * @description 不存在是建立新的table
     */
    createTable(){
        if (!db) {
            this.open();
        }
        //创建用户表 var tempString = this.state.item.commodityInfo+" "+goodId+" "+storeId+" "+storeName+" "+this.state.item.commodityCoverPicUrl+" "+this.state.item.price;
     
        db.transaction((tx)=> {
            tx.executeSql('CREATE TABLE IF NOT EXISTS USER(' +
                'id INTEGER PRIMARY KEY ,' +
                'phone varchar,'+
                'password varchar)' 
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
    /**
     * @description 删除user
     */
    deleteData(){
        if (!db) {
            this.open();
        }
        db.transaction((tx)=>{
            tx.executeSql('delete from user',[],()=>{
 
            });
        });
    }
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
    /**
     * @description 本地存储该用户信息
     * @param {json} userData 与user相关的信息 
     */
    insertUserData(userData){
        if (!db) {
            this.open();
        }
        this.createTable();
        this.deleteData();
        let phone = userData.phone;
        let id = userData.userId;
        let password = userData.password;
        let sql1="INSERT INTO USER(id,phone,password)"+"values(?,?,?)";
        db.transaction((tx)=> {
            tx.executeSql(sql1, [id,phone,password], ()=> {
                    this._successCB('executeSql');
                    
                }, (err)=> {
                    this._errorCB('executeSql', err);
              });
        }, (err)=> {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。
            this._errorCB('transaction', err);
            //ToastAndroid.show("数据插入失败",ToastAndroid.SHORT);
        }, ()=> {
            this._successCB('transaction');
            //ToastAndroid.show("数据插入成功",ToastAndroid.SHORT);
        })
    }
    /**
     * @description 关闭数据库
     */
    close(){
        if(db){
            this._successCB('close');
            db.close();
        } else {
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