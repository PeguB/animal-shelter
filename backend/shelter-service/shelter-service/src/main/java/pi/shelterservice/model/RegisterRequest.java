package pi.shelterservice.model;

import lombok.Builder;

@Builder
public record RegisterRequest(
        String username,
        String password,
        String lastName,
        String firstName,
        String phoneNumber,
        String email
) {
}
