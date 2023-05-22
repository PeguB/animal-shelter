package pi.shelterservice.service.impl;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import pi.shelterservice.entity.AdoptionEntity;
import pi.shelterservice.entity.AnimalEntity;
import pi.shelterservice.entity.UserEntity;
import pi.shelterservice.entity.enums.AdoptionStatus;
import pi.shelterservice.error.AdoptionNotFoundException;
import pi.shelterservice.error.AnimalNameDoNotExistException;
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
    private final AdoptionRepository adoptionRepository;
    private final ObjectMapper objectMapper;

    public AdoptionServiceImpl(UserRepository userRepository, AnimalRepository animalRepository, AdoptionRepository adoptionRepository, ObjectMapper objectMapper) {
        this.userRepository = userRepository;
        this.animalRepository = animalRepository;
        this.adoptionRepository = adoptionRepository;
        this.objectMapper = objectMapper;
    }

    @Override
    public AdoptionDTO sendAdoption(AdoptionDTO adoptionDTO) {

        UserEntity user = findUser(adoptionDTO.getUsername());
        AnimalEntity animalEntity = findAnimal(adoptionDTO.getAnimalName());

        AdoptionEntity adoptionEntity = AdoptionEntity.builder()
                .dateTime(adoptionDTO.getDateTime())
                .idUser(user.getId())
                .idAnimal(animalEntity.getId())
                .adoptionStatus(AdoptionStatus.PENDING)
                .build();
        return objectMapper.convertValue(adoptionRepository.save(adoptionEntity), AdoptionDTO.class);
    }

    @Override
    public void acceptAdoption(AdoptionDTO adoptionDTO) {
        AdoptionEntity adoption = getAdoptionEntity(adoptionDTO);

        AdoptionEntity adoptionEntity = AdoptionEntity.builder()
                .id(adoption.getId())
                .dateTime(adoption.getDateTime())
                .idUser(adoption.getIdUser())
                .idAnimal(adoption.getIdAnimal())
                .adoptionStatus(AdoptionStatus.ACCEPTED)
                .build();
        adoptionRepository.save(adoptionEntity);
    }

    @Override
    public void deleteAdoption(AdoptionDTO adoptionDTO) {
        AdoptionEntity adoption = getAdoptionEntity(adoptionDTO);
        adoptionRepository.delete(adoption);

    }

    private UserEntity findUser(String username) {
        Optional<UserEntity> user = userRepository.findByUsername(username);
        if (user.isEmpty()) {
            throw new UsernameDoNotExistException(username);
        }
        return user.get();
    }

    private AnimalEntity findAnimal(String animalName) {
        Optional<AnimalEntity> animalEntity = animalRepository.findByAnimalName(animalName);
        if (animalEntity.isEmpty()) {
            throw new AnimalNameDoNotExistException(animalName);
        }
        return animalEntity.get();
    }

    private AdoptionEntity getAdoptionEntity(AdoptionDTO adoptionDTO) {
        UserEntity user = findUser(adoptionDTO.getUsername());
        AnimalEntity animalEntity = findAnimal(adoptionDTO.getAnimalName());
        AdoptionEntity adoption = adoptionRepository
                .findAllByIdUser(user.getId())
                .stream()
                .filter(adoptionEntity -> adoptionEntity.getIdAnimal().equals(animalEntity.getId()) &&
                        adoptionEntity.getDateTime().equals(adoptionDTO.getDateTime()))
                .findFirst().orElseThrow(()->new AdoptionNotFoundException(adoptionDTO));
        return adoption;
    }
}
