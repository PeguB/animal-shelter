package pi.shelterservice.web;

import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pi.shelterservice.model.AdoptionDTO;
import pi.shelterservice.service.AdoptionService;

@RestController
@RequestMapping(value = "/adoption")
@CrossOrigin
public class AdaptionController {

    private final AdoptionService adoptionService;

    public AdaptionController(AdoptionService adoptionService) {
        this.adoptionService = adoptionService;
    }

    @PostMapping("/send")
    public ResponseEntity<AdoptionDTO> sendAdoption(@RequestBody AdoptionDTO adoptionDTO) {
        return new ResponseEntity<>(adoptionService.sendAdoption(adoptionDTO), HttpStatus.OK);
    }
}
