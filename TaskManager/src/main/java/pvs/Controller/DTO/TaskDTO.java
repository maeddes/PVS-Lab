package pvs.Controller.DTO;

import java.time.LocalDate;

import lombok.Data;

@Data
public class TaskDTO {
	private Long id;
	private String name;
	private LocalDate date;
	private int timeslot;
	private String description;
}
