# Register user application
This project is a full-stack web application built using Node.js, Express.js, and PostgreSQL for managing user data. The system allows users to create, read, update, and delete (CRUD) their information through a web interface. The application is designed to enable easy user management with form validation, API integration, and dynamic data updates.

### Key Features:
- Create new users with necessary details such as first name, last name, age, gender, interests, and description.
- Read user data by fetching user details based on user ID.
- Update existing users' information.
- Delete users based on their ID.

## Tech Stack
### Frontend:
- **HTML:** Structure of the web pages.
- **CSS:** Styling of the web pages (assumed to be in external files or inline in HTML).
- **JavaScript:** Handling frontend logic, form validation, and API interaction.
- **DOM Manipulation:** Used for dynamically updating the content based on user interaction.

### Backend:
- **Node.js:** The server environment that runs JavaScript code outside the browser.
- **Express.js:** Web framework for handling HTTP requests and serving APIs.

### Database:
- PostgreSQL

### Development Tools:
- **Axios:** For API requests.
- **CORS:** Middleware for enabling Cross-Origin Resource Sharing, allowing the frontend to communicate with the backend.
- **npm:** For managing packages (e.g., axios, express).

## Setup the database
Run Docker (PostgresSQL and pgAdmin4)
```
docker compose up -d
```

Open DBeaver and create connection
- Log-in via username and password in `docker-compose.yml`

SQL Commands to Create Table and Insert Data


1. **Create ENUM Type for Gender:**
```sql
CREATE TYPE public.gender AS ENUM ('Man', 'Woman', 'None');
```
2. **Create the `users` table**, specifying the `gender` column as the ENUM type.
```sql
CREATE TABLE public.users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    age INTEGER,
    interests TEXT,
    description TEXT,
    gender public.gender
);
```
3. **Insert sample data** into the table, ensuring the `gender` values are valid according to the ENUM type.

```sql
INSERT INTO public.users (firstname, lastname, age, interests, description, gender) 
VALUES
    ('a', 'a', 12, 'Book', 'aaaa', 'Man'::public.gender),
    ('a', 'a', 12, 'Book', 'aaaa', 'Man'::public.gender),
    ('abbb', 'abbb', 12, 'Book, Games, Cartoon', 'aaaabbb', 'Woman'::public.gender),
    ('qqq', 'qqq', 122, 'Games', '111', 'Man'::public.gender);
```

## Run server
The backend serves both the API and the static frontend files.(Monolithic Approach)
Start the Express server on port 8000.
```
cd ~/web-101/
npm install
node server/index.js
```