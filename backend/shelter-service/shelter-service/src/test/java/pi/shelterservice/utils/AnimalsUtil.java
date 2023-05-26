package pi.shelterservice.utils;

import pi.shelterservice.entity.AnimalEntity;
import pi.shelterservice.entity.enums.AnimalStatus;
import pi.shelterservice.model.AnimalDTO;

public class AnimalsUtil {
    private AnimalsUtil(){}

    public static AnimalEntity createAnimalEntity(){
        return AnimalEntity.builder()
                .adoptionStatus(AnimalStatus.NOT_ADOPTED)
                .animalName("testAnimal")
                .build();
    }

    public static AnimalDTO createAnimalDTO(){
        return AnimalDTO.builder()
                .adoptionStatus(AnimalStatus.NOT_ADOPTED.toString())
                .animalName("testAnimal")
                .build();
    }
}
