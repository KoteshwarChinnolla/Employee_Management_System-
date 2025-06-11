package koti.ems.springPostgress.dto;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class LoginRequest {
    private String username;
    private String password;
}

