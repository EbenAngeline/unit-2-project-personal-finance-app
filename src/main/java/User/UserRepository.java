
package User;


import Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);

    default void createUser(User user) {
        save(user);
    }

    default Optional<User> updateUser(Integer id, User userDetails) {
        Optional<User> existingUser = findById(id);

        if (existingUser.isEmpty()) {
            return Optional.empty();
        }

        User user = existingUser.get();
        if (userDetails.getEmail() != null) {
            user.setEmail(userDetails.getEmail());
        }
        if (userDetails.getPasswordHash() != null) {
            user.setPasswordHash(userDetails.getPasswordHash());
        }

        return Optional.of(save(user));
    }

    default boolean deleteUser(Integer id) {
        boolean userExists = existsById(id);

        if (!userExists) {
            return false;
        }

        deleteById(id);
        return true;
    }
}

