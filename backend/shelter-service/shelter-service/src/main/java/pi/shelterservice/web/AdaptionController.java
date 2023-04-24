package pi.shelterservice.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pi.shelterservice.model.AnimalDTO;
import pi.shelterservice.service.AnimalService;

import java.util.List;

@RestController
@RequestMapping(value = "/adoption")
public class AdaptionController {

    private final AnimalService animalService;

    public AdaptionController(AnimalService animalService) {
        this.animalService = animalService;
    }

    @PostMapping("/send")
    public ResponseEntity<List<AnimalDTO>> sendAdoption(){
        return new ResponseEntity<>(animalService.findAllAnimals(), HttpStatus.OK);
    }
}
