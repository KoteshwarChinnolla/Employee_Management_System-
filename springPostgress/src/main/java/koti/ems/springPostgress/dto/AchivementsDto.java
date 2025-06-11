package koti.ems.springPostgress.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AchivementsDto {
    private String name;
    private String description;
    private String date;
}
