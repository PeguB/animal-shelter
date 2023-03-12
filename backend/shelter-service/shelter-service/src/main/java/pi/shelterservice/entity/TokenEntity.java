package pi.shelterservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "token")
public class TokenEntity {

    @Id
    @Column(unique = true)
    private String token;

    @OneToOne(mappedBy = "token")
    private UserEntity userEntity;


    private boolean expired;
}
