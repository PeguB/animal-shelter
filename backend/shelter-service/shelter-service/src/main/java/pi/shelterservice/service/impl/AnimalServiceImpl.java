package pi.shelterservice.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.ConversionService;
import org.springframework.stereotype.Service;
import pi.shelterservice.entity.AnimalEntity;
import pi.shelterservice.model.AnimalDTO;
import pi.shelterservice.model.converter.MapStructMapper;
import pi.shelterservice.repository.AnimalRepository;
import pi.shelterservice.service.AnimalService;

import java.util.List;

@Service
public class AnimalServiceImpl implements AnimalService {

    private final AnimalRepository animalRepository;
    private final MapStructMapper mapStructMapper;

    public AnimalServiceImpl(AnimalRepository animalRepository, MapStructMapper mapStructMapper){
        this.animalRepository = animalRepository;
        this.mapStructMapper = mapStructMapper;
    }

    public List<AnimalDTO> findAllAnimals(){
        return mapStructMapper.animalEntityListToAnimalDTOList(animalRepository.findAll());
    }
    public AnimalDTO save(AnimalDTO animalDTO){
      AnimalEntity animalEntity = mapStructMapper.animalDtoToAnimalEntity(animalDTO);
      return mapStructMapper.animalEntityToAnimalDTO(animalRepository.save(animalEntity));
    }
}
