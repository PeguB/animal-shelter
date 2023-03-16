package pi.shelterservice.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pi.shelterservice.entity.AnimalEntity;
import pi.shelterservice.entity.AnimalType;
import pi.shelterservice.service.AnimalService;

@RestController
@RequestMapping("/v1")
public class TestController {

    private AnimalService animalService;

    @Autowired
    public TestController(AnimalService animalService){
        this.animalService = animalService;
    }
    @GetMapping("/admin")
    public ResponseEntity test() {
        return new ResponseEntity("admin", HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity test1() {
        AnimalEntity entity = AnimalEntity.builder()
                .animal_name("sisi")
                .animalType(AnimalType.DOG)
                .build();
        animalService.save(entity);
        return new ResponseEntity(animalService.findAllAnimals(), HttpStatus.OK);
    }
}
