package User;

import Models.User;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(User user) {

        if (user == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "User payload is required."
            );
        }

        return userRepository.createUserAndReturn(user);
    }

    public User createUserAndReturn(User user) {

        if (user == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "User payload is required."
            );
        }

        return userRepository.createUserAndReturn(user);
    }

    public Optional<User> getUserByEmail(String email) {

        if (email == null || email.trim().isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Email is required."
            );
        }

        return userRepository.findByEmail(email.trim());
    }

    public User updateUser(
            Integer id,
            User userDetails) {

        if (id == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "User ID is required."
            );
        }

        if (userDetails == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "User payload is required."
            );
        }

        return userRepository
                .updateUser(id, userDetails)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "User with ID "
                                        + id
                                        + " does not exist."
                        )
                );
    }

    public void deleteUser(Integer id) {

        if (id == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "User ID is required."
            );
        }

        boolean deleted =
                userRepository.deleteUser(id);

        if (!deleted) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "User with ID "
                            + id
                            + " does not exist."
            );
        }
    }
}