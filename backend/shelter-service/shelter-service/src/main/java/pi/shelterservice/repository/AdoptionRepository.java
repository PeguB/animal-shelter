package pi.shelterservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pi.shelterservice.entity.AdoptionEntity;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AdoptionRepository extends JpaRepository<AdoptionEntity, Integer> {
    List<AdoptionEntity> findByDateTime(LocalDate localDateTime);
    List<AdoptionEntity> findAllByIdUser(Integer idUser);
}
