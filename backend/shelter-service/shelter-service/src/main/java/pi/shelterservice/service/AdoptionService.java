package pi.shelterservice.service;

import pi.shelterservice.model.AdoptionDTO;
import pi.shelterservice.model.AdoptionViewDTO;

import java.util.List;

public interface AdoptionService {

    AdoptionDTO sendAdoption(AdoptionDTO adoptionDTO);
    void acceptAdoption(AdoptionDTO adoptionChangerDTO);
    void deleteAdoption(AdoptionDTO adoptionChangerDTO);
    List<AdoptionViewDTO> getAllAdoptions();
}
