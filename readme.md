Here’s how you can update your `README.md` file to reflect the new user routes and functionalities, along with the existing features in your project. This will include sections on authentication, posts, messages, and user-related actions.

---

```markdown
# Social Media Platform API

This is a backend implementation for a social media platform with features including user authentication, profile management, post creation, commenting, messaging, and following/unfollowing users.

## Features

- **Authentication**: Register, login, and logout functionality.
- **Posts**: Create, like, comment on, edit, and delete posts.
- **Messages**: Send and receive messages between users.
- **User Management**: View, update, and manage user profiles, including following/unfollowing other users.
- **Cloud Storage**: Upload user profile pictures and post media.

## Routes

### Authentication Routes

- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Login an existing user.
- **GET /api/auth/logout**: Logout the current user.

### Post Routes

- **POST /api/post/new**: Create a new post (protected route).
- **PUT /api/post/:id**: Edit the caption of an existing post (protected route).
- **DELETE /api/post/:id**: Delete a post (protected route).
- **GET /api/post/all**: Get all posts (protected route).
- **POST /api/post/like/:id**: Like or unlike a post (protected route).
- **POST /api/post/comment/:id**: Add a comment on a post (protected route).
- **DELETE /api/post/comment/:id**: Delete a comment from a post (protected route).

### Message Routes

- **POST /api/messages**: Send a new message to a user (protected route).
- **GET /api/messages/:id**: Get all messages in a conversation (protected route).

### User Routes

- **GET /api/user/me**: Get the current user's profile (protected route).
- **GET /api/user/:id**: Get another user's profile by ID (protected route).
- **POST /api/user/:id**: Update the current user's password (protected route).
- **PUT /api/user/:id**: Update the current user's profile (protected route).
- **POST /api/user/follow/:id**: Follow or unfollow a user (protected route).
- **GET /api/user/followdata/:id**: Get the follower and following data for a user (protected route).

## Technologies Used

- **Express.js**: Web framework for Node.js to build APIs.
- **MongoDB**: NoSQL database for storing user, post, and message data.
- **Cloudinary**: Cloud service for media storage (e.g., images and videos).
- **Multer**: Middleware for handling file uploads.
- **JWT (JSON Web Tokens)**: Used for user authentication and authorization.
- **Socket.io**: Real-time communication for messaging between users.

## Installation

1. Clone this repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=<your-port-number>
   MONGODB_URI=<your-mongo-db-uri>
   Cloudinary_Cloud_Name=<your-cloudinary-cloud-name>
   Cloudinary_Api=<your-cloudinary-api-key>
   Cloudinary_Secret=<your-cloudinary-api-secret>
   JWT_SECRET=<your-jwt-secret>
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. The server will be running on the specified port, e.g., `http://localhost:5000`.

## Usage

- Use Postman or any API client to test the endpoints.
- Authentication is required for most routes, and you'll need to send a `Bearer` token in the `Authorization` header.

## Example Requests

### 1. Register a User
- **Method**: POST
- **Endpoint**: `/api/auth/register`
- **Body**: 
   ```json
   {
     "name": "John Doe",
     "email": "john@example.com",
     "password": "yourpassword",
     "profilePic": "image-file"
   }
   ```

### 2. Login a User
- **Method**: POST
- **Endpoint**: `/api/auth/login`
- **Body**: 
   ```json
   {
     "email": "john@example.com",
     "password": "yourpassword"
   }
   ```

### 3. Create a New Post
- **Method**: POST
- **Endpoint**: `/api/post/new`
- **Body**: 
   ```json
   {
     "caption": "This is a new post",
     "image": "image-file"
   }
   ```
   
### 4. Send a Message
- **Method**: POST
- **Endpoint**: `/api/messages`
- **Body**: 
   ```json
   {
     "recipientId": "<recipient-id>",
     "message": "Hello, how are you?"
   }
   ```

## Contributing

If you'd like to contribute to this project, please fork the repository and submit a pull request. Ensure that your code follows the existing style and includes tests for new features.

---

Feel free to update the repository and project-specific details to match your actual setup. This will help other developers (or yourself in the future) understand the structure and purpose of your project!

---

## Screenshots

![](https://github.com/kvk1999/social-media-platform/blob/main/images/Screenshot%202024-12-19%20231723.png)
![](https://github.com/kvk1999/social-media-platform/blob/main/images/Screenshot%202024-12-19%20231739.png)
![](https://github.com/kvk1999/social-media-platform/blob/main/images/Screenshot%202024-12-19%20231749.png)
![](https://github.com/kvk1999/social-media-platform/blob/main/images/Screenshot%202024-12-19%20232844.png)
![](https://github.com/kvk1999/social-media-platform/blob/main/images/Screenshot%202024-12-20%20000602.png)
![](https://github.com/kvk1999/social-media-platform/blob/main/images/Screenshot%202024-12-20%20000644.png)
![](https://github.com/kvk1999/social-media-platform/blob/main/images/Screenshot%202024-12-20%20010008.png)