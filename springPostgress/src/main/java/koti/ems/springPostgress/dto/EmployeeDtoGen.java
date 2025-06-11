package koti.ems.springPostgress.dto;

import lombok.AllArgsConstructor;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDtoGen {
    private Long id;
    private String name;
    private String email;
    private String position;
    private String employeeTeam;
}
