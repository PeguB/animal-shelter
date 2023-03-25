package pi.shelterservice.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pi.shelterservice.entity.AnimalEntity;
import pi.shelterservice.repository.AnimalRepository;
import pi.shelterservice.service.AnimalService;

import java.util.List;

@Service
public class AnimalServiceImpl implements AnimalService {

    private AnimalRepository animalRepository;

    @Autowired
    public AnimalServiceImpl(AnimalRepository animalRepository){
        this.animalRepository = animalRepository;
    }

    public List<AnimalEntity> findAllAnimals(){
        return animalRepository.findAll();
    }
    public void save(AnimalEntity entity){
        animalRepository.save(entity);
    }
}
