package pi.shelterservice.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;


@Data
@NoArgsConstructor
public class AdoptionDTO {

 private String username;

 private String animalName;

 @JsonFormat(shape = JsonFormat.Shape.STRING)
 private LocalDate dateTime;

}
