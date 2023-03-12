package pi.shelterservice.web;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1")
public class TestController {

    @GetMapping("/admin")
    public ResponseEntity test(){
        return new ResponseEntity("admin",HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity test1(){
        return new ResponseEntity("user",HttpStatus.OK);
    }
}
