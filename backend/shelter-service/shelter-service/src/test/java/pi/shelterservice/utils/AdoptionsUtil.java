package pi.shelterservice.utils;

import pi.shelterservice.entity.AdoptionEntity;
import pi.shelterservice.entity.AnimalEntity;
import pi.shelterservice.entity.UserEntity;
import pi.shelterservice.entity.enums.AdoptionStatus;
import pi.shelterservice.model.AdoptionDTO;

import java.time.LocalDate;

public class AdoptionsUtil {

    public static AdoptionDTO createValidAdoptionDTO(String animalName,String username){
        return AdoptionDTO.builder()
                .animalName(animalName)
                .username(username)
                .dateTime(LocalDate.now().plusDays(1))
                .build();
    }
    public static AdoptionEntity createValidAdoptionEntity(AnimalEntity animal, UserEntity user){
        return AdoptionEntity.builder()
                .adoptionStatus(AdoptionStatus.PENDING)
                .animal(animal)
                .user(user)
                .build();
    }
}
