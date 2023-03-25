package pi.shelterservice.service;

import org.springframework.stereotype.Service;
import pi.shelterservice.entity.AnimalEntity;

import java.util.List;

public interface AnimalService {
     List<AnimalEntity> findAllAnimals();
    void save(AnimalEntity entity);
}
