package pi.shelterservice.error;

public class UserAlreadyExist extends RuntimeException{

    public UserAlreadyExist(String message){
        super(message);
    }


}
