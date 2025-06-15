package ems.Tickets.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AddConvDto {
    private String date;
    private String message;
    private String sender;
    private Long ticket;
}
// {
//     "date": "2025-06-01",
//     "message": "WiFi disconnects often.",
//     "sender": "EMPLOYEE",
//     "ticket": {
//         "id": 1
//     }
// }