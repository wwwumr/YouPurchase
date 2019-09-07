package com.sjtu.adminanddealer.utils;

import org.junit.Test;

import static org.junit.Assert.*;

public class Md5UtilTest {

    @Test
    public void testMd5Encoder() throws Exception {
        String s = "1234";
        String ss = Md5Util.encode(s);
        System.out.println(ss);
    }

}