package pi.shelterservice.service.impl;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.hibernate.validator.constraints.EAN;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import pi.shelterservice.entity.AdoptionEntity;
import pi.shelterservice.entity.AnimalEntity;
import pi.shelterservice.entity.UserEntity;
import pi.shelterservice.error.AdoptionAlreadyExistsException;
import pi.shelterservice.model.AdoptionDTO;
import pi.shelterservice.repository.AdoptionRepository;
import pi.shelterservice.repository.AnimalRepository;
import pi.shelterservice.repository.UserRepository;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;
import static pi.shelterservice.utils.AdoptionsUtil.createValidAdoptionDTO;
import static pi.shelterservice.utils.AdoptionsUtil.createValidAdoptionEntity;
import static pi.shelterservice.utils.AnimalsUtil.createAnimalEntity;
import static pi.shelterservice.utils.UsersUtil.createUserEntity;

@ExtendWith(SpringExtension.class)
@SpringBootTest
class AdoptionServiceImplTest {

    public static final String USERNAME = "test_adoption";
    public static final String ANIMAL_NAME = "animal_test_adoption";
    @Autowired
    private AdoptionServiceImpl adoptionService;
    @MockBean
    private UserRepository userRepository;
    @MockBean
    private AnimalRepository animalRepository;
    @MockBean
    private AdoptionRepository adoptionRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void setup() {
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        objectMapper.registerModule(new JavaTimeModule());
    }

    @Test
    void sendAdoption_returnAdoptionDTO() {
        UserEntity user = createUserEntity(USERNAME);
        AdoptionDTO adoptionDTO = createValidAdoptionDTO(ANIMAL_NAME,USERNAME);
        AnimalEntity animalEntity = createAnimalEntity(ANIMAL_NAME);
        AdoptionEntity adoptionEntity = createValidAdoptionEntity(animalEntity,user);

        when(userRepository.findByUsername(USERNAME)).thenReturn(Optional.ofNullable(user));
        when(adoptionRepository.findAllByUser(user)).thenReturn(List.of());
        when(animalRepository.findByAnimalName(animalEntity.getAnimalName())).thenReturn(Optional.of(animalEntity));

        assertEquals(adoptionDTO,adoptionService.sendAdoption(adoptionDTO));
    }

    @Test
    void sendAdoption_throwAdoptionAlreadyExistsException(){
        UserEntity user = createUserEntity(USERNAME);
        AdoptionDTO adoptionDTO = createValidAdoptionDTO(ANIMAL_NAME,USERNAME);
        AnimalEntity animalEntity = createAnimalEntity(ANIMAL_NAME);
        AdoptionEntity adoptionEntity = createValidAdoptionEntity(animalEntity,user);

        when(userRepository.findByUsername(USERNAME)).thenReturn(Optional.ofNullable(user));
        when(adoptionRepository.findAllByUser(user)).thenReturn(List.of(adoptionEntity));
        when(animalRepository.findByAnimalName(animalEntity.getAnimalName())).thenReturn(Optional.of(animalEntity));

        assertThrows(AdoptionAlreadyExistsException.class,()->adoptionService.sendAdoption(adoptionDTO));
    }

    @Test
    void acceptAdoption() {
    }

    @Test
    void deleteAdoption() {
    }


}