package pi.shelterservice.error;

import pi.shelterservice.model.AdoptionDTO;

public class AdoptionAlreadyExistsException extends RuntimeException{
    public AdoptionAlreadyExistsException(AdoptionDTO adoptionDTO){
        super(String.format("You have already submitted an adoption for %s.", adoptionDTO.getAnimalName()));
    }
}
