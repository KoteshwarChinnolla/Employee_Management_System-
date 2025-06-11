package koti.auth.Authentication.dtos;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class LoginRequest {
    private String username;
    private String password;
}

