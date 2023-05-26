package pi.shelterservice.service.impl;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import pi.shelterservice.entity.AnimalEntity;
import pi.shelterservice.entity.enums.AnimalStatus;
import pi.shelterservice.error.AnimalNameAlreadyExist;
import pi.shelterservice.model.AnimalDTO;
import pi.shelterservice.repository.AnimalRepository;
import pi.shelterservice.service.AnimalService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AnimalServiceImpl implements AnimalService {

    private final AnimalRepository animalRepository;
    private final ObjectMapper objectMapper;
    public AnimalServiceImpl(AnimalRepository animalRepository, ObjectMapper objectMapper){
        this.animalRepository = animalRepository;
        this.objectMapper = objectMapper;
    }

    public List<AnimalDTO> findAllAnimals(){
        return objectMapper.convertValue(animalRepository.findAll().stream()
                .filter(animal->animal.getAdoptionStatus().equals(AnimalStatus.NOT_ADOPTED))
                .collect(Collectors.toList()), new TypeReference<List<AnimalDTO>>(){});
    }
    public AnimalDTO save(AnimalDTO animalDTO){
        if(animalRepository.existsByAnimalName(animalDTO.getAnimalName())){
            throw new AnimalNameAlreadyExist(animalDTO.getAnimalName());
        }
      AnimalEntity animalEntity = objectMapper.convertValue(animalDTO, AnimalEntity.class);
      return objectMapper.convertValue(animalRepository.save(animalEntity), AnimalDTO.class);
    }
}
