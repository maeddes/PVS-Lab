package pvs;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.opentelemetry.sdk.trace.SdkTracerProvider;
import pvs.Controller.DTO.TaskDTO;
import pvs.Entity.TaskEntity;
import pvs.Service.TaskService;

@SpringBootApplication
public class TaskManagerApplication implements CommandLineRunner {
	@Autowired
	TaskService service;

	public static void main(String[] args) {
		SpringApplication.run(TaskManagerApplication.class, args);
		
	}

	@Override
	public void run(String... args) throws Exception {
		
		/*SdkTracerProvider sdkTracerProvider = SdkTracerProvider.builder()
				  .addSpanProcessor(spanProcessor)
				  .setResource(resource)
				  .build();
		TaskDTO task=new TaskDTO();
		task.setDate(LocalDate.now());
		task.setDescription("desc");
		task.setName("Task1");
		task.setTimeslot(1);
		
		service.createTask(task);*/
		
	}

}
