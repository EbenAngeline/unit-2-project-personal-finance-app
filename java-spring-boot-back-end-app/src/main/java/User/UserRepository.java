package User;

import Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    @Query("SELECT u FROM User u WHERE LOWER(u.email) = LOWER(:email)")
    Optional<User> findByEmailIgnoreCase(
            @Param("email") String email);

    default Optional<User> findByEmail(String email) {

        if (email == null) {
            return Optional.empty();
        }

        return findByEmailIgnoreCase(email.trim());
    }

    default User createUserAndReturn(User user) {
        return saveAndFlush(user);
    }

    default void createUser(User user) {
        saveAndFlush(user);
    }

    default Optional<User> updateUser(
            Integer id,
            User userDetails) {

        Optional<User> existingUser =
                findById(id);

        if (existingUser.isEmpty()) {
            return Optional.empty();
        }

        User user = existingUser.get();

        if (userDetails.getEmail() != null
                && !userDetails.getEmail().trim().isEmpty()) {

            user.setEmail(
                    userDetails.getEmail().trim()
            );
        }

        if (userDetails.getPasswordHash() != null
                && !userDetails.getPasswordHash().isEmpty()) {

            user.setPasswordHash(
                    userDetails.getPasswordHash()
            );
        }

        return Optional.of(saveAndFlush(user));
    }

    default boolean deleteUser(Integer id) {

        if (!existsById(id)) {
            return false;
        }

        deleteById(id);
        return true;
    }
}