package pi.shelterservice.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pi.shelterservice.entity.enums.AdoptionStatus;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class AdoptionViewDTO {
    private String username;
    private String lastName;
    private String firstName;
    private String animalName;
    private String phoneNumber;
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private LocalDate dateTime;
    @Enumerated(EnumType.STRING)
    private AdoptionStatus adoptionStatus;

}
