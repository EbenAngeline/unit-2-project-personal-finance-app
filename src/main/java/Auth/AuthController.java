package Auth;

import Models.User;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public ResponseEntity<LoginResponse> signup(@Valid @RequestBody SignupRequest request) {
        Optional<User> user = authService.signup(
                request.email(), request.password());

        if (user.isEmpty()) {
            return ResponseEntity.status(409)
                    .body(new LoginResponse("Email is already registered.", null));
        }

        return ResponseEntity.status(201)
                .body(new LoginResponse("Signup successful.", user.get().getId()));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        Optional<User> user = authService.authenticate(request.email(), request.password());

        if (user.isEmpty()) {
            return ResponseEntity.status(401)
                    .body(new LoginResponse("Invalid email or password.", null));
        }

        return ResponseEntity.ok(
                new LoginResponse("Login successful.", user.get().getId()));
    }
}
