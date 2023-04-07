# Blog Application With Socket.io

To start the Express server, run the command `npm start`. To start the React server, run the command `npm run dev`.

This is a simple application that uses cors to allow the frontend's origin to work with the backend. The server listens on port 4000 and uses `socket.io` and `novu` for real-time notifications.

## Technologies Used

- Express.js
- React.js
- CORS
- Socket.io
- Novu

## Usage

1. Clone the repository: `git clone <repository_url>`
2. Install dependencies: `npm install`
3. Start the Express server: `npm start`
4. Start the React server: `npm run dev`
5. Open `http://localhost:3000` in your browser to view the application.

## Notes

- If you encounter any issues with CORS, be sure to check the configuration in the backend code.
- The application is currently set up to use port 4000 for the backend server. If you need to change the port, be sure to update the `server.listen` call in the backend code.
- `socket.io` is used for real-time communication between the server and the client. Be sure to check the configuration in the backend and client code to ensure that it is set up correctly.
- `novu` is used for real-time notifications. Be sure to check the configuration in the backend code to ensure that it is set up correctly.
