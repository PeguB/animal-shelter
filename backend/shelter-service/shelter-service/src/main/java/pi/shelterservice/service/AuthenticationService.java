package pi.shelterservice.service;

import pi.shelterservice.model.AuthenticationRequest;
import pi.shelterservice.model.AuthenticationResponse;
import pi.shelterservice.model.RegisterRequest;

public interface AuthenticationService {

    void register(RegisterRequest request);
    AuthenticationResponse authenticate(AuthenticationRequest request);
}
