package pi.shelterservice.service;

import pi.shelterservice.model.AnimalDTO;

import java.util.List;

public interface AnimalService {
    List<AnimalDTO> findAllAnimals();

    AnimalDTO save(AnimalDTO animalDTO);
}
