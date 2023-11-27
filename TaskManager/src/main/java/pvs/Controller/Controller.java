package pvs.Controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pvs.Controller.DTO.TaskDTO;
import pvs.Entity.TaskEntity;
import pvs.Service.TaskService;

@RestController
@RequestMapping("/task")
public class Controller {
	
	private final TaskService taskService;
	
	public Controller(TaskService taskService) {
		this.taskService=taskService;
	}
	
	@PutMapping("/create")
	public void createTask(@RequestBody TaskDTO task) {
		taskService.createTask(task);
	}
	
	@PutMapping("/update")
	public void updateTask(@RequestBody TaskDTO task) {
		taskService.updateTask(task);
	}
	
	@GetMapping("/getAll")
	public ResponseEntity<TaskEntity> getTasks(){
		return ResponseEntity.ok(this.taskService.getTasks());
	}
	
	@DeleteMapping("/del")
	public void deleteTask(@RequestBody TaskDTO task) {
		taskService.deleteTask(task);
	}
	
	

}
