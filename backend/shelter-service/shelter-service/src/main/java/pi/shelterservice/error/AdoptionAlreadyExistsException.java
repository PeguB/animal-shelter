package pi.shelterservice.error;

import pi.shelterservice.model.AdoptionDTO;

public class AdoptionAlreadyExistsException extends RuntimeException{
    public AdoptionAlreadyExistsException(AdoptionDTO adoptionDTO){
        super(String.format("Adoption for %s by %s already exists",adoptionDTO.getAnimalName(),adoptionDTO.getUsername()));
    }
}
