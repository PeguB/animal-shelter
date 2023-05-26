package pi.shelterservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class AnimalDTO{

       private String animalName;
        private Integer age;
        private Integer weight;
        private String animalType;
        private String description;
        private String adoptionStatus;
        private String sex;
        private String photoPath;
        private String photoIconPath;
}
