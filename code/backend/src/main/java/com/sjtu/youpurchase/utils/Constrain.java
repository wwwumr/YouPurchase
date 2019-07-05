package com.sjtu.youpurchase.utils;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class Constrain {
    private static final Logger logger = LogManager.getLogger();
    private static final String photoDirectory = "";
    private static final String imageFormat = ".jpg";


    public static double getDistance(double uLng, double uLat, double sLng, double sLat) {
        Double pk = Math.PI / 180;
        double userLn = uLng * pk;
        double storeLn = sLng * pk;
        double userLa = uLat * pk;
        double storeLa = sLat * pk;
        double dis = 6370996.81 * Math.acos(Math.sin(userLa) * Math.sin(storeLa) + Math.cos(userLa) * Math.cos(storeLa) * Math.cos(storeLn - userLn));
        return dis / 1000;
    }

    public static void log(Object message) {
        logger.info(message);
    }

    public static void logerror(Exception e) {
        logger.error(e.getMessage());
    }
}
