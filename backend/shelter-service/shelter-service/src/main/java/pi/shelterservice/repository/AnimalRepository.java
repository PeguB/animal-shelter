package pi.shelterservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pi.shelterservice.entity.AnimalEntity;

import java.util.Optional;

@Repository
public interface AnimalRepository extends JpaRepository<AnimalEntity,Integer> {
    boolean existsByAnimalName(String name);
    void deleteByAnimalName(String name);
    Optional<AnimalEntity> findByAnimalName(String name);
}
