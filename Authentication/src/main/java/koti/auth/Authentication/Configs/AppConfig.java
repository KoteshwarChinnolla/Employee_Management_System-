package koti.auth.Authentication.Configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
public class AppConfig {
    
    @Bean
    public RestClient restClientInstance(){
        return RestClient.create();
    }
}
