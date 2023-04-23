package pi.shelterservice.model;

import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
public class AnimalDTO{

       private String animalName;
        private Integer age;
        private Integer weight;
        private String animalType;
        private String description;
        private Boolean adaptionStatus;
        private String sex;
}
