package com.you_purchase.backenduser;

import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@EnableRedisHttpSession
@SpringBootApplication
public class BackenduserApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackenduserApplication.class, args);
	}

}
