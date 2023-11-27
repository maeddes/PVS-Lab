package pvs.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pvs.Entity.TaskEntity;

@Repository
public interface TaskRepository extends JpaRepository<TaskEntity, Long>{

}
