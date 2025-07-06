from flask import Flask, render_template, request, jsonify
import os
import requests
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
TMDB_API_KEY = os.getenv('TMDB_API_KEY')
BASE_URL = 'https://api.themoviedb.org/3'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get-genres')
def get_genres():
    url = f"{BASE_URL}/genre/movie/list?api_key={TMDB_API_KEY}"
    response = requests.get(url)
    return jsonify(response.json())

@app.route('/get-random-movie', methods=['POST'])
def get_random_movie():
    data = request.json
    params = {
        'api_key': TMDB_API_KEY,
        'language': 'en-US',
        'include_adult': False,
        'page': 1
    }
    
    if data.get('genre'):
        params['with_genres'] = data['genre']
    
    if data.get('year_range'):
        year_from, year_to = data['year_range'].split('-')
        params['primary_release_date.gte'] = f"{year_from}-01-01"
        params['primary_release_date.lte'] = f"{year_to}-12-31"
    
    if data.get('rating_range'):
        rating_from, rating_to = map(float, data['rating_range'].split('-'))
        params['vote_average.gte'] = rating_from
        params['vote_average.lte'] = rating_to
    
    url = f"{BASE_URL}/discover/movie"
    response = requests.get(url, params=params)
    movies = response.json().get('results', [])
    
    if movies:
        import random
        movie = random.choice(movies)
        return jsonify({
            'success': True,
            'movie': movie
        })
    return jsonify({
        'success': False,
        'message': 'No movies found with these filters'
    })

if __name__ == '__main__':
    app.run(debug=True)