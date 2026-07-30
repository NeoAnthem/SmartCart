package com.smartcart;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class SmartcartBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(SmartcartBackendApplication.class, args);
	}
}