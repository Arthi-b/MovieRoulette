# MovieRoulette

**MovieRoulette** is a full-stack web application that lets users discover a random movie based on optional filters like genre, release year range, and rating. Users can also skip filters entirely by clicking the "Feeling Lucky" button. The app uses the TMDB API to fetch live movie data and includes a roulette-style animation for a fun and engaging experience.

---

## Features

- Filter movies by genre, release year, and rating
- "Feeling Lucky" mode selects a completely random movie
- Roulette-style animation before displaying the selected movie
- Responsive design optimized for both desktop and mobile
- Integrates with the TMDB API for up-to-date movie data

---

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Python, Flask
- External API: The Movie Database (TMDB)
- Deployment: Render
- Environment Management: python-dotenv

---

## Project Structure

MovieRoulette/
│
├── app.py # Flask backend logic
├── requirements.txt # Python dependencies
├── .env # Environment variables (API key)
│
├── templates/
│ └── index.html # HTML frontend
│
├── static/
│ ├── script.js # JavaScript for interactivity
│ ├── style.css # Custom styling
│ └── spinner.gif # Loading animation



## Setup Instructions

1. **Clone the repository**
   ```
   git clone https://github.com/yourusername/MovieRoulette.git
   cd MovieRoulette
   ```
Create and activate a virtual environment:
```
python -m venv venv
source venv/bin/activate # On Windows: venv\Scripts\activate
```
Install dependencies
```
pip install -r requirements.txt
```
Set up TMDB API: 
Create an account and get your API key from https://www.themoviedb.org/

Create a .env file in the project root and add:
```
TMDB_API_KEY=your_tmdb_api_key_here
```
Run the app:
```
python app.py
Then open your browser to http://127.0.0.1:5000
```
