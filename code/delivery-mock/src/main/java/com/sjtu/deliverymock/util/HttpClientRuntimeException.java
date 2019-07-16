package com.sjtu.deliverymock.util;

/**
 * Http 请求异常
 */
public class HttpClientRuntimeException extends RuntimeException {
    public HttpClientRuntimeException(String message, Throwable cause) {
        super(message, cause);
    }
}
