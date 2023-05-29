package pi.shelterservice.error;

public class InvalidDateException extends RuntimeException{
    public InvalidDateException(){
        super("This date is in the past. Please chose another day");
    }
}
