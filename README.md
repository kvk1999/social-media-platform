Here’s a full `README.md` for your Social Media API, including routes for user registration, login, posts, stories, profile management, and more:

```markdown
# Social Media API

Welcome to the Social Media API! This API provides routes for user management, posts, stories, comments, and more. It's built using Express, with JWT authentication for secure access to protected routes. 

## Table of Contents

- [Authentication](#authentication)
- [User Routes](#user-routes)
- [Post Routes](#post-routes)
- [Story Routes](#story-routes)
- [Profile Routes](#profile-routes)
- [Friend Routes](#friend-routes)
- [File Upload and Image Handling](#file-upload-and-image-handling)
- [Error Handling](#error-handling)

---

## Authentication

### 1. **Register User**
- **Route**: `POST /api/auth/register`
- **Description**: Register a new user.
- **Authorization Required**: No
- **Body**:
  - `name`: Full name of the user.
  - `email`: User's email address.
  - `password`: Password for the user.
  - `gender`: User's gender.
  - `file`: Profile picture (optional).
- **Example Request**:
  ```bash
  POST /api/auth/register
  {
    "name": "Alice Johnson",
    "email": "alice.johnson@gmail.com",
    "password": "1234567890",
    "gender": "female",
    "file": "/D:/tumblr_7c8303d19ea0a513e48b5b3795cb3ecc_95a2e82f_640.jpg"
  }
  ```

### 2. **Login**
- **Route**: `POST /api/login`
- **Description**: Log in a user to get a JWT token.
- **Authorization Required**: No
- **Body**:
  - `email`: User's email address.
  - `password`: User's password.
- **Example Request**:
  ```bash
  POST /api/login
  {
    "email": "craig.white@example.com",
    "password": "1"
  }
  ```

### 3. **Logout**
- **Route**: `POST /api/logout`
- **Description**: Log out the user.
- **Authorization Required**: Yes (JWT Token)

---

## Post Routes

### 1. **Create New Post**
- **Route**: `POST /api/post/new`
- **Description**: Create a new post.
- **Authorization Required**: Yes (JWT Token)
- **Example Request**:
  ```bash
  POST /api/post/new
  {
    "caption": "Excited about this new post!",
    "file": "/path/to/file.jpg"
  }
  ```

### 2. **Edit Post Caption**
- **Route**: `PUT /api/post/:id`
- **Description**: Edit the caption of an existing post by its `id`.
- **Authorization Required**: Yes (JWT Token)
- **Example Request**:
  ```bash
  PUT /api/post/12345
  {
    "caption": "Updated caption"
  }
  ```

### 3. **Delete Post**
- **Route**: `DELETE /api/post/:id`
- **Description**: Delete a post by its `id`.
- **Authorization Required**: Yes (JWT Token)
- **Example Request**:
  ```bash
  DELETE /api/post/12345
  ```

### 4. **Get All Posts**
- **Route**: `GET /api/post/all`
- **Description**: Get all posts.
- **Authorization Required**: Yes (JWT Token)
- **Example Request**:
  ```bash
  GET /api/post/all
  ```

### 5. **Like/Unlike a Post**
- **Route**: `POST /api/post/like/:id`
- **Description**: Like or unlike a post by its `id`.
- **Authorization Required**: Yes (JWT Token)
- **Example Request**:
  ```bash
  POST /api/post/like/12345
  ```

### 6. **Comment on a Post**
- **Route**: `POST /api/post/comment/:id`
- **Description**: Add a comment to a post.
- **Authorization Required**: Yes (JWT Token)
- **Example Request**:
  ```bash
  POST /api/post/comment/12345
  {
    "comment": "Great post!"
  }
  ```

### 7. **Delete a Comment**
- **Route**: `DELETE /api/post/comment/:id`
- **Description**: Delete a comment on a post by its `id`.
- **Authorization Required**: Yes (JWT Token)
- **Example Request**:
  ```bash
  DELETE /api/post/comment/12345
  ```

---

## Story Routes

### 1. **Create a New Story**
- **Route**: `POST /api/story/new`
- **Description**: Create a new story.
- **Authorization Required**: Yes (JWT Token)
- **Example Request**:
  ```bash
  POST /api/story/new
  {
    "content": "This is my new story!",
    "file": "/path/to/storyFile.jpg"
  }
  ```

### 2. **Get All Stories**
- **Route**: `GET /api/story/all`
- **Description**: Get all stories.
- **Authorization Required**: Yes (JWT Token)
- **Example Request**:
  ```bash
  GET /api/story/all
  ```

### 3. **Get Story By Id**
- **Route**: `GET /api/story/:id`
- **Description**: Get a story by its `id`.
- **Authorization Required**: Yes (JWT Token)
- **Example Request**:
  ```bash
  GET /api/story/12345
  ```

### 4. **Delete a Story**
- **Route**: `DELETE /api/story/:id`
- **Description**: Delete a story by its `id`.
- **Authorization Required**: Yes (JWT Token)
- **Example Request**:
  ```bash
  DELETE /api/story/12345
  ```

---

## Profile Routes

### 1. **Get My Profile**
- **Route**: `GET /api/user/me`
- **Description**: Get the authenticated user's profile data.
- **Authorization Required**: Yes (JWT Token)
- **Example Request**:
  ```bash
  GET /api/user/me
  ```

### 2. **Get Another User's Profile**
- **Route**: `GET /api/user/:id`
- **Description**: Get the profile of a user by their `id`.
- **Authorization Required**: Yes (JWT Token)
- **Example Request**:
  ```bash
  GET /api/user/12345
  ```

### 3. **Update Profile**
- **Route**: `PUT /api/user/:id`
- **Description**: Update the profile (e.g., upload a new profile picture).
- **Authorization Required**: Yes (JWT Token)
- **Example Request**:
  ```bash
  PUT /api/user/12345
  {
    "name": "Updated Name",
    "profilePic": "/path/to/newProfilePic.jpg"
  }
  ```

### 4. **Update Password**
- **Route**: `POST /api/user/:id/password`
- **Description**: Update the password of a user by their `id`.
- **Authorization Required**: Yes (JWT Token)
- **Example Request**:
  ```bash
  POST /api/user/12345/password
  {
    "newPassword": "newSecurePassword123"
  }
  ```

---

## Friend Routes

### 1. **Follow or Unfollow a User**
- **Route**: `POST /api/user/follow/:id`
- **Description**: Follow or unfollow a user by their `id`.
- **Authorization Required**: Yes (JWT Token)
- **Example Request**:
  ```bash
  POST /api/user/follow/12345
  ```

### 2. **Get Follower and Following Data**
- **Route**: `GET /api/user/followdata/:id`
- **Description**: Get follower and following data for a user.
- **Authorization Required**: Yes (JWT Token)
- **Example Request**:
  ```bash
  GET /api/user/followdata/12345
  ```

---

## File Upload and Image Handling

Certain routes allow file uploads, such as profile pictures or post images. Files are typically handled via a file system or cloud storage service, depending on the implementation.

---

## Error Handling

The API uses consistent error messages to handle various issues such as unauthorized access, validation errors, and others. Each error response includes a `message` key to describe the error.

**Example Error Response:**
```json
{
  "message": "Unauthorized"
}
```

---

## Conclusion

This API enables a full-fledged social media experience where users can manage their profiles, create posts, interact with stories, and more. The JWT-based authentication ensures secure access to the platform's features.

For further assistance or inquiries, feel free to contact the project maintainers!

---

End of README.
```

This README provides clear documentation for your Social Media API, with descriptions of each route, request examples, and authentication requirements. Let me know if you need any adjustments or additional details!



```
# Here's Hoppscotch API documentation
```
```
# Here's Preview API documentation
```

<p align="center">
<a src="./images/Screenshot 2024-12-16 233327.png>


```
# URL: https://social-media-platform-8hz1.onrender.com/
```