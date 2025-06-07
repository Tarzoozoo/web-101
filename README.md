# Register user application

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
```
cd ~/web-101/
npm install
node server/index.js
```