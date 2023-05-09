package pi.shelterservice.error;

public class AnimalNameDoNotExistException extends RuntimeException {
    public AnimalNameDoNotExistException(String name) {
        super(String.format("An animal with this name do not exist: %s", name));
    }
}