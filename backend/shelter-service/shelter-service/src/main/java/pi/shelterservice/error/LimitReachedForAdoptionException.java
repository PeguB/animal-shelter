package pi.shelterservice.error;

import java.time.LocalDate;

public class LimitReachedForAdoptionException extends RuntimeException{
    public LimitReachedForAdoptionException( LocalDate date){
        super(String.format("In %s date there are already to much appointments",date));
    }
}