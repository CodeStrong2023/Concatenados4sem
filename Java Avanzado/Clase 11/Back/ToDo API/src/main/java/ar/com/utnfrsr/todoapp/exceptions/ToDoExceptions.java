package ar.com.utnfrsr.todoapp.exceptions;

import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
public class ToDoExceptions extends RuntimeException {

    private String message;
    private HttpStatus httpStatus; //Para obtener el estado http

    public ToDoExceptions(String message, HttpStatus httpStatus) { //Sobreescribimos el método runtimeexeption
        super(message);
        this.message = message;
        this.httpStatus = httpStatus;
    }
}