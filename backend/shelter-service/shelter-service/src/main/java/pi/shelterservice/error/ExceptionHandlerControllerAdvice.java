package pi.shelterservice.error;

import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.net.URI;

@ControllerAdvice
public class ExceptionHandlerControllerAdvice extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = {UserAlreadyExist.class, PhoneNumberAlreadyExist.class, EmailAlreadyExist.class})
    public ErrorResponse handleUserAlreadyExist(Exception ex, WebRequest request){
        return ErrorResponse.builder(ex,HttpStatus.CONFLICT,"")
                .detail(ex.getMessage())
                .property("errorType",ex.getMessage().split(" ")[0])
                .build();
    }

    @ExceptionHandler(value = ConstraintViolationException.class)
    public ErrorResponse handleBadRequestForIncorrectFormat(RuntimeException ex, WebRequest request){
        return ErrorResponse.create(ex,HttpStatus.BAD_REQUEST,"Incorect format");
    }

}
