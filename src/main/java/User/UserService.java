
package User;

import Models.User;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void createUser(User user) {
        userRepository.createUser(user);
    }

    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByEmail(username);
    }

    public Optional<User> updateUser(Integer id, User userDetails) {
        return userRepository.updateUser(id, userDetails);
    }

    public boolean deleteUser(Integer id) {
        return userRepository.deleteUser(id);
    }
}
