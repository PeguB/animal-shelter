package pi.shelterservice.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import pi.shelterservice.entity.AdoptionEntity;
import pi.shelterservice.entity.AnimalEntity;
import pi.shelterservice.entity.UserEntity;
import pi.shelterservice.entity.enums.AdoptionStatus;
import pi.shelterservice.entity.enums.AnimalStatus;
import pi.shelterservice.error.*;
import pi.shelterservice.model.AdoptionDTO;
import pi.shelterservice.model.AdoptionViewDTO;
import pi.shelterservice.model.UserAdoptionDTO;
import pi.shelterservice.repository.AdoptionRepository;
import pi.shelterservice.repository.AnimalRepository;
import pi.shelterservice.repository.UserRepository;
import pi.shelterservice.service.AdoptionService;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

        if(adoptionDTO.getDateTime().isBefore(LocalDate.now())){
            throw new InvalidDateException();
        }
        UserEntity user = findUser(adoptionDTO.getUsername());
        AnimalEntity animalEntity = findAnimal(adoptionDTO.getAnimalName());

        AdoptionEntity adoptionEntity = AdoptionEntity.builder()
                .dateTime(adoptionDTO.getDateTime())
                .user(user)
                .animal(animalEntity)
                .adoptionStatus(AdoptionStatus.PENDING)
                .build();
        boolean userAlreadySendAdoptionForAnimal = adoptionRepository.findAllByUser(user).stream()
                .anyMatch(adoptionEntity1 -> adoptionEntity1.getAnimal().equals(animalEntity));
        if(userAlreadySendAdoptionForAnimal){
            throw new AdoptionAlreadyExistsException(adoptionDTO);
        }
        adoptionRepository.save(adoptionEntity);
        return adoptionDTO;
    }

    @Override
    public void acceptAdoption(AdoptionDTO adoptionDTO) {
        UserEntity user = findUser(adoptionDTO.getUsername());
        AnimalEntity animalEntity = findAnimal(adoptionDTO.getAnimalName());
        AdoptionEntity adoption = getAdoptionEntity(adoptionDTO, user, animalEntity);

        AdoptionEntity adoptionEntity = AdoptionEntity.builder()
                .id(adoption.getId())
                .dateTime(adoption.getDateTime())
                .user(user)
                .animal(animalEntity)
                .adoptionStatus(AdoptionStatus.ACCEPTED)
                .build();
        animalEntity.setAdoptionStatus(AnimalStatus.ADOPTED);
        List<AdoptionEntity> adoptionsListForAnimal = adoptionRepository.findAllByAnimal(animalEntity)
                .stream()
                .peek(adoptionEntity1 -> adoptionEntity1.setAdoptionStatus(AdoptionStatus.DECLINED))
                .toList();
        adoptionRepository.saveAll(adoptionsListForAnimal);
        adoptionRepository.save(adoptionEntity);
        animalRepository.save(animalEntity);
    }

    @Override
    public void deleteAdoption(AdoptionDTO adoptionDTO) {
        UserEntity user = findUser(adoptionDTO.getUsername());
        AnimalEntity animalEntity = findAnimal(adoptionDTO.getAnimalName());
        AdoptionEntity adoption = getAdoptionEntity(adoptionDTO, user, animalEntity);
        if (adoption.getAdoptionStatus().equals(AdoptionStatus.ACCEPTED)) {
            adoptionRepository.saveAll(adoptionRepository.findAllByAnimal(animalEntity).stream()
                    .peek((adoptionEntity -> adoptionEntity.setAdoptionStatus(AdoptionStatus.PENDING))).toList());
            animalEntity.setAdoptionStatus(AnimalStatus.NOT_ADOPTED);
            animalRepository.save(animalEntity);
        }
        adoptionRepository.delete(adoption);

    }

    @Override
    public List<AdoptionViewDTO> getAllAdoptions() {
        return adoptionRepository.findAll().stream()
                .map(adoptionEntity -> AdoptionViewDTO.builder()
                        .username(adoptionEntity.getUser().getUsername())
                        .phoneNumber(adoptionEntity.getUser().getPhoneNumber())
                        .adoptionStatus(adoptionEntity.getAdoptionStatus())
                        .animalName(adoptionEntity.getAnimal().getAnimalName())
                        .dateTime(adoptionEntity.getDateTime())
                        .firstName(adoptionEntity.getUser().getFirstName())
                        .lastName(adoptionEntity.getUser().getLastName())
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public List<UserAdoptionDTO> getAllAdoptionsForUser(String username) {
        UserEntity user = findUser(username);
        return adoptionRepository
                .findAllByUser(user)
                .stream()
                .map(adoptionEntity -> UserAdoptionDTO.builder()
                        .animalName(adoptionEntity.getAnimal().getAnimalName())
                        .adoptionStatus(adoptionEntity.getAdoptionStatus())
                        .photoIconPath(adoptionEntity.getAnimal().getPhotoIconPath())
                        .dateTime(adoptionEntity.getDateTime())
                        .build())
                .toList();
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

    private AdoptionEntity getAdoptionEntity(AdoptionDTO adoptionDTO, UserEntity user, AnimalEntity animalEntity) {
        return adoptionRepository
                .findAllByUser(user)
                .stream()
                .filter(adoptionEntity -> adoptionEntity.getAnimal().equals(animalEntity) &&
                        adoptionEntity.getDateTime().equals(adoptionDTO.getDateTime()))
                .findFirst().orElseThrow(() -> new AdoptionNotFoundException(adoptionDTO));
    }
}
