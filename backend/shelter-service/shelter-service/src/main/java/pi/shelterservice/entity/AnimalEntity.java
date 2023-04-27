package pi.shelterservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import pi.shelterservice.entity.enums.AdaptionStatus;
import pi.shelterservice.entity.enums.AnimalSex;
import pi.shelterservice.entity.enums.AnimalType;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "animals")
public class AnimalEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true)
    private String animalName;

    private Integer age;

    private Float weight;

    @Enumerated(EnumType.STRING)
    private AnimalSex sex;

    @Enumerated(EnumType.STRING)
    private AnimalType animalType;

    private String description;

    @Enumerated(EnumType.STRING)
    private AdaptionStatus adoptionStatus;
}
