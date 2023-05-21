package pi.shelterservice.error;

import pi.shelterservice.model.AdoptionDTO;

public class AdoptionNotFoundException extends RuntimeException{
    public AdoptionNotFoundException(AdoptionDTO adoptionDTO){
        super(String.format("Adoption for username %s and pet %s in %s don't exist",adoptionDTO.getUsername(),adoptionDTO.getAnimalName(),adoptionDTO.getDateTime().toString()));
    }
}
