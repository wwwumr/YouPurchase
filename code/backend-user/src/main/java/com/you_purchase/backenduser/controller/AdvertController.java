package com.you_purchase.backenduser.controller;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.you_purchase.backenduser.entity.Advert;
import com.you_purchase.backenduser.parameter.AdvertParameter;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.spring.web.json.Json;
;

@RestController
@Api(value = "广告推送")
public class AdvertController extends BaseController {
    @RequestMapping(value = "/advert/{advertId}",produces = "application/json;charset=utf-8",method = RequestMethod.GET)
    public
    @ResponseBody
    @ApiOperation(value = "广告页面")
    String AdvetGet(@PathVariable("advertId") long advertId) {
        Advert advert = advertService.AdvertAcess(advertId);
        return  advert.getTitle()+"："+"\n"+advert.getText();
    }


    @RequestMapping(value = "/advert/add",method = RequestMethod.POST)
    public
    @ResponseBody
    @ApiOperation(value = "管理员添加广告")
    long AdvertAdd(AdvertParameter advertParameter){
        return advertService.AddAdvert(advertParameter);
    }

    @RequestMapping(value = "/advert/find",method = RequestMethod.GET)
    public
    @ResponseBody
    @ApiOperation(value = "用户获取网页地址id" )
    long AdvertFind(){
        return advertService.AdvertGet();
    }
}
