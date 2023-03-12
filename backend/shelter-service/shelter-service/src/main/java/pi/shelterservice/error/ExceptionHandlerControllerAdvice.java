package pi.shelterservice.error;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class ExceptionHandlerControllerAdvice extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = UserAlreadyExist.class)
    public ResponseEntity<Object> handleUserAlreadyExist(Exception ex, WebRequest request){
        return new ResponseEntity<Object>(HttpStatus.CONFLICT);
    }
}
