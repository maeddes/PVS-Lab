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
        TaskEntity taskObj=new TaskEntity();
		
		taskObj.setDatum(task.getDate());
		taskObj.setDescription(task.getDescription());
		taskObj.setName(task.getName());
		taskObj.setTimeslot(task.getTimeslot());
		
		taskRepo.save(taskObj);
	}

	public void updateTask(TaskDTO task) {
		TaskEntity oldTask=taskRepo.getByTimeAndDate(task.getTimeslot(), task.getDate());
		oldTask.setDatum(task.getDate());
		oldTask.setDescription(task.getDescription());
		oldTask.setName(task.getName());
		oldTask.setTimeslot(task.getTimeslot());
		
		taskRepo.save(oldTask);
	}

	public void deleteTask(TaskDTO task) {
		TaskEntity deletedTask=taskRepo.getByTimeAndDate(task.getTimeslot(), task.getDate());	
		taskRepo.delete(deletedTask);
	}
	public void deleteTaskById(Long id) {
		TaskEntity taskToDel=taskRepo.getReferenceById(id);
		taskRepo.delete(taskToDel);
	}

	public List<TaskEntity> getTasks() {
		return taskRepo.findAll();
	}
	
	
	

}
