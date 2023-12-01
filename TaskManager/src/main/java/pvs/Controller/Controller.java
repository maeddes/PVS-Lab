package pvs.Controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import io.opentelemetry.api.OpenTelemetry;
import io.opentelemetry.api.trace.Tracer;
import pvs.Controller.DTO.TaskDTO;
import pvs.Entity.TaskEntity;
import pvs.Service.TaskService;

@RestController
@RequestMapping("/task")
public class Controller {
	
	private final TaskService taskService;
	
	private final Logger logger=LoggerFactory.getLogger(Controller.class);              //need to decide which to use
	//private final Tracer tracer;
	
	public Controller(TaskService taskService/*, OpenTelemetry openTel*/) {
		this.taskService=taskService;
		//tracer=openTel.getTracer(Controller.class.getName(),"0.1.0");
	}
	
	
	@PutMapping("/create")
	public void createTask(@RequestBody TaskDTO task) {
		logger.info("Create task");
		taskService.createTask(task);
	}
	
	@PutMapping("/update")
	public void updateTask(@RequestBody TaskDTO task) {
		logger.info("Update task");
		taskService.updateTask(task);
	}
	
	@GetMapping("/getAll")
	public ResponseEntity<List<TaskEntity>> getTasks(){
		logger.info("Get tasks");
		return ResponseEntity.ok(this.taskService.getTasks());
	}
	
	@DeleteMapping("/del")
	public void deleteTask(@RequestBody TaskDTO task) {
		logger.info("Delete task");
		taskService.deleteTask(task);
	}
	
	

}
