package koti.auth.Authentication.utils;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import koti.auth.Authentication.AuthEntitys.RegistrationEntity;
import koti.auth.Authentication.AuthService.RegistrationService;

// import org.hibernate.validator.internal.util.stereotypes.Lazy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JWTUtil {

    private static final String SECRET_KEY = "JWT_FOR_EMPLOYEE_MANAGEMENT_SYSTEM_!@#$%^&*()";
    private static final Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));

    private RegistrationService registrationService;
    private RestClient restClient;

    @Autowired
    public JWTUtil(RegistrationService registrationService, RestClient restClient) {
        this.registrationService = registrationService;
        this.restClient = restClient;
    }

    
    // Generate JWT Token
    public String generateToken(String username, long expiryMinutes) {
        RegistrationEntity payload = registrationService.findByUsername(username);
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", payload.getUsername());
        claims.put("role",payload.getRole());

        try{
            Long employeeId = restClient
                    .get()
                    .uri("http://employee:8080/employee/employee/getEmployeeId/" + username)
                    .retrieve()
                    .body(Long.class);
            claims.put("employeeId", employeeId);
        }catch (Exception e) {
            // Exception occurred while fetching employeeId, proceed without it
            throw new RuntimeException("Failed to fetch employeeId for user: " + username, e);
        }

        return Jwts.builder()
                .setSubject(username)
                .setClaims(claims)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiryMinutes * 60 * 1000)) 
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String validateAndExtractUsername(String token) {
        try {
            return Jwts.parser()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();
        } catch (JwtException e) {
            return null;
        }
    }
}



