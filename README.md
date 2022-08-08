# Modern Walk Express API

This app aims to replicate the functionality of the mock REST API created for the Modern Walk app created during the Frontend Training program.

## Technologies Used

- NodeJS + Express

## Architecture

### Entities

- Categories
- Products
- Tenants
- Users

### API Specification

- Base URL: `http://{ host }:{ port }/api`

#### Categories

| Method | Path        | Description         |
| ------ | ----------- | ------------------- |
| GET    | /categories | Find all categories |

#### Products

| Method | Path      | Description            |
| ------ | --------- | ---------------------- |
| CREATE | /products | Create one new product |
| GET    | /products | Find all products      |

#### Tenants

| Method | Path     | Description      |
| ------ | -------- | ---------------- |
| GET    | /tenants | Find all tenants |

#### Users

| Method | Path   | Description    |
| ------ | ------ | -------------- |
| GET    | /users | Find all users |

#### Task Completed

get all product service created.
create product service created.

get all users service created.
get all categories service created.
get all tenant service created.
