admin-dashboard
Panel administracyjny (frontend) do zarządzania pracownikami, rolami i zespołami — zbudowany w oparciu o Angular oraz Angular Material.
Aplikacja działa jako klient dla backendu spring-employee-service, korzystając z jego REST API do wykonywania operacji CRUD.

Dashboard zapewnia wygodny interfejs użytkownika do przeglądania, tworzenia, edycji i usuwania danych pracowników, a także obsługuje walidację, komunikaty o błędach oraz potwierdzenia akcji.

✨ Funkcje (Features)
Zarządzanie pracownikami (Employee)
Lista pracowników z paginacją i filtrowaniem
Podgląd szczegółów pracownika
Tworzenie nowego pracownika (/employees/new)
Edycja istniejącego pracownika (/employees/:id/edit)
Usuwanie pracownika z potwierdzeniem
Obsługa konfliktów z backendu (np. email UNIQUE, konflikt wersji)

🧩 Integracja z backendem
Pełna komunikacja z spring-employee-service poprzez REST API
Obsługa błędów HTTP (400, 404, 409, 500)
Mapowanie DTO (Create, Update, Patch)
Obsługa optimistic locking (wyświetlanie komunikatów o konflikcie wersji)

🎨 UI/UX
Angular Material (tabele, formularze, dialogi, snackbar, spinner)
Responsywny layout oparty o LayoutComponent
Spójny design kart, nagłówków i formularzy
Dialog potwierdzenia zapisu i usunięcia
Spinner ładowania podczas operacji async

🔐 Moduły funkcjonalne
EmployeesModule (pracownicy)
RolesModule (role)
TeamsModule (zespoły)
AuthModule (logowanie — opcjonalnie)

🧭 Routing
Lazy loading modułów
Oddzielne ścieżki dla listy, szczegółów, edycji i tworzenia
Obsługa parametrów i trybu edycji/tworzenia

🧰 Tech Stack
Angular 17+
TypeScript
Angular Material
RxJS
SCSS
REST API (Spring Boot backend)

📦 WYMAGANIA
Node.js  18+
Angular CLI 17+
Działający backend: spring-employee-service

ARCHITEKTURA (Frontend ↔ Backend)

┌──────────────────────────┐        HTTP/JSON        ┌────────────────────────────┐
│      admin-dashboard     │  ───────────────────▶     spring-employee-service   
│  (Angular, Material UI)  │                             (Java, Spring Boot API) 
└──────────────────────────┘  ◀───────────────────  └────────────────────────────┘
          ▲     │                                           ▲
          │     │                                           │
          │     ▼                                           │
   UI Components & Pages                             JPA/Hibernate + MySQL
   (Employees, Roles, Teams)                         Flyway migrations, Validation


ROADMAP
Planowane rozszerzenia projektu:
1. Autoryzacja i role użytkowników
logowanie (JWT)
role: admin, manager, viewer
ograniczenia dostępu do modułów

2. Rozszerzenie modułu Employees
filtrowanie po roli i zespole
historia zmian (audit log)
