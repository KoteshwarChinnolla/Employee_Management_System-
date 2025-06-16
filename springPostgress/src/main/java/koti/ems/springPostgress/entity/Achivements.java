package koti.ems.springPostgress.entity;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import koti.ems.springPostgress.dto.AchivementsDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "achivements", schema = "ems")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE, region = "defaultCache")
public class Achivements {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "achivement_seq1")
    @SequenceGenerator(name = "achivement_seq1", sequenceName = "achivement_seq1", initialValue = 1, allocationSize = 1)
    private Long id;
    @Column(name = "title", nullable = false)
    private String title;
    @Column(name = "description", nullable = false)
    private String description;
    @Column(name = "date", nullable = false)
    private String date;

    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "id")
    @JsonBackReference
    private Employee employee;

    public AchivementsDto toDto() {
        AchivementsDto dto = new AchivementsDto();
        dto.setName(this.title);
        dto.setDescription(this.description);
        dto.setDate(this.date);
        return dto;
    }
}