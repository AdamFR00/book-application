# Book Application

A full-stack book management application.

Users can register and log in, manage their personal collection of
books, and save up to five favourite quotes.

Can be publicly available [here](https://booknest-ns2n.onrender.com/) 

## Tech Stack

### Frontend

-   Angular 20
-   TypeScript
-   Bootstrap
-   Font Awesome

### Backend

-   ASP.NET Core / .NET 9
-   Entity Framework Core
-   JWT authentication using HTTP-only cookies

### Database

-   PostgreSQL

## Features

-   User registration and login
-   JWT-based authentication
-   Personal book collection for each user
-   Create, edit, and delete books
-   Save up to five personal quotes
-   Protected routes and API endpoints
-   Responsive UI

## Project Structure

``` text
bookApplication/
├── build/
│   ├── Dockerfile
│   └── .env.example
├── frontend/
│   └── book-app/
├── backend/
│   └── BookApi/
└── README.md
```

The application is deployed as a single web service. ASP.NET Core serves
both the Angular application and the REST API.

## Running Locally with Docker

### Prerequisites

-   Docker
-   Access to a PostgreSQL database

### 1. Configure environment variables

Create:

``` text
build/.env
```

Using `build/.env.example` as a template:

``` env
ConnectionStrings__DefaultConnection=Host=<host>;Port=5432;Database=<database>;Username=<username>;Password=<password>
Jwt__Key=<jwt-secret>
```

### 2. Build the application

From the repository root:

``` bash
docker build -f build/Dockerfile -t book-application .
```

### 3. Run the application

``` bash
docker run --rm -p 10000:10000 --env-file build/.env book-application
```

Open `http://localhost:10000`. Port 10000 is the default port in render and was therefore the chosen port, the port can be changed by modifying the dockerfile.

