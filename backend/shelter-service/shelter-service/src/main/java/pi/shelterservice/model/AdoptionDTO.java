package pi.shelterservice.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class AdoptionDTO {

    private String username;

    private String animalName;

    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private LocalDate dateTime;

}
