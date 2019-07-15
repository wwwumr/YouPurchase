package com.sjtu.adminanddealer.utils;

import org.springframework.stereotype.Component;

import static java.lang.Math.abs;

/**
 * 根据经纬度计算相关信息的工具类
 *
 * @author Chuyuxuan
 */
@Component
public class DistanceUtil {

    // 赤道半径 km
    private static double EARTH_RADIUS = 6378.1370;


    public double getDistance(double longitude1, double latitude1,
                              double longitude2, double latitude2){
        // 纬度的差值
        double latRad = convertDegreesToRadians(latitude2-latitude1);

        // 经度的差值
        double logRad = convertDegreesToRadians(longitude2-longitude1);

        //h is the great circle distance in radians, great circle就是一个球体上的切面，它的圆心即是球心的一个周长最大的圆
        double h = haverSin(latRad) + Math.cos(latitude1) * Math.cos(latitude2) * haverSin(logRad);

        return 2 * EARTH_RADIUS * Math.asin(Math.sqrt(h));
    }

    private static double convertDegreesToRadians(double degrees){
        return abs((Math.PI * degrees)/180.0);
    }

    private static double haverSin(double theta)
    {
        double v = Math.sin(theta / 2.0);
        return v * v;
    }
}
