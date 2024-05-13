These API allows you to manage tasks with functionalities like creating, updating, deleting, filter, sort and retrieving tasks .

Table of Contents

Installation
Usage
Endpoints
Dependencies
Contributing
License

Installation
1.Clone the repository : git clone https://github.com/vadivelansmart/News-Aggregator.git
2.Navigate to the project directory: cd News-Aggregator
3.Install dependencies using npm install.

Endpoints

### POST user/register

- Registers a new user
- Expects a JSON object with `fullName`, `email`, `password`, and `role` properties
- Hashes the password using bcrypt
- Saves the user to the database
- Returns a success message if the user is registered successfully

### POST user/login

- Authenticates a user
- Expects a JSON object with `email` and `password` properties
- Finds the user by email
- Compares the provided password with the hashed password in the database using bcrypt
- If the password is valid, generates a JWT token
- Returns the user ID, success message, and the JWT token

### GET user/preferences

- Retrieves the preferences for the authenticated user
- Requires a valid JWT token in the `Authorization` header
- Finds the preferences for the user based on the user ID in the token
- Returns the preferences

### POST user/preferences

- Creates or updates the preferences for the authenticated user
- Requires a valid JWT token in the `Authorization` header
- Expects a JSON object with `preferences` property
- Creates a new preferences document with the user ID and preferences
- Returns a success message if the preferences are saved successfully

### PUT user/preferences

- Updates the preferences for the authenticated user
- Requires a valid JWT token in the `Authorization` header
- Expects a JSON object with `preferences` property
- Finds the existing preferences for the user based on the user ID in the token
- Updates the preferences with the new data
- Saves the updated preferences
- Returns a success message if the preferences are updated successfully

### GET news/

- Retrieves news articles based on user preferences
- Requires a valid JWT token in the `Authorization` header
- Fetches user preferences from the database
- Constructs a URL with the user's preferred news sources
- Makes a GET request to the MediaStack API
- Returns the news data in JSON format

### Usage

1.Start the server: npm start 2.Access the API endpoints at http://localhost:3000 by using a tool like Postman.

## Dependencies

- express
- bcrypt
- jsonwebtoken	
- mongoose
- axios

## Models

### User

- `fullName`: String
- `email`: String
- `password`: String
- `role`: String

### Preferences

- `user`: ObjectId (reference to User model)
- `preferences`: Object

## Middleware

- `jwtUtil`: Provides functions for signing and verifying JWT tokens

## Environment Variables

- `BING_KEY`: API key for accessing the MediaStack. 
- `DATABASE_URL`: MongoDB connection string.


## Error Handling

- If an error occurs during any of the operations, a 500 Internal Server Error response is returned with the error message.
- Specific error messages are provided for invalid login credentials and user not found.

## Authentication

- The `/preferences` endpoints require a valid JWT token in the `Authorization` header for authentication.
- The `verifyToken` middleware is used to verify the token and extract the user ID from it.

## Usage

1. Install the required dependencies: `npm install express bcrypt jsonwebtoken`
2. Set up the necessary environment variables for the database connection and JWT secret.
3. Import the user router in your main Express app and mount it on the desired route.
4. Start the server and use the API endpoints as per the documentation.