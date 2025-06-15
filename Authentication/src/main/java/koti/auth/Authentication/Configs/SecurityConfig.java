package koti.auth.Authentication.Configs;

// import org.hibernate.validator.internal.util.stereotypes.Lazy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
// import org.springframework.web.client.RestClient;
import org.springframework.web.cors.CorsConfiguration;

// import io.jsonwebtoken.lang.Arrays; // Removed incorrect import
import java.util.*;

import koti.auth.Authentication.AuthProviders.JWTAuthenticationProvider;
import koti.auth.Authentication.AuthService.RegistrationService;
import koti.auth.Authentication.Filters.JWTAuthenticationFilter;
import koti.auth.Authentication.Filters.JWTRefreshFilter;
import koti.auth.Authentication.Filters.JwtValidationFilter;
import koti.auth.Authentication.utils.JWTUtil;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    
    private JWTUtil jwtUtil;
    private RegistrationService registrationService;

    public SecurityConfig(JWTUtil jwtUtil, RegistrationService registrationService) {
        this.jwtUtil = jwtUtil;
        this.registrationService = registrationService;
    }


   @Bean
    public JWTAuthenticationProvider jwtAuthenticationProvider() {
        return new JWTAuthenticationProvider(jwtUtil, registrationService);
    }

    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(passwordEncoder());
        provider.setUserDetailsService(registrationService);
        return provider;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, AuthenticationManager authenticationManager, JWTUtil jwtUtil) throws Exception {

        JWTAuthenticationFilter jwtAuthenticationFilter = new JWTAuthenticationFilter(authenticationManager, jwtUtil);
        JwtValidationFilter jwtValidationFilter = new JwtValidationFilter(authenticationManager);
        JWTRefreshFilter jwtRefreshFilter = new JWTRefreshFilter(jwtUtil, authenticationManager);
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/auth/register").permitAll()
                .requestMatchers("/swagger-ui/index.html").permitAll()
                .anyRequest().authenticated()
            )
            .sessionManagement(session -> session
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS))

            .csrf(csrf -> csrf.disable())
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
            .addFilterAfter(jwtValidationFilter, JWTAuthenticationFilter.class)
            .addFilterAfter(jwtRefreshFilter, JwtValidationFilter.class);
        return http.build();
    }
    @Bean
    public AuthenticationManager authenticationManager() {
        return new ProviderManager(Arrays.asList(
            authenticationProvider(),
            jwtAuthenticationProvider()
        ));
    }
}
