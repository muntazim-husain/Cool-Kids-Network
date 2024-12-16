# Cool-Kids-Network

## Project Overview
The Cool-Kids-Network is a web application designed to create a community where users can sign up, log in, and manage their unique characters. The application allows users to have different roles, such as "Cool Kid," "Cooler Kid," and "Coolest Kid," which determine their permissions and access to various features within the platform. 

## Frontend Setup
The frontend of the application is built using React, a popular JavaScript library for building user interfaces. We utilize Material-UI for styling and component design, which provides a set of pre-designed components that follow Google's Material Design guidelines. 

### Key Features of the Frontend:
- **User Authentication**: Users can sign in to the application.
- **Role Management**: Maintainers can update user roles through a dashboard interface.
- **Character Management**: Users can view and manage their characters based on their roles.
- **Responsive Design**: The application is designed to be responsive, ensuring a good user experience on both desktop and mobile devices.

### Technologies Used:
- **React**: For building the user interface.
- **Material-UI**: For styling and UI components.
- **Axios/Fetch API**: For making HTTP requests to the backend.
- **React Router**: For handling navigation between different components.

## Backend Setup
The backend of the application is built using NestJS, a progressive Node.js framework for building efficient and scalable server-side applications. We use Prisma as our ORM (Object-Relational Mapping) tool to interact with the PostgreSQL database.

### Key Features of the Backend:
- **User Management**: Handles user registration, and role updates.
- **Character Management**: Manages character data associated with users.
- **API Endpoints**: Provides RESTful API endpoints for the frontend to interact with.

### Technologies Used:
- **NestJS**: For building the server-side application.
- **Prisma**: For database interactions and migrations.
- **PostgreSQL**: As the database to store user and character data.

## Database Design
The database is designed to store user information and their associated characters. The main tables include:

1. **Users Table**:
   - **id**: Primary key.
   - **email**: Unique identifier for each user.
   - **role**: User's role (Cool Kid, Cooler Kid, Coolest Kid).
   - **characterId**: Foreign key linking to the Characters table.

2. **Characters Table**:
   - **id**: Primary key.
   - **firstName**: Character's first name.
   - **lastName**: Character's last name.
   - **country**: Character's country of origin.
   - **userId**: Foreign key linking back to the Users table.

### Relationships:
- A **User** can have one **Character** (one-to-one relationship).
- Each **Character** is associated with one **User**.

## Database Connection
We are using an online PostgreSQL database hosted on Render. The application connects to this database to perform CRUD (Create, Read, Update, Delete) operations on user and character data. The connection details are securely managed using environment variables.

Create a `.env` file in the backend directory and paste the `DATABASE_URL` into the file, as shown below. To view the table data, you can connect using pgAdmin, DBeaver, or any other database management tool.

DATABASE_URL="postgresql://cool_kids_network_user:xCjyxFPdaNCJpVcL5JELOf4HPbT3RfLj@dpg-ctdk05ilqhvc73d6jsug-a.oregon-postgres.render.com/cool_kids_network?schema=public"



## Setup Instructions

### Prerequisites
- Node.js
- npm (Node package manager)
- PostgreSQL database (local or hosted)

### Frontend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/muntazim-husain/Cool-Kids-Network.git
   cd cool-kids-network/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run start
   ```

4. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd cool-kids-network/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your PostgreSQL database and update the `DATABASE_URL` in your `.env` file with your database connection string.

4. Run database migrations:
   ```bash
   npx prisma migrate dev --name init
   ```

5. Start the backend server:
   ```bash
   npm run start:dev
   ```

6. The backend will be running on [http://localhost:3000](http://localhost:3000).

## Conclusion
The Cool-Kids-Network project combines modern web technologies to create an engaging platform for users to manage their characters and interact with the community. The frontend and backend are designed to work seamlessly together, providing a smooth user experience and efficient data management.