package pi.shelterservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pi.shelterservice.entity.AnimalEntity;
import pi.shelterservice.model.AnimalDTO;

import java.util.List;

@Repository
public interface AnimalRepository extends JpaRepository<AnimalEntity,Integer> {

}
