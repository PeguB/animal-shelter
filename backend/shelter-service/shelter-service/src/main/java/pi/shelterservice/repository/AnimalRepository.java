package pi.shelterservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pi.shelterservice.entity.AnimalEntity;

import java.util.List;

@Repository
public interface AnimalRepository extends JpaRepository<AnimalEntity,Integer> {

}
