package com.you_purchase.backenduser.Config;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class Constrain {
    private static final Logger logger = LogManager.getLogger();

    public static void log(Object message) {
        logger.info(message);
    }


}
