# Employee Management System

This is a microservice based spring boot application for employee management.

## Features

#### Employee Dashboard
> ***
> 1. View employee details such as there team and projects
> 2. can have a detailed info of there previous projects and works he involve in.
> 3. Can view all employee public profiles
> 4. Can edit there own details
> 5. Can rise tickets
> 6. Can chat with admin about ticket resolution
> ***

#### Admin Dashboard
> ***
> 1. View all employees public and private profiles
> 2. Have the privilege to promote, add and remove employees
> 3. Can manage and resolve tickets and chat with employees.
> 4. Can add and remove projects
> 5. Can add and remove employee teams and their members
> ***

### Technologies Used
*Backend development*
- Spring Boot
- Spring Security
- Spring JPA

*Database*
- PostgreSQL
- AWS RDS

*Frontend*
- React JS

*Deployment*
- Kubernetes
- Docker
- Kong


Architectures :
 
- Microservices
  - **Admin** (This service is developed to have complete isolation and security deployed into private subnet of VPC)
  - **Employee**( Secured using JWT token and uses PostgreSql from RDS. uses one to many and many to many relationships for fetching data such as team, projects etc.)
  - **Authentication**(JWT token generation, JWT token validation and JWT token refreshment. Maintains Communication to employee service for JWT token)
  - **Tickets**(ChatFeatured based on HTTP protocols. Stores conversations and sorts according to times.)

- Kubernetes
   - **Kong** (API gateway and Authentication)
   - **Deployments** (Resource Limits and autoscaling)
   - **Ingress** (Path based Routing to appropriate services)
   - **Service** (Load Balancing between Pods)

## How To Run?

1. Clone the repository
```bash
git clone https://github.com/koteshwarchinnolla/Employee-Management-System.git
```

2. Navigate to the cloned repository
```bash
cd Employee-Management-System
```

3. Two Ways to run the backend application
    >
    ***
   **Using Docker (pre requisites: Docker, Docker Compose)**
   >
   ```bash
   docker compose up --build
   ```

    ***
   **Using Kubernetes**
    >
    Pre-requisites: Create a cluster
    Run the following command
    >
   ```bash
    ./run_kubernetes.sh
   ```
4. Run the frontend application (pre requisites: NodeJS, NPM)

    ```bash
    cd team-management-platform
    npm install
    npm start
    ```
