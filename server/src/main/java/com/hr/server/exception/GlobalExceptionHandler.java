package com.hr.server.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ControllerAdvice;

@ControllerAdvice  // This annotation allows this class to handle exceptions globally across controllers
public class GlobalExceptionHandler {

    // Handle ResourceNotFoundException
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<CustomErrorResponse> handleResourceNotFound(ResourceNotFoundException ex) {
        CustomErrorResponse error = new CustomErrorResponse(ex.getMessage(), "Resource not found", HttpStatus.NOT_FOUND.value());
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    // Handle UnauthorizedAccessException
    @ExceptionHandler(UnauthorizedAccessException.class)
    public ResponseEntity<CustomErrorResponse> handleUnauthorizedAccess(UnauthorizedAccessException ex) {
        CustomErrorResponse error = new CustomErrorResponse(ex.getMessage(), "Unauthorized access", HttpStatus.UNAUTHORIZED.value());
        return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
    }

    // Generic error handler (for any unhandled exceptions)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<CustomErrorResponse> handleGeneralException(Exception ex) {
        CustomErrorResponse error = new CustomErrorResponse("An error occurred", ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value());
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
