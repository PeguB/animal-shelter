package pi.shelterservice.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
        private String adoptionStatus;
        private String sex;
}
