# StoryNetwork
![image](https://github.com/user-attachments/assets/183a933b-d442-4f73-b84c-ba04c6f19058)

## Objective

The objective of this project is to create a basic blog application with a list view and a detail view for blog posts, and deploy it to a cloud platform. This project demonstrates skills in frontend development, backend development, database management, and deployment.

## Requirements

### Backend

The backend is developed using **Node.js with Express**.

**RESTful API Endpoints:**

- **For Posts:**
  - **GET /posts**: List all posts.
  - **GET /posts/:id**: Get a specific post.
  - **POST /posts/create**: Create a new post.
  - **PUT /posts/update/:id**: Update a post.
  - **DELETE /posts/:id**: Delete a post.

- **For Users:**
  - **GET /users/:id**: Get user details.
  - **POST /login**: Login.
  - **POST /signup**: Signup.

- **For Comments:**
  - **POST /posts/:postId/comments**: Add a comment to a post.

**Database:**

- Implemented using **MongoDB**.
- The database model includes fields such as `id`, `title`, `description`, `comments`, `created_at`, `updated_at`, and user information.

**Error Handling & Validation:**

- Custom error handling mechanisms and input validation are implemented for robust API interactions.

### Frontend

The frontend is built using **React** with **Tailwind CSS** for styling.

**Features:**

1. **Responsive Layout:**
   - Header, main content area, and footer.

2. **Card View:**
   - Displays blog posts with title and excerpt.

3. **Detailed View:**
   - Detailed view for individual blog posts with a sidebar showing the recent 5 posts and search functionality.

4. **New Post Form:**
   - Form for adding new blog posts with basic client-side form validation and a sidebar with inspirational quotes and writing tips.

5. **Profile Page:**
   - Responsive profile page displaying user info and all their posts with update and delete features.

### Full Stack Integration

1. **API Integration:**
   - The frontend connects to the backend API to manage blog post data and user interactions.

2. **Error Handling & Loading States:**
   - Proper error handling and loading states are implemented to enhance user experience.

3. **State Management:**
   - Utilizes React's state management to handle application state efficiently.

### Deployment

The full stack application is deployed on **Render** for both frontend and backend.

1. **Deployment URL:**
   - [StoryNetwork Application](https://storynetwork-frontend.onrender.com/)

2. **Access & Usage:**
   - The deployed application is fully functional and accessible at the above URL.

### Installation Instructions

To run this project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/vishwakarma-vishal/blog.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd blog
   ```

3. **Install dependencies for both frontend and backend:**

   - Backend:
     ```bash
     cd backend
     npm install
     ```

   - Frontend:
     ```bash
     cd frontend
     npm install
     ```

4. **Set up environment variables:**
   - Create a `.env` file in the `backend` directory and add the following variables:
     ```
     PORT=your_port_number
     DATABASE_URL=your_mongodb_url
     ```
   - Create a `.env` file in the `frontend` directory and add the following variables:
     ```
     VITE_URL=your_server_url
     ```
5. **Run the backend server:**
   ```bash
   npm start
   ```

6. **Run the frontend application:**
   ```bash
   npm start
   ```

7. **Access the application:**
   - Open your browser and go to `http://localhost:your_port_number`.
