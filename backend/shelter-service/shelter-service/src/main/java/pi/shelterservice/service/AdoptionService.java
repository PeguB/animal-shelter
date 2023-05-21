package pi.shelterservice.service;

import pi.shelterservice.model.AdoptionDTO;

public interface AdoptionService {

    AdoptionDTO sendAdoption(AdoptionDTO adoptionDTO);
    void acceptAdoption(AdoptionDTO adoptionChangerDTO);
    void deleteAdoption(AdoptionDTO adoptionChangerDTO);

}
