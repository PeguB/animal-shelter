package pi.shelterservice.error;

public class AnimalNameAlreadyExist extends RuntimeException{
    public AnimalNameAlreadyExist(String name){
        super(String.format("Animal with name %s already exists",name));
    }
}
