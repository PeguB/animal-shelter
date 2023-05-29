package pi.shelterservice.error;

import com.fasterxml.jackson.databind.exc.InvalidFormatException;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class ExceptionHandlerControllerAdvice extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = {UserAlreadyExist.class, PhoneNumberAlreadyExist.class, EmailAlreadyExist.class})
    public ErrorResponse handleUserAlreadyExist(Exception ex, WebRequest request){
        return ErrorResponse.builder(ex,HttpStatus.CONFLICT,"")
                .detail(ex.getMessage())
                .property("errorType",ex.getMessage().split(" ")[0])
                .build();
    }

    @ExceptionHandler(value = {AuthenticationException.class})
    public ErrorResponse handleInvalidCredentials(Exception ex, WebRequest request){
        return ErrorResponse.builder(ex,HttpStatus.FORBIDDEN,"")
                .detail(ex.getMessage())
                .property("errorType", "Invalid")
                .build();
    }

    @ExceptionHandler(value = {ConstraintViolationException.class, InvalidFormatException.class})
    public ErrorResponse handleBadRequestForIncorrectFormat(RuntimeException ex, WebRequest request){
        return ErrorResponse.create(ex,HttpStatus.BAD_REQUEST,"Incorect format");
    }

    @ExceptionHandler(value = {AnimalNameAlreadyExist.class})
    public ErrorResponse handleAnimalAlreadyExist(Exception ex, WebRequest request){
        return ErrorResponse.builder(ex,HttpStatus.CONFLICT,"")
                .detail(ex.getMessage())
                .build();
    }

    @ExceptionHandler(value = {LimitReachedForAdoptionException.class,UsernameDoNotExistException.class,AnimalNameDoNotExistException.class,AdoptionAlreadyExistsException.class, InvalidDateException.class})
    public ErrorResponse handleBadRequestForIncorrectAdoption(RuntimeException ex, WebRequest request){
        return ErrorResponse.create(ex,HttpStatus.BAD_REQUEST,ex.getMessage());
    }

    @ExceptionHandler(value = {AdoptionNotFoundException.class})
    public ErrorResponse handleAdoptionNotFound(Exception ex, WebRequest request){
        return ErrorResponse.builder(ex,HttpStatus.NOT_FOUND,ex.getMessage())
                .detail(ex.getMessage())
                .build();
    }
}
