package pi.shelterservice.service;

import pi.shelterservice.model.*;

public interface AuthenticationService {

    void register(RegisterRequest request);
    AuthenticationResponse authenticate(AuthenticationRequest request);
    RefreshTokenResponse refreshToken(RefreshTokenRequest request);
}
