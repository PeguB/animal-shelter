package pi.shelterservice.error;

public class EmailAlreadyExist extends RuntimeException{

    public EmailAlreadyExist(String message){
        super(message);
    }


}
