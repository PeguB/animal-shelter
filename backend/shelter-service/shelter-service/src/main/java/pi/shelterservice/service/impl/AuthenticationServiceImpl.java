package pi.shelterservice.service.impl;


import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pi.shelterservice.entity.Role;
import pi.shelterservice.entity.UserEntity;
import pi.shelterservice.error.EmailAlreadyExist;
import pi.shelterservice.error.PhoneNumberAlreadyExist;
import pi.shelterservice.error.UserAlreadyExist;
import pi.shelterservice.model.AuthenticationResponse;
import pi.shelterservice.model.AuthenticationRequest;
import pi.shelterservice.model.RegisterRequest;
import pi.shelterservice.repository.UserRepository;
import pi.shelterservice.service.AuthenticationService;
import pi.shelterservice.service.JwtService;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public void register(RegisterRequest request){
        var user = UserEntity.builder()
                .username(request.username())
                .password(passwordEncoder.encode(request.password()))
                .role(Role.USER)
                .email(request.email())
                .lastName(request.lastName())
                .firstName(request.firstName())
                .phoneNumber(request.phoneNumber())
                .build();
        searchUser(request);
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

    private void searchUser(RegisterRequest request){
        userRepository.findByUsername(request.username()).ifPresent(s -> {
            throw new UserAlreadyExist("This username is already taken");
        });

        userRepository.findByEmail(request.email()).ifPresent(s->{
            throw new EmailAlreadyExist("This email is already in use");
        });

        userRepository.findByPhoneNumber(request.phoneNumber()).ifPresent(s->{
            throw new PhoneNumberAlreadyExist("This phone number is already in use");
        });


    }
}
