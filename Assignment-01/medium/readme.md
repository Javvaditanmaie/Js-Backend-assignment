2. **Database Connection:**
    - When your server starts, it logs a "MongoDB Connected" message.
    - In your MongoDB Atlas dashboard, under "Collections," you can see that the `vibecheck` database has been created with empty `users` and `vibes` collections.
   ![image](https://github.com/user-attachments/assets/767714ba-c184-4315-a089-814752666015)

3. **User Signup:**
    - Making a `POST` request to `/api/v1/auth/signup` with a new user's `username`, `email`, and `password` in the body:
        - Returns a `201 Created` (or `200 OK`) status.
        - Returns a JSON body containing a valid JWT token.
        - In MongoDB Atlas, you can see a new document in the `users` collection. **Crucially, the `password` field in the database should be a long, hashed string, NOT the plain text password you sent.**
![image](https://github.com/user-attachments/assets/4a1a9986-554b-479b-a9b4-26b534c75ab3)
4. **User Login:**
    - Making a `POST` request to `/api/v1/auth/login` with the correct credentials for the user you just created:
        - Returns a `200 OK` status.
        - Returns a JSON body containing a valid JWT token.
    - Trying to log in with the wrong password returns a `401 Unauthorized` status.
  ![image](https://github.com/user-attachments/assets/9c7ac471-fb5a-495b-919e-8a43b43b8d45)
![image](https://github.com/user-attachments/assets/561d645b-f9b9-4f4a-84a3-7ac6c9fa5b7b)
5. **Protected Route - Posting a Vibe:**
    - Make a `POST` request to `/api/v1/vibes` with valid vibe data in the body **but without an `Authorization` header**.
        - This MUST fail with a `401 Unauthorized` status.
    - Make the same `POST` request again, but this time add the `Authorization` header with `Bearer <your_jwt_token>`.
        - This MUST succeed with a `201 Created` status.
        - The response body should contain the newly created vibe object.
        - In MongoDB Atlas, you can see a new document in the `vibes` collection, and its `user` field should contain the `ObjectId` of the user who posted it.
  
![Screenshot 2025-06-23 122623](https://github.com/user-attachments/assets/871e74ec-52aa-4f22-b34c-363c9335006d)
![Screenshot 2025-06-23 123039](https://github.com/user-attachments/assets/82caa7ca-b556-4c7c-84c0-788aff189fa4)
