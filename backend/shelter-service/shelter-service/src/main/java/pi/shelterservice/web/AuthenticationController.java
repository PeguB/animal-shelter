package pi.shelterservice.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pi.shelterservice.model.AuthenticationResponse;
import pi.shelterservice.model.AuthenticationRequest;
import pi.shelterservice.service.AuthenticationService;

@RestController
@RequestMapping("/v1/auth")
public class AuthenticationController {


    private final AuthenticationService service;

    @Autowired
    public AuthenticationController(AuthenticationService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public ResponseEntity<Void> register(
            @RequestBody AuthenticationRequest request
    ) {
        service.register(request);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticate(request));
    }
}
