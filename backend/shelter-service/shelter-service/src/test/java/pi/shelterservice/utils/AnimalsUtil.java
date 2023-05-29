package pi.shelterservice.utils;

import pi.shelterservice.entity.AnimalEntity;
import pi.shelterservice.entity.enums.AnimalStatus;
import pi.shelterservice.model.AnimalDTO;

public class AnimalsUtil {
    private AnimalsUtil(){}

    public static AnimalEntity createAnimalEntity(String animalName){
        return AnimalEntity.builder()
                .adoptionStatus(AnimalStatus.NOT_ADOPTED)
                .id(2)
                .animalName(animalName)
                .build();
    }

    public static AnimalDTO createAnimalDTO(String animalName){
        return AnimalDTO.builder()
                .adoptionStatus(AnimalStatus.NOT_ADOPTED.toString())
                .animalName(animalName)
                .build();
    }
}
