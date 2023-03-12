package pi.shelterservice.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pi.shelterservice.entity.TokenEntity;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TokenRepository extends JpaRepository<TokenEntity, Integer> {

    @Query(value = """
      select t from TokenEntity t left join UserEntity u\s
      on t.token = u.token\s
      where :username = u.username and (t.expired = false)\s
      """)
    Optional<TokenEntity> findTokenEntityByUsername(String username);

    @Modifying
    @Transactional
    @Query(value = """
update token t right join users_entity u on (t.token = u.token_id)\s
 set t.expired = true \s
 where u.username =  :username\s
""", nativeQuery = true)
    void updateStatusToken(@Param("username")String username);
}
