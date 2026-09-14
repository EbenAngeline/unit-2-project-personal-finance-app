package com.example.Unit2ProjectPersonalFinanceApp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = {"com.example.Unit2ProjectPersonalFinanceApp", "Auth", "Budget", "Expense", "User", "Models"})
@EntityScan(basePackages = "Models")
@EnableJpaRepositories(basePackages = {"Expense", "Budget", "User"})
public class Unit2ProjectPersonalFinanceAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(Unit2ProjectPersonalFinanceAppApplication.class, args);
	}
}
