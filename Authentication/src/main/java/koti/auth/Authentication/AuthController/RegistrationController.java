package koti.auth.Authentication.AuthController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import koti.auth.Authentication.AuthEntitys.RegistrationEntity;
import koti.auth.Authentication.AuthService.RegistrationService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/auth")
public class RegistrationController {
    
    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    RegistrationService registrationService;
    @PostMapping("/register")
    public String registerUser(@RequestBody RegistrationEntity user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        System.out.println("User registration details: " + user.getUsername() + ", " + user.getPassword());
        registrationService.save(user);
        
        return "User registered successfully!";
    }
    @GetMapping("/user")
    public String User() {
        return "User logged in successfully!";
    }
}
