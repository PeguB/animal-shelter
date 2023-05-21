package pi.shelterservice.service.impl;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import pi.shelterservice.entity.AnimalEntity;
import pi.shelterservice.model.AnimalDTO;
import pi.shelterservice.repository.AnimalRepository;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static pi.shelterservice.utils.AnimalsUtil.createAnimalDTO;
import static pi.shelterservice.utils.AnimalsUtil.createAnimalEntity;

@ExtendWith(SpringExtension.class)
@SpringBootTest
class AnimalServiceImplTest {

    @MockBean
    private AnimalRepository animalRepository;

    @Autowired
    private  ObjectMapper objectMapper;

    @Autowired
    private AnimalServiceImpl animalService;

    @BeforeEach
    void setup(){
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        objectMapper.registerModule(new JavaTimeModule());
    }
    @Test
    void findAllAnimals_NotEmptyList_IncludesMultipleAnimalsWithDifferentStatus() {

        AnimalEntity animalEntity = createAnimalEntity();
        List<AnimalDTO> expectedList = List.of(createAnimalDTO());
        when(animalRepository.findAll()).thenReturn(List.of(animalEntity));

        assertEquals(expectedList,animalService.findAllAnimals());
    }

    @Test
    void saveAnimal_animalEntity() {
        AnimalEntity animalEntity = createAnimalEntity();
        AnimalDTO animalDTO = createAnimalDTO();
        when(animalRepository.save(any(AnimalEntity.class))).thenReturn(animalEntity);

        assertEquals(animalDTO,animalService.save(animalDTO));
    }
}