package pi.shelterservice.web;

import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pi.shelterservice.model.AdoptionDTO;
import pi.shelterservice.service.AdoptionService;

@RestController
@RequestMapping(value = "/adoption")
@CrossOrigin(origins = "*")
public class AdoptionController {

    private final AdoptionService adoptionService;

    public AdoptionController(AdoptionService adoptionService) {
        this.adoptionService = adoptionService;
    }

    @PostMapping("/send")
    public ResponseEntity<AdoptionDTO> sendAdoption(@RequestBody AdoptionDTO adoptionDTO) {
        return new ResponseEntity<>(adoptionService.sendAdoption(adoptionDTO), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<?> acceptAdoption(@RequestBody AdoptionDTO adoptionDTO){
        adoptionService.acceptAdoption(adoptionDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteAdoption(@RequestBody AdoptionDTO adoptionDTO){
        adoptionService.deleteAdoption(adoptionDTO);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
