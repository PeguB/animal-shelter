package pi.shelterservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pi.shelterservice.entity.enums.AdoptionStatus;

import java.time.LocalDate;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "adoptions")
public class AdoptionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer idUser;

    private Integer idAnimal;

    private LocalDate dateTime;

    @Enumerated(EnumType.STRING)
    private AdoptionStatus adoptionStatus;
}
