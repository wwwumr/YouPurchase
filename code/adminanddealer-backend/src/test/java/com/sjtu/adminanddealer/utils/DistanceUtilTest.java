package com.sjtu.adminanddealer.utils;

import org.junit.Assert;
import org.junit.Test;

/**
 * 计算距离测试
 *
 * @author Chuyuxuan
 */
public class DistanceUtilTest {

    private DistanceUtil distanceUtil = new DistanceUtil();

    /**
     * 计算交大与华师的距离，结果为2.1km，与实际相符
     */
    @Test
    public void getDistance() {
        System.out.println(distanceUtil.getDistance(121.4374, 31.022739,
                121.457141, 31.028182));
        Assert.assertTrue(distanceUtil.getDistance(121.4374, 31.022739,
                121.457141, 31.028182) < 3);
    }
}