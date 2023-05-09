package pi.shelterservice.error;

public class UsernameDoNotExistException extends RuntimeException {
    public UsernameDoNotExistException(String username) {
        super(String.format("A user with this username do not exist: %s", username));
    }
}