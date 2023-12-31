# Budget-Planner

This is an Express server that implements Basic Authentication and Bearer Token Authentication, using a Postgres database for storage and extends the restrictive capabilities of our routes to the API.

## Live Deployment

[Deployed Server]();

## UML

![UML](./images/Screenshot%202023-09-28%20at%202.11.05%20PM.png)

## Installation

`npm install`

Create .env file, set PORT

`PORT=3002`

## Usage

## Create User (POST)

- **Route**: `/signup`
- **Method**: POST
- **Description**: Create a new user.
- **Request Body**:
  - `username` (String)
  - `password` (String)

## User Login (POST)

- **Route**: `/signin`
- **Method**: POST
- **Description**: Log in a user and receive an authentication token.
- **Request Body**:
  - `username` (String)
  - `password` (String)
- **Response**:
  - `token` (String) - Authentication token for the logged-in user.

## Access Secret Area (GET)

- **Route**: `/secret`
- **Method**: GET
- **Description**: Requires a valid bearer token for access.
- **Authentication**: Bearer Token

## List Users (GET)

- **Route**: `/users`
- **Method**: GET
- **Description**: Requires a valid token and "delete" permissions to view the list of users.
- **Authentication**: Bearer Token
- **Permissions**: "delete" capability required.

## READ ALL (GET)

- **Route**: `/api/v2/transactions`
- **Method**: GET
- **Description**: Requires authentication only, no specific roles.
- **Authentication**: Bearer Token

## CREATE (POST)

- **Route**: `/api/v2/transactions`
- **Method**: POST
- **Description**: Requires both a bearer token and the "create" capability to create a resource.
- **Authentication**: Bearer Token
- **Permissions**: "create" capability required.

## UPDATE (PUT)

- **Route**: `/api/v2/transactions/:id`
- **Method**: PUT
- **Description**: Requires both a bearer token and the "update" capability to update a resource.
- **Authentication**: Bearer Token
- **Permissions**: "update" capability required.

## DELETE (DELETE)

- **Route**: `/api/v2/transactions/:id`
- **Method**: DELETE
- **Description**: Requires both a bearer token and the "delete" capability to delete a resource.
- **Authentication**: Bearer Token
- **Permissions**: "delete" capability required.

## Contributors

- Joshua Shea
- Ekaterina Khoroshilova
- Sydney May Pagalan
- Adnan Mohamud
