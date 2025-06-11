package koti.ems.springPostgress.dto;

import lombok.AllArgsConstructor;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class conversation {
    private Long Id;
    private Long EmployeeId;
    private String Date;
    private String Message;
    private String sender;
    
}
