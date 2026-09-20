<!-- TODO: Replace with your own banner/logo images placed in a /preview folder at the repo root -->
<!-- <img src="preview/logo.png" alt="My Personal Finance logo" width="100%" /> -->
<!-- <img src="preview/banner.png" alt="My Personal Finance dashboard banner" width="100%" /> -->

<div align="center">
  <h1>My Personal Finance: Full-Stack Web Application</h1>
  <a href="https://www.launchcode.org"><img src="https://img.shields.io/badge/for-LaunchCode_St._Louis-5C93CE?style=for-the-badge" alt="badge linking to LaunchCode's website" /></a>
  <img src="https://img.shields.io/badge/status-in_development-F0AD4E?style=for-the-badge" alt="project status badge" />
</div>

<br />

<div align="center">
  <img src="https://img.shields.io/badge/React_19-61DBFB?style=for-the-badge&logo=react&logoColor=333333" alt="React" />
  <img src="https://img.shields.io/badge/JavaScript-F0DB4F?style=for-the-badge&logo=javascript&logoColor=333333" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white" alt="React Router" />
  <img src="https://img.shields.io/badge/CSS-rebeccapurple?style=for-the-badge&logo=css&logoColor=white" alt="CSS" />
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint" />
</div>

<div align="center">
  <img src="https://img.shields.io/badge/Java_21-ED8B00?style=for-the-badge" alt="Java 21" />
  <img src="https://img.shields.io/badge/Spring_Boot_4-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" alt="Spring Boot" />
  <img src="https://img.shields.io/badge/Spring_Data_JPA-6DB33F?style=for-the-badge&logo=spring&logoColor=white" alt="Spring Data JPA" />
  <img src="https://img.shields.io/badge/Hibernate-59666C?style=for-the-badge&logo=hibernate&logoColor=white" alt="Hibernate" />
  <img src="https://img.shields.io/badge/Maven-C71A36?style=for-the-badge&logo=apachemaven&logoColor=white" alt="Maven" />
  <img src="https://img.shields.io/badge/MySQL-00758F?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
</div>

---

<div align="center">
    <a href="#about">About</a> •
    <a href="#features">Features</a> •
    <a href="#visuals">Key Visuals</a> •
    <a href="#tech">Tech Stack</a> •
    <a href="#installation">Installation</a> •
    <a href="#structure">Structure</a> •
    <a href="#database">Database</a> •
    <a href="#api">API</a> •
    <a href="#testing">Testing</a> •
    <a href="#future">Future Features</a>
</div>

---

<a name="about"></a>
## 💡 About the Project

**My Personal Finance** is a **full-stack web application** that gives a user one place to record what they earn, what they spend, and how much of each budget category is left.

A visitor can browse the public marketing pages, create an account, and log in. Once authenticated, they get a dashboard summarizing balance, income, expenses, and recent activity; a transactions page with full create/read/update/delete support plus search, category filtering, and sorting; and a budget page that shows per-category limits, spending, remaining amounts, and progress bars that shift color as a category approaches or passes its limit.

The application is built as two decoupled projects: a **React (Vite)** single-page front end and a **Java Spring Boot REST API** backed by a **MySQL** database through Spring Data JPA and Hibernate. During development, Vite proxies `/api` requests to the Spring Boot server, so both sides run side by side on localhost with no CORS configuration required.

This project was built to satisfy the **LaunchCode Unit 2** full-stack requirements, extending the Unit 1 React application with a persistent API, account management, and a relational database.

> [!NOTE]
> This is a learning/portfolio project. Authentication verifies credentials against BCrypt-hashed passwords, but the API is not yet protected by a token-based security filter — see [Known Limitations](#limitations) before deploying it anywhere public.

---

<a name="features"></a>
## ✨ Features

### 🌎 Public Pages

- **Home:** Overview of what the application does, with highlights and imagery
- **About:** Description of the product's purpose and capabilities
- **Contact:** Support contact details
- **Responsive Navigation:** Collapsible hamburger menu with active-link highlighting; the nav renders a different link set for signed-in and signed-out visitors
- **Route Transition Loader:** Lightweight progress bar shown on navigation

### 👤 Account Management

- Create an account with an email address and password, with client-side confirm-password matching
- Log in with existing credentials; the session is normalized and kept in `sessionStorage` so a refresh does not sign the user out
- Passwords are hashed with **BCrypt** before storage — plain-text passwords are never persisted
- Email addresses are trimmed and lowercased before lookup, and are unique at the database level
- Duplicate signups return a `409 Conflict` instead of creating a second account
- **Protected routes:** `/dashboard`, `/budget`, and `/transactions` redirect to `/login` when no valid user is in session
- Every new account is seeded with five default budget categories

### 📊 Dashboard

- **Balance**, **Income**, and **Expenses** metric cards calculated from the user's transactions
- Balance is styled positive or negative based on its value
- **Recent activity** table showing the three most recent transactions, with color-coded amounts and category pills
- "View all" link through to the full transactions page

### 💳 Transaction Management

- Add income or expense transactions through a modal form, with today's date pre-filled
- Category options change based on whether the transaction is income or an expense
- Edit any existing transaction in the same modal
- Delete with a confirmation dialog
- **Search** transactions by description
- **Filter** by category, with the dropdown built dynamically from the user's own data
- **Sort** by date (newest first) or by amount
- Deep-linkable filtering: `/transactions?category=Groceries` opens the page pre-filtered

### 💵 Budget Management

- Category cards showing **Limit**, **Spent**, and **Remaining** for each budget
- **Progress bars** with three usage levels — normal, warning at 70%, and danger at or over 100%
- Over-budget categories display the exact overage amount
- Per-category limit editing through a modal, persisted to the API
- Summary panel with total monthly budget, total spent, overall percentage, and overall progress
- Clicking a category navigates to its filtered transaction list
- Default categories created at signup: **Groceries**, **Rent**, **Entertainment**, **Utilities**, and **Transportation**, each starting with a `$100` limit

---

<a name="visuals"></a>
## 📸 Key Visuals

> Click on any of the items below to expand or collapse them.

### Wireframes & Site Map

<details>
  <summary>Click here to toggle view of wireframes.</summary><br />
  <em>Add your Figma / FigJam / Balsamiq link and exported images here.</em>
</details>

### Preview of UI

<!-- TODO: Add screenshots to a /preview folder at the repo root, then uncomment the image tags below. -->

#### PUBLIC SITE

<details open>
    <summary>Home & About Pages</summary>
    <em>Coming soon!</em>
    <!-- <img src="preview/home-page.png" alt="Screenshot of Home Page view" height="500px" /> -->
    <!-- <img src="preview/about-page.png" alt="Screenshot of About Page view" height="500px" /> -->
</details>

<details>
    <summary>Login & Sign Up Pages</summary>
    <em>Coming soon!</em>
    <!-- <img src="preview/login-page.png" alt="Screenshot of Login Page view" height="500px" /> -->
    <!-- <img src="preview/signup-page.png" alt="Screenshot of Sign Up Page view" height="500px" /> -->
</details>

#### AUTHENTICATED APP

<details>
    <summary>Dashboard</summary>
    <em>Coming soon!</em>
    <!-- <img src="preview/dashboard.png" alt="Screenshot of Dashboard view" width="700px" /> -->
</details>

<details>
    <summary>Transactions & Add/Edit Modal</summary>
    <em>Coming soon!</em>
    <!-- <img src="preview/transactions.png" alt="Screenshot of Transactions view" width="700px" /> -->
    <!-- <img src="preview/add-transaction.png" alt="Screenshot of Add Transaction modal" width="700px" /> -->
</details>

<details>
    <summary>Budget & Limit Editing</summary>
    <em>Coming soon!</em>
    <!-- <img src="preview/budget.png" alt="Screenshot of Budget view" width="700px" /> -->
    <!-- <img src="preview/edit-limit.png" alt="Screenshot of Edit Category Limit modal" width="700px" /> -->
</details>

> [!TIP]
> For a portfolio README, screenshots matter: they let a reviewer understand the application without cloning and running it locally.

---

<a name="tech"></a>
## 🛠️ Tech Stack

This project uses a decoupled architecture: a component-based React client communicating over REST with a layered Spring Boot service (controller → service → repository → entity).

### Front End

| Technology | Description |
|       ---: | :---        |
| ![JavaScript](https://img.shields.io/badge/JavaScript-F0DB4F?style=for-the-badge&logo=javascript&logoColor=323330) | Core language for application logic and component behavior |
| ![React](https://img.shields.io/badge/React_19-61DBFB?style=for-the-badge&logo=react&logoColor=20232A) | Component-based UI with hooks (`useState`, `useEffect`) for state and data fetching |
| ![React Router](https://img.shields.io/badge/React_Router_7-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white) | Client-side routing, protected routes, and query-param driven filtering |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) | Dev server with Hot Module Replacement, production builds, and the `/api` dev proxy |
| ![CSS](https://img.shields.io/badge/CSS-rebeccapurple?style=for-the-badge&logo=css&logoColor=white) | Hand-written styling, responsive layout, and component-scoped stylesheets |
| ![Fetch API](https://img.shields.io/badge/Fetch_API-005571?style=for-the-badge) | Native browser HTTP client used for all API communication |
| ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white) | Static analysis with React Hooks and React Refresh rules |

### Back End & Database

| Technology | Description |
|       ---: | :---        |
| ![Java](https://img.shields.io/badge/Java_21-ED8B00?style=for-the-badge) | Core back-end language |
| ![SpringBoot](https://img.shields.io/badge/Spring_Boot_4.1.1-6DB33F?style=for-the-badge&logo=springboot&logoColor=white) | Application framework and embedded server for a standalone REST API |
| ![Spring MVC](https://img.shields.io/badge/Spring_MVC-6DB33F?style=for-the-badge&logo=spring&logoColor=white) | `@RestController` endpoints, request mapping, and HTTP status handling |
| ![Spring Data JPA](https://img.shields.io/badge/Spring_Data_JPA-6DB33F?style=for-the-badge&logo=spring&logoColor=white) | Repository abstraction over persistence, with derived and `@Query` methods |
| ![Hibernate](https://img.shields.io/badge/Hibernate-59666C?style=for-the-badge&logo=hibernate&logoColor=white) | ORM implementation; generates and updates schema from the JPA entities |
| ![Validation](https://img.shields.io/badge/Jakarta_Validation-CC0000?style=for-the-badge) | Declarative request validation (`@NotBlank`, `@Email`, `@Valid`) |
| ![Spring Security Crypto](https://img.shields.io/badge/Spring_Security_Crypto-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white) | BCrypt password hashing and verification |
| ![Maven](https://img.shields.io/badge/Maven-C71A36?style=for-the-badge&logo=apachemaven&logoColor=white) | Dependency management and build automation via the Maven Wrapper |
| ![MySQL](https://img.shields.io/badge/MySQL-00758F?style=for-the-badge&logo=mysql&logoColor=white) | Relational database for users, budgets, and transactions |

---

<a name="installation"></a>
## 🚀 Prerequisites & Installation

> [!NOTE]
> To run this project locally, you will need the following installed:
> - Java Development Kit (JDK) **21**
> - Node.js (LTS version) and npm
> - MySQL Server (8.0+)
> - Git

Verify your installations:

```shell
java -version
node -v
npm -v
mysql --version
```

---

### Back End Setup (Java / Spring Boot / MySQL)

1.  **Clone the repository:** In the terminal, navigate to the directory where you want the project to live, then run:
    ```shell
    git clone https://github.com/your-username/unit-2-project-personal-finance-app  # or your link, if forked
    cd unit-2-project-personal-finance-app/java-spring-boot-back-end-app
    ```

1.  **Create the database:** The application connects to a MySQL schema named `unit2_db`.
    ```sql
    CREATE DATABASE unit2_db;
    ```

1.  **Configure database credentials:** Create a `.env` file in the back-end project root (`java-spring-boot-back-end-app/.env`):
    ```properties
    DB_USERNAME=your_mysql_username
    DB_PASSWORD=your_mysql_password
    ```
    These are read by `application.properties` through `spring.config.import=optional:file:./.env[.properties]`.

    > [!IMPORTANT]
    > Never commit `.env` or real credentials to GitHub. Add `.env` to the back end's `.gitignore` before your first push.

1.  **Run the application:** From the back-end project root, use the Maven Wrapper. Hibernate will create and update the tables automatically (`spring.jpa.hibernate.ddl-auto=update`).

    **macOS / Linux:**
    ```shell
    ./mvnw spring-boot:run
    ```

    **Windows:**
    ```shell
    mvnw.cmd spring-boot:run
    ```

    🟢 The API should now be running at `http://localhost:8080`.

1.  **Create an account:** Either register through the front end, or send a `POST` request to `http://localhost:8080/api/auth/signup` with a tool such as Postman:
    ```json
    {
        "email": "user@example.com",
        "password": "abcd1234"
    }
    ```
    Signing up seeds the five default budget categories for the new user.

> [!WARNING]
> If you get an `UnsupportedClassVersionError`, set your `JAVA_HOME` environment variable to a Java 21 JDK. If you run the application from an IDE such as IntelliJ or VS Code, also confirm the project SDK and language level are set to Java 21.

---

### Front End Setup (React / Vite)

1.  **Navigate to the front-end project directory:**
    ```shell
    cd ../react-front-end-app
    ```

1.  **Install dependencies:**
    ```shell
    npm install
    ```

1.  **Run the development server:**
    ```shell
    npm run dev
    ```

    🟢 The application will be available in the browser, typically at `http://localhost:5173`.

> [!TIP]
> Vite proxies every `/api` request to `http://localhost:8080`, so the Spring Boot application must be running before you sign up or log in.

#### Other front-end scripts

| Command | Purpose |
| :--- | :--- |
| `npm run build` | Produce an optimized production build in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint across the project |

---

<a name="structure"></a>
## 🗂️ Application Structure

```text
unit-2-project-personal-finance-app/
│
├── java-spring-boot-back-end-app/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   ├── Auth/           # AuthController, AuthService, Login/Signup records
│   │   │   │   ├── Budget/         # BudgetController, BudgetService, BudgetRepository
│   │   │   │   ├── Models/         # User, Budget, and Transaction JPA entities
│   │   │   │   ├── Transaction/    # TransactionsController, Service, Repository
│   │   │   │   ├── User/           # UserController, UserService, UserRepository
│   │   │   │   └── com/example/Unit2ProjectPersonalFinanceApp/
│   │   │   │                       # Application entry point, SecurityConfig,
│   │   │   │                       # GlobalExceptionHandler
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/                   # Spring Boot context-load test
│   ├── pom.xml
│   └── .env                        # Local only — do not commit
│
└── react-front-end-app/
    ├── src/
    │   ├── components/             # Button, Header, NavBar, Modal, Table, Footer, PageLoader
    │   ├── images/
    │   ├── pages/
    │   │   ├── Auth/               # LoginPage, SignUpPage
    │   │   ├── Budget/             # Budget page, settings & category limit forms
    │   │   ├── Dashboard/          # Dashboard, MetricCard, hero & activity headers
    │   │   ├── Transactions/       # Transactions page, AddTransaction modal
    │   │   ├── Home.jsx, About.jsx, Contact.jsx
    │   ├── App.jsx                 # Routing, session state, route protection
    │   └── main.jsx
    ├── vite.config.js              # React plugin + /api dev proxy
    ├── eslint.config.js
    └── package.json
```

### Routes

| Path | Page | Access |
| :--- | :--- | :--- |
| `/` | Home | 🌎 Public |
| `/about` | About | 🌎 Public |
| `/contact` | Contact | 🌎 Public |
| `/login` | Login | 🌎 Public |
| `/signup` | Sign Up | 🌎 Public |
| `/dashboard` | Dashboard | 🔒 Authenticated |
| `/budget` | Budget | 🔒 Authenticated |
| `/transactions` | Transactions | 🔒 Authenticated |

---

<a name="database"></a>
## 🗄️ Database Structure (ERD)

The MySQL schema is generated by Hibernate from three JPA entities: `users`, `budget`, and `transaction`.

Relationships are modeled with foreign-key-style identifier columns rather than JPA association mappings, and the service layer enforces referential rules — for example, a transaction is rejected when its `budgetId` does not match an existing budget, and a budget update only succeeds when the budget belongs to the requesting user.

1. **User** → **Budget**: one user has many budgets (`budget.user_id`)
2. **User** → **Transaction**: one user has many transactions (`transaction.userId`)
3. **Budget** → **Transaction**: a transaction may reference one budget (`transaction.budgetId`)

```text
User
 │
 ├───────────────< Budget
 │                   │
 └───────────────< Transaction
```

### Entities

#### `users`

| Column | Type | Notes |
| :--- | :--- | :--- |
| `id` | `INTEGER` | Primary key, auto-generated |
| `email` | `VARCHAR` | Required, **unique**, validated as an email address |
| `password_hash` | `VARCHAR` | Required; BCrypt hash, never the raw password |

#### `budget`

| Column | Type | Notes |
| :--- | :--- | :--- |
| `id` | `INTEGER` | Primary key, auto-generated |
| `user_id` | `INTEGER` | Required; owner of the budget |
| `category` | `VARCHAR` | Category name, e.g. `Groceries` |
| `amount` | `DECIMAL` | Spending limit for the category |
| `date` | `DATETIME` | Timestamp the budget was created |

#### `transaction`

| Column | Type | Notes |
| :--- | :--- | :--- |
| `id` | `INTEGER` | Primary key, auto-generated |
| `userId` | `INTEGER` | Required; owner of the transaction |
| `description` | `VARCHAR` | Free-text label |
| `category` | `VARCHAR` | Category name |
| `amount` | `DECIMAL` | **Signed:** positive = income, negative = expense |
| `date` | `DATETIME` | Date of the transaction |
| `budgetId` | `INTEGER` | Optional link to a budget; validated when supplied |

> [!IMPORTANT]
> The sign of `amount` is the single source of truth for transaction type. The client stores expenses as negative values and income as positive values, and the dashboard and budget calculations depend on that convention.

### Entity Relationship Diagram (ERD)

<details open>
  <summary>Click here to toggle view of ERD</summary><br />
  <em>Add your ERD image or Figma link here.</em>
  <!-- <a href="YOUR_FIGMA_LINK"><img src="preview/erd.png" alt="Entity Relationship Diagram" /></a> -->
</details>

---

<a name="api"></a>
## ⚙️ API Endpoints

All endpoints are served from `http://localhost:8080` and accept and return JSON.

> [!NOTE]
> Credentials are verified against BCrypt hashes at `/api/auth/login`, but the API does not yet issue or require a token. Every endpoint is currently reachable without a session, and the user whose data is returned is determined by the `userId` in the request. Adding token-based authorization is the top item in [Future Features](#future).

### Authentication 🔐

| HTTP Method | Endpoint | Description | Responses |
| :--- | :--- | :--- | :--- |
| 🟡 `POST` | `/api/auth/signup` | Register a user, hash the password, and seed default budgets | `201` created · `409` email already registered · `400` validation error |
| 🟡 `POST` | `/api/auth/login` | Verify credentials and return the user's ID | `200` success · `401` invalid credentials |

**Request body** (both endpoints):

```json
{
    "email": "user@example.com",
    "password": "abcd1234"
}
```

**Response body:**

```json
{
    "message": "Login successful.",
    "userId": 1
}
```

### Users 👤

| HTTP Method | Endpoint | Description | Responses |
| :--- | :--- | :--- | :--- |
| 🟡 `POST` | `/api/users` | Create a user record directly | `201` created · `400` invalid payload |
| 🟢 `GET` | `/api/users/{email}` | Look up a user by email (case-insensitive) | `200` found · `404` not found |
| 🔵 `PATCH` | `/api/users/{id}` | Update a user's email or password hash | `200` updated · `404` not found |
| 🔴 `DELETE` | `/api/users/{id}` | Delete a user by ID | `204` deleted · `404` not found |

### Budgets 💵

| HTTP Method | Endpoint | Description | Responses |
| :--- | :--- | :--- | :--- |
| 🟡 `POST` | `/api/budgets` | Create a budget category | `201` created |
| 🟢 `GET` | `/api/budgets/user/{userId}` | List all budgets for a user | `200` success |
| 🔵 `PATCH` | `/api/budgets/user/{userId}/budget/{budgetId}` | Update a category limit; only succeeds when the budget belongs to that user | `200` updated · `400` amount missing · `404` not found |
| 🔴 `DELETE` | `/api/budgets/{id}` | Delete a budget by ID | `200` deleted · `404` not found |

### Transactions 💳

| HTTP Method | Endpoint | Description | Responses |
| :--- | :--- | :--- | :--- |
| 🟡 `POST` | `/api/transactions` | Create a transaction | `201` created · `400` missing user ID or unknown budget ID |
| 🟢 `GET` | `/api/transactions?userId={userId}` | List all transactions for a user | `200` success · `400` user ID missing |
| 🔵 `PATCH` | `/api/transactions/{id}` | Partially update a transaction (only supplied fields change) | `200` updated · `404` not found |
| 🔴 `DELETE` | `/api/transactions/{id}` | Delete a transaction by ID | `204` deleted · `404` not found |

**Example transaction payload:**

```json
{
    "userId": 1,
    "description": "Weekly groceries",
    "category": "Groceries",
    "amount": -82.45,
    "date": "2026-02-14T00:00:00",
    "budgetId": 3
}
```

### Error Handling

A `@RestControllerAdvice` produces consistent error bodies for common failures:

| Condition | Status | Message |
| :--- | :--- | :--- |
| Validation failure (`@Valid`) | `400` | The first field error message, e.g. `Email must be valid` |
| Missing or malformed JSON body | `400` | `Request body is invalid or missing.` |
| Duplicate email at the database level | `409` | `Email is already registered.` |

```json
{
    "status": 400,
    "message": "Email must be valid"
}
```

---

<a name="testing"></a>
## 🧪 Testing

The Spring Boot project includes a context-load test that verifies the application starts and all beans wire correctly.

**macOS / Linux:**
```shell
./mvnw test
```

**Windows:**
```shell
mvnw.cmd test
```

Lint the React application with:

```shell
npm run lint
```

Manual verification checklist used during development:

- Sign up with a new email → `201`, five default budgets created
- Sign up with an existing email → `409`, no duplicate user
- Log in with a bad password → `401`, no session created
- Visit `/dashboard` while signed out → redirected to `/login`
- Add an expense → dashboard balance and matching budget category both update
- Edit a category limit → progress bar and remaining amount recalculate
- Delete a transaction → row disappears and totals adjust

---

<a name="limitations"></a>
## 🚧 Known Limitations

Being explicit about the current boundaries of the project:

- **No token-based authorization.** Login verifies a password, but the API accepts requests without a session token, so one user's `userId` could be used to read another user's data.
- **Session state is client-side only,** kept in `sessionStorage` and cleared when the browser tab closes.
- **Budget period is display-only.** The selector defaults to "Monthly" and is not persisted to the database.
- **Budget categories are fixed.** New accounts receive five defaults; adding and removing categories from the UI is not yet implemented.
- **Transaction categories are hard-coded** in the add/edit form rather than sourced from the user's budgets.
- **Savings goals** are described in the marketing copy but are not yet implemented.
- **Test coverage is minimal** — one context-load test, with no controller, service, or component tests.
- **No deployment configuration** for the API or database; a `netlify.toml` exists for the front end only.

---

<a name="future"></a>
## 🔮 Future Features

### Security & Accounts
- Issue JWTs on login and require them on every data endpoint
- Scope all queries to the authenticated user instead of a client-supplied `userId`
- Password reset and persistent "Remember me" support
- Stronger password requirements and server-side rate limiting on auth routes

### Budgeting
- Add, rename, and delete budget categories
- Persist the budget period and support weekly, monthly, and annual cycles
- Savings-goal tracking with progress indicators
- Recurring transactions for rent, utilities, and subscriptions
- Alerts when a category crosses a configurable threshold

### Reporting & Insights
- Charts for spending by category and income versus expenses over time
- Month-over-month comparison views
- Date-range filtering and CSV export

### Engineering
- Controller, service, and repository tests plus React component tests
- OpenAPI/Swagger documentation for the API
- Deployment configuration for the Spring Boot API and MySQL database
- Pagination for large transaction sets

---

## 📚 What I Learned

Building this project gave me experience developing a full-stack application and connecting a React front end to a Java Spring Boot REST API.

**Back end**
- Structuring a layered Spring Boot application across controller, service, and repository tiers
- Designing RESTful endpoints and returning correct HTTP status codes with `ResponseEntity`
- Using Spring Data JPA repositories, derived query methods, and a custom `@Query`
- Mapping entities to MySQL tables and letting Hibernate manage the schema
- Validating requests declaratively with Jakarta Validation and Java `record` DTOs
- Centralizing error responses with `@RestControllerAdvice`
- Hashing and verifying passwords with BCrypt, and keeping secrets in a `.env` file
- Using `@Transactional` so that creating a user and seeding their default budgets succeed or fail together

**Front end**
- Building reusable components such as a generic, column-driven `Table` and a `Modal`
- Managing state and side effects with `useState` and `useEffect`, including cancellation flags to avoid updating unmounted components
- Implementing protected routes and reading query parameters with React Router
- Fetching, creating, updating, and deleting data with the Fetch API, including optimistic UI updates and error messaging
- Deriving values — totals, percentages, filtered and sorted lists — from state rather than duplicating them

**Full stack**
- Using a Vite dev proxy to connect the client to the API without CORS configuration
- Agreeing on a data contract between the two applications and normalizing API responses on the client
- Organizing a repository into separate front-end and back-end projects

---

## 🧑‍💻 Author

_Your Name_ — [@your-github](https://github.com/your-username) · [LinkedIn](https://www.linkedin.com/in/your-profile)

Built as the Unit 2 full-stack project for [LaunchCode](https://www.launchcode.org).
