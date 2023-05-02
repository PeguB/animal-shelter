package pi.shelterservice.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import pi.shelterservice.entity.AdoptionEntity;
import pi.shelterservice.entity.AnimalEntity;
import pi.shelterservice.entity.UserEntity;
import pi.shelterservice.error.AnimalNameDoNotExistException;
import pi.shelterservice.error.LimitReachedForAdoptionException;
import pi.shelterservice.error.UsernameDoNotExistException;
import pi.shelterservice.model.AdoptionDTO;
import pi.shelterservice.repository.AdoptionRepository;
import pi.shelterservice.repository.AnimalRepository;
import pi.shelterservice.repository.UserRepository;
import pi.shelterservice.service.AdoptionService;

import java.util.Optional;

@Service
public class AdoptionServiceImpl implements AdoptionService {

    private final UserRepository userRepository;
    private final AnimalRepository animalRepository;
    private  final AdoptionRepository adoptionRepository;
    private final ObjectMapper objectMapper;

    public AdoptionServiceImpl(UserRepository userRepository, AnimalRepository animalRepository, AdoptionRepository adoptionRepository, ObjectMapper objectMapper){
        this.userRepository = userRepository;
        this.animalRepository = animalRepository;
        this.adoptionRepository = adoptionRepository;
        this.objectMapper = objectMapper;
    }

    @Override
    public AdoptionDTO sendAdoption(AdoptionDTO adoptionDTO) {

        Optional<UserEntity> user = userRepository.findByUsername(adoptionDTO.getUsername());
        if(user.isEmpty()){
            throw new UsernameDoNotExistException(adoptionDTO.getUsername());
        }
        Optional<AnimalEntity> animalEntity = animalRepository.findByAnimalName(adoptionDTO.getAnimalName());
        if(animalEntity.isEmpty()){
            throw new AnimalNameDoNotExistException(adoptionDTO.getAnimalName());
        }
        if(adoptionRepository.findByDateTime(adoptionDTO.getDateTime()).size() == 2){
            throw new LimitReachedForAdoptionException(adoptionDTO.getDateTime());
        }
        AdoptionEntity adoptionEntity = AdoptionEntity.builder()
                .dateTime(adoptionDTO.getDateTime())
                .id_user(user.get().getId())
                .id_animal(animalEntity.get().getId())
                .build();
        adoptionRepository.save(adoptionEntity);
       return adoptionDTO;
    }
}
