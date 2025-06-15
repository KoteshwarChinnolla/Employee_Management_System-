package ems.Tickets.dto;

import java.util.List;

import ems.Tickets.entity.conversationTickets;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TicketsDto {
    private Long ticketId;
    private String ticketName;
    private String ticketDescription;
    private String ticketStatus;
    private String dateCreated;
    private String dateUpdated;
    private List<conversationTickets> allConversations;
}
