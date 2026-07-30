package com.smartcart;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;


@SpringBootApplication
@EnableAsync
public class SmartcartBackendApplication {

	public static void main(String[] args) {

		System.out.println("DB_URL exists = " + (System.getenv("DB_URL") != null));
		System.out.println("DB_USERNAME exists = " + (System.getenv("DB_USERNAME") != null));
		System.out.println("DB_PASSWORD exists = " + (System.getenv("DB_PASSWORD") != null));

		SpringApplication.run(
				SmartcartBackendApplication.class,
				args
		);
	}
}
