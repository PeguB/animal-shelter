package pi.shelterservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    private String animalName;
    private Integer age;
    private Float weight;
    @Enumerated(EnumType.STRING)
    private AnimalSex sex;
    @Enumerated(EnumType.STRING)
    private AnimalType animalType;
    private String description;
    private Boolean adoptionStatus;
}
