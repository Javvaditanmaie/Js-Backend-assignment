2. **Server is Running:**
    - Running `node server.js` in your terminal starts the server without errors and logs a message like `🚀 Server blasting off on port 5000`
   
   ![image](https://github.com/user-attachments/assets/c181ab44-f616-4849-a785-d7230c907438)
   3. **Root Endpoint:**
    - Making a `GET` request to `http://localhost:5000/` returns a `200 OK` status and an HTML/text welcome message
  
   ![image](https://github.com/user-attachments/assets/853d36ce-e246-4d08-bd26-da3676b966c2)

4. **Get All Vibes Endpoint:**
    - Making a `GET` request to `http://localhost:5000/api/v1/vibes` returns:
        - A status code of `200 OK`.
        - A `Content-Type` header of `application/json`.
        - A JSON body that is an array containing all three of your `sampleVibes` objects.
      
![image](https://github.com/user-attachments/assets/62562dae-a9a7-410e-a4d7-670cc643f475)
5. **Get Single Vibe Endpoint (Success Case):**
    - Making a `GET` request to `http://localhost:5000/api/v1/vibes/2` returns:
        - A status code of `200 OK`.
        - A JSON body containing only the single vibe object with `id: 2`.
        
 ![image](https://github.com/user-attachments/assets/3f18e2bc-5523-4be6-95e8-74dc41593789)
6. **Get Single Vibe Endpoint (Failure Case):**
    - Making a `GET` request to `http://localhost:5000/api/v1/vibes/99` (or any ID that doesn't exist) returns:
        - A status code of `404 Not Found`.
        - A JSON body with an error message, e.g., `{ "success": false, "message": "That vibe is off the grid, not found." }`.
        
![image](https://github.com/user-attachments/assets/75dac9ed-7335-4dd5-9282-86d575007895)
