package pi.shelterservice.utils;

import pi.shelterservice.entity.UserEntity;
import pi.shelterservice.entity.enums.Role;
import pi.shelterservice.model.AdoptionDTO;

import java.time.LocalDate;

public class UsersUtil {

    public static UserEntity createUserEntity(String username){
        return UserEntity.builder()
                .role(Role.USER)
                .id(3)
                .username(username)
                .build();
    }
}
