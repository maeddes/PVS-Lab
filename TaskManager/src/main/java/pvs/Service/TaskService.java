package pvs.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.chrono.ChronoLocalDate;
import java.time.temporal.ChronoField;
import java.time.temporal.WeekFields;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
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

	public List<TaskEntity> getTasksSortedByPriority() {
		return taskRepo.findAll(Sort.by("timeslot").descending());
	}

	public List<TaskEntity> getTasksSortedByDate() {
		return taskRepo.findAll(Sort.by("datum").ascending());
	}




	/*public List<TaskEntity> getWeeklyTasksByDate(String date) {
		LocalDate d = LocalDate.parse(date);
		int weekNumber = d.get(ChronoField.ALIGNED_WEEK_OF_YEAR);
		LocalDate mondayOfWeek = d.with(WeekFields.ISO.dayOfWeek(DayOfWeek.MONDAY));
		System.out.println(weekNumber);
		return taskRepo.findAll(Sort.by("datum").descending());
	}*/
	
	
	

}
