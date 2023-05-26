package pi.shelterservice.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RefreshTokenResponse {

    private String refreshToken;
}
