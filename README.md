# Modern Walk Express Typescript API

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

| Method | Path           | Description         |
| ------ | -------------- | ------------------- |
| GET    | /v1/categories | Find all categories |

#### Products

| Method | Path              | Description              |
| ------ | ----------------- | ------------------------ |
| CREATE | /v1/products      | Create one new product   |
| GET    | /v1/products      | Find all products        |
| GET    | /v1/products/{id} | Find one product by id   |
| DELETE | /v1/products/{id} | Delete one product by id |

#### Tenants

| Method | Path             | Description             |
| ------ | ---------------- | ----------------------- |
| CREATE | /v1/tenants      | Create one new tenant   |
| GET    | /v1/tenants      | Find all tenants        |
| GET    | /v1/tenants/{id} | Find one tenant by id   |
| DELETE | /v1/tenants/{id} | Delete one tenant by id |

#### Users

| Method | Path           | Description           |
| ------ | -------------- | --------------------- |
| CREATE | /v1/users      | Create one new user   |
| GET    | /v1/users      | Find all users        |
| GET    | /v1/users/{id} | Find one user by id   |
| DELETE | /v1/users/{id} | Delete one user by id |

## Task Completed

### date :- 2022/08/08

- get all product service created.
- create product service created.
- get all users service created.
- get all categories service created.
- get all tenant service created.

### date :- 2022/08/09

- product add service created.
- product find by id service created.
- product delete service created.
- user add service created.
- user find by id service created.
- tenant delete service created.
- tenant add service created.
- tenant find by id service created.
- tenant delete service created.
