package pi.shelterservice.error;

import pi.shelterservice.entity.UserEntity;

public class UserAlreadyExist extends RuntimeException{

    public UserAlreadyExist(String message){
        super(message);
    }


}
