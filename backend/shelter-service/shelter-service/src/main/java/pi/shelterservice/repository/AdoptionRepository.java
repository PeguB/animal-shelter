package pi.shelterservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pi.shelterservice.entity.AdoptionEntity;
import pi.shelterservice.entity.AnimalEntity;
import pi.shelterservice.entity.UserEntity;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AdoptionRepository extends JpaRepository<AdoptionEntity, Integer> {
    List<AdoptionEntity> findAllByUser(UserEntity user);
    List<AdoptionEntity> findAllByAnimal(AnimalEntity animal);
}
