# MovieRoulette 🎬🎡

Discover your next favorite movie with this fun, interactive web app that randomly selects films based on your preferences!

![MovieRoulette Screenshot](screenshot.png)

## Features ✨

- 🎲 Get random movie recommendations
- 🎭 Filter by genre, release year, and rating
- ⭐ Interactive star rating selector
- 🎰 Fun roulette-style animation
- 🍿 Detailed movie information display
- 🎨 Vibrant, full-screen design with custom color palette
- 📱 Fully responsive for all device sizes

## Tech Stack 💻

**Frontend:**
- HTML5, CSS3, JavaScript
- Font Awesome icons
- Google Fonts (Poppins)

**Backend:**
- Python
- Flask
- TMDB API

---

## Project Structure
MovieRoulette/
├── app.py                # Flask application
├── requirements.txt      # Python dependencies
├── .env                  # Environment variables
├── .gitignore
├── README.md
├── static/
│   ├── style.css         # Main styles
│   └── script.js         # Client-side functionality
└── templates/
    └── index.html        # Main page template


## Setup Instructions

1. **Clone the repository**
   ```
   git clone https://github.com/yourusername/MovieRoulette.git
   cd MovieRoulette
   ```
2. Create and activate a virtual environment:
```
   python -m venv venv
   source venv/bin/activate # On Windows: venv\Scripts\activate
```
3. Install dependencies
```
   pip install -r requirements.txt
```
4. Set up TMDB API: 
   Create an account and get your API key from https://www.themoviedb.org/

5. Create a .env file in the project root and add:
```
   TMDB_API_KEY=your_tmdb_api_key_here
```
6. Run the app:
```
   python app.py
```
5. Then open your browser to: 
   http://127.0.0.1:5000

