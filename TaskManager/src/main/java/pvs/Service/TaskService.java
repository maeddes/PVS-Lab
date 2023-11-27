package pvs.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import pvs.Controller.DTO.TaskDTO;
import pvs.Entity.TaskEntity;
import pvs.Repository.TaskRepository;

@Transactional
@Service
public class TaskService {
	private TaskRepository taskRepo;
	
	@Autowired
	public void setTaskService(TaskRepository taskRepository) {
		this.taskRepo=taskRepository;
	}

	public void createTask(TaskDTO task) {
		taskRepo.save(null)
		
	}

	public void updateTask(TaskDTO task) {
		// TODO Auto-generated method stub
		
	}

	public void deleteTask(TaskDTO task) {
		// TODO Auto-generated method stub
		
	}

	public List<TaskEntity> getTasks() {
		// TODO Auto-generated method stub
		return null;
	}
	
	
	

}
