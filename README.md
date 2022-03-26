# Portfolio Tracker

## Overview
A web-based app that allows users to store and view all their stock holdings from one central dashboard.

Users can easily add their stock data consisting of each stock's **code**, **company name**, **number of units** and their average **purchase price**.

The project uses React.JS with TypeScript to display frontend content to the user. 
The client accesses various .NET(C#) backend APIs for user authentication and stock creation/modification. 
The backend retrieves User and Holding data from a SQLite database using .NET EntityFramework.

## Future Features
- Cryptocurrency/Cash/Super holding options
- Google/Facebook/Discord gogins
- Pie charts showing holding distribution across asset class and industry
- Line chart showing user wealth over time

## Required Technologies
- .NET version 5.0.400
- React version 17.0.2
- SQLite VSCode Extension

## How to Run
### Frontend Client
1. Navigate to project root directory through terminal
2. Navigate to frontend folder `cd frontend`
3. Run the frontend client `npm start`
4. Open your web browser and go to `http://localhost:3000`

### Backend Server
1. Navigate to project root directory through terminal
2. Navigate to backend folder `cd backend`
3. Run the backend server `dotnet run`

## Contributors
- Jonathon Mitterbacher
	- https://github.com/JonoMitter
	- https://www.linkedin.com/in/jonomitter/

- Richard Gao
	- https://github.com/Soupraa
	- https://www.linkedin.com/in/richard-gao-417404208/