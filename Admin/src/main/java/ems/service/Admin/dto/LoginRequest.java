package ems.service.Admin.dto;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class LoginRequest {
    private String username;
    private String password;
}

