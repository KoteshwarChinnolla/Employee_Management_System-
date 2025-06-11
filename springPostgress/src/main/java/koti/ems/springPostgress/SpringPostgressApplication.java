package koti.ems.springPostgress;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class SpringPostgressApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringPostgressApplication.class, args);
	}
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/employee/**")
					.allowedOriginPatterns("*") // Allow all origins
					.allowedMethods("*")
					.allowedHeaders("*");
			}
		};
	}
}
