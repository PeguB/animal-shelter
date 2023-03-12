package pi.shelterservice.service;


import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pi.shelterservice.entity.Role;
import pi.shelterservice.entity.UserEntity;
import pi.shelterservice.error.UserAlreadyExist;
import pi.shelterservice.model.AuthenticationResponse;
import pi.shelterservice.model.AuthenticationRequest;
import pi.shelterservice.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public void register(AuthenticationRequest request){
        var user = UserEntity.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        userRepository.findByUsername(request.getUsername()).ifPresent(s -> {
            throw new UserAlreadyExist("User already exists");
        });


       userRepository.save(user);
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        var user = userRepository.findByUsername(request.getUsername())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

}
