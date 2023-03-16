package pi.shelterservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pi.shelterservice.entity.AnimalEntity;
import pi.shelterservice.repository.AnimalRepository;

import java.util.List;

@Service
public class AnimalService {

    private AnimalRepository animalRepository;

    @Autowired
    public AnimalService(AnimalRepository animalRepository){
        this.animalRepository = animalRepository;
    }

    public List<AnimalEntity> findAllAnimals(){
        return animalRepository.findAll();
    }
    public void save(AnimalEntity entity){
        animalRepository.save(entity);
    }
}
