package pvs.Repository;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import pvs.Entity.TaskEntity;

@Repository
public interface TaskRepository extends JpaRepository<TaskEntity, Long>{

	@Query(value="SELECT * FROM TaskEntity t WHERE t.time=:timeslot AND t.datum=:datum", nativeQuery=true)
	TaskEntity getByTimeAndDate(int timeslot, LocalDate datum);

}
