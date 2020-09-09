package prello.repository;

import org.springframework.data.repository.CrudRepository;
import prello.model.User;

public interface UserRepository extends CrudRepository<User, Long> {

    User findByUsername (String username);
}
