# DevMate

DevMate is a full-stack social networking application designed to connect developers. Inspired by platforms like Tinder, it allows users to discover and match with other developers based on their skills and interests, fostering collaboration and community within the tech space.

## Core Features

-   **Developer Discovery:** A "Tinder-style" card-swiping interface to browse and interact with other developer profiles.
-   **Secure Authentication:** Robust user signup, login, and logout functionality using JWT for session management.
-   **Profile Management:** Users can create, view, and edit their profiles, showcasing their name, age, skills, bio, and profile picture.
-   **Connection System:** A comprehensive system to send "interested" or "ignore" swipes, and to accept or reject incoming connection requests.
-   **Personalized Feed:** An intelligent user feed that excludes profiles the user has already interacted with or is already connected to.
-   **Network Management:** Easily view all established connections and manage pending requests from a dedicated interface.


### Todo - Features

- [x] Swipe Cards Left/Right
- [ ] Opening popup for User details i.e profile url,skills etc
- [ ] Real-time messaging using **Socket.IO**
- [ ] Online/offline developer status
- [ ] Notification system for connection requests
- [ ] UI/UX redesign for better user experience
- [ ] Improved mobile responsiveness
- [ ] Advanced developer filters (skills, tech stack)

## Tech Stack

### Backend

-   **Runtime:** Node.js
-   **Framework:** Express.js
-   **Database:** MongoDB with Mongoose ODM
-   **Authentication:** JSON Web Tokens (JWT) & `cookie-parser`
-   **Password Hashing:** bcrypt.js
-   **Schema Validation:** Zod

### Frontend

-   **Framework:** React (with Vite)
-   **State Management:** Redux Toolkit
-   **Styling:** Tailwind CSS, DaisyUI
-   **Animations:** Framer Motion
-   **Routing:** React Router
-   **HTTP Client:** Axios

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js (v18 or later recommended)
-   npm (or your preferred package manager)
-   MongoDB instance (local or cloud)

### Installation and Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/literalmock/devmate.git
    cd devmate
    ```

2.  **Set up the Backend:**
    ```sh
    cd Backend
    npm install
    ```
    - Ensure your MongoDB server is running.
    - Configure the database connection URI in `Backend/config/database.js`. The default is set to `mongodb://localhost:27017/mydatabase`.
    - Start the backend server:
      ```sh
      npm start
      ```
    The backend will run on `http://localhost:3000`.

3.  **Set up the Frontend:**
    ```sh
    cd ../Frontend
    npm install
    ```
    - Create a `.env` file in the `Frontend` directory with the following content, pointing to your backend server:
      ```env
      VITE_BASE_URL=http://localhost:3000
      ```
    - Start the frontend development server:
      ```sh
      npm run dev
      ```
    The application will be available at `http://localhost:5173`.

## API Endpoints

The backend exposes the following RESTful API endpoints.

#### Authentication (`/auth`)

-   `POST /signup`: Create a new user account.
-   `POST /login`: Log in a user and create a session via an HTTP-only cookie.
-   `POST /logout`: Log out a user and clear the session cookie.

#### Profile (`/profile`)

-   `GET /view`: Get the profile data of the authenticated user.
-   `PATCH /edit`: Update the authenticated user's profile details.
-   `PATCH /password`: Change the authenticated user's password.

#### Requests (`/request`)

-   `POST /sent/:status/:userId`: Send an `interested` or `ignore` request to a user.
-   `POST /review/:status/:requestUserId`: `accept` or `reject` a received connection request.

#### User Data (`/user`)

-   `GET /feed`: Get a paginated list of users for the main feed.
-   `GET /connections`: Get a list of all accepted connections for the current user.
-   `GET /requests/received`: Get a list of all pending incoming connection requests.

## Project Structure

The repository is organized into two main folders: `Backend` and `Frontend`.

```
.
├── Backend/
│   ├── config/       # Database configuration
│   ├── controller/   # Request handling and business logic
│   ├── middleware/   # Authentication middleware
│   ├── models/       # Mongoose data models (User, ConnectionRequest)
│   ├── Routes/       # API route definitions
│   └── app.js        # Express application entry point
└── Frontend/
    ├── public/       # Static assets
    └── src/
        ├── Components/ # Reusable React components (Navbar, TinderCard)
        ├── Layouts/    # Main application layout structure
        ├── Pages/      # Top-level page components (Login, Feed, Profile)
        ├── utils/      # Redux Toolkit store and data slices
        ├── App.jsx     # Main component with React Router setup
        └── main.jsx    # Application entry point
```

## Note

This project primarily focuses on **backend architecture and REST API development**.  
The frontend is intentionally minimal and was not the main focus of the project.
