package ems.Tickets.dto;

import java.util.List;

import ems.Tickets.entity.conversationTickets;
import lombok.AllArgsConstructor;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AddTicketDto {
    private String employeeName;
    private Long employeeId;
    private String ticketName;
    private String ticketDescription;
    private String ticketStatus;
    private String dateCreated;
    private String dataUpdated;
    private List<conversationTickets> empConversation;
    private List<conversationTickets> adminConversation;
}
    // {
    //   "employeeName": "John Doe",
    //   "ticketName": "VPN Problem",
    //   "ticketDescription": "VPN disconnects frequently.",
    //   "ticketStatus": "In Progress",
    //   "dateCreated": "2025-05-30",
    //   "dataUpdated": "2025-06-01",
    //   "empConversation": [
    //     { "date": "2025-05-30", "message": "VPN is unstable.", "sender": "EMPLOYEE" }
    //   ],
    //   "adminConversation": [
    //     { "date": "2025-06-01", "message": "Checking server logs.", "sender": "ADMIN" }
    //   ]
    // }