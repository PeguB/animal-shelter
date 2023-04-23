package pi.shelterservice.model.converter;

import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;
import pi.shelterservice.entity.AnimalEntity;
import pi.shelterservice.model.AnimalDTO;

import java.util.List;

@Mapper(componentModel = "spring",nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface MapStructMapper {
    List<AnimalDTO> animalEntityListToAnimalDTOList(List<AnimalEntity> animals);
    AnimalDTO animalEntityToAnimalDTO(AnimalEntity animals);
    AnimalEntity animalDtoToAnimalEntity(AnimalDTO animals);
}
