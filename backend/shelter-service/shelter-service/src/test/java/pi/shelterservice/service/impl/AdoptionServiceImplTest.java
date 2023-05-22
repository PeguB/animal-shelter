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
import pi.shelterservice.repository.AdoptionRepository;
import pi.shelterservice.repository.AnimalRepository;
import pi.shelterservice.repository.UserRepository;

@ExtendWith(SpringExtension.class)
@SpringBootTest
class AdoptionServiceImplTest {

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
    void sendAdoption() {
    }

    @Test
    void acceptAdoption() {
    }

    @Test
    void deleteAdoption() {
    }


}