package pi.shelterservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pi.shelterservice.entity.AnimalEntity;
import pi.shelterservice.model.AnimalDTO;

import java.util.List;
import java.util.Optional;

@Repository
public interface AnimalRepository extends JpaRepository<AnimalEntity,Integer> {
    boolean existsByAnimalName(String name);
    void deleteByAnimalName(String name);
    Optional<AnimalEntity> findByAnimalName(String name);
}
