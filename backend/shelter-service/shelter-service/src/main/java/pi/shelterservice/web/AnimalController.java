package pi.shelterservice.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pi.shelterservice.entity.AnimalEntity;
import pi.shelterservice.entity.AnimalType;
import pi.shelterservice.model.AnimalDTO;
import pi.shelterservice.service.AnimalService;

import javax.swing.text.html.HTML;
import java.util.List;

@RestController
@RequestMapping(value = "/animal")
public class AnimalController {

    private final AnimalService animalService;

    @Autowired
    public AnimalController(AnimalService animalService){
        this.animalService = animalService;
    }

    @GetMapping("/findAll")
    public ResponseEntity<List<AnimalDTO>> findAllAnimals(){
        return new ResponseEntity<>(animalService.findAllAnimals(), HttpStatus.OK);
    }

    @PostMapping(value = "/save")
    public ResponseEntity<AnimalDTO> saveAnimal(@RequestBody AnimalDTO animalDTO){
        return new ResponseEntity<>(animalService.save(animalDTO),HttpStatus.OK);
    }
}
