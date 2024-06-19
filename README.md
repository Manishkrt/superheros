# Superhero Hunter App

## Overview

Superhero Hunter App is a web application that allows users to search for their favorite superheroes using the Marvel API. Users can view detailed information about each superhero and add them to their favorites list. The favorites list is persistent across browser sessions.

## Features

- **Search Superheroes**: Fetch and display a list of superheroes based on the search query.
- **Superhero Details**: View detailed information about a selected superhero including their comics, series, stories, and events.
- **Favorite Superheroes**: Add superheroes to a favorites list, view the list, and remove superheroes from it. The favorites list is saved in local storage.

## Technologies Used

- HTML
- CSS (Bootstrap for styling)
- JavaScript (Vanilla)
- Marvel API
- CryptoJS for generating MD5 hash (via CDN)

## Getting Started

### Prerequisites

- A Marvel Developer account and API keys.

### Installation

1. Clone the repository:
    git clone https://github.com/yourusername/superhero-hunter-app.git 

2. Replace the placeholders `YOUR_PUBLIC_KEY` and `YOUR_PRIVATE_KEY` in the JavaScript files with your Marvel API keys.

### Usage

1. Open `index.html` in a web browser to use the Superhero Hunter App.
2. Use the search bar to find your favorite superheroes.
3. Click on any superhero to view detailed information.
4. Click the "Add to Favorites" button to save the superhero to your favorites list.
5. Navigate to the "My Favorite Superheroes" page to view and manage your favorites.

## Project Structure

- `index.html`: Main page of the app with the search functionality.
- `superhero.html`: Page for displaying detailed information about a selected superhero.
- `favorites.html`: Page for displaying and managing the favorite superheroes list.
- `app.js`: JavaScript file for main page functionality (search, display superheroes, add to favorites).
- `details.js`: JavaScript file for superhero details page functionality.
- `favorites.js`: JavaScript file for favorite superheroes page functionality.
- `styles.css`: Custom styles for the app.

## API Usage

The app uses the Marvel API to fetch superhero data. To make authorized requests, it generates an MD5 hash using a timestamp, public key, and private key as described in the [Marvel API documentation](https://developer.marvel.com/documentation/authorization).

### Example API Request

```javascript
const baseURL = 'https://gateway.marvel.com:443/v1/public/characters';
const publicKey = 'YOUR_PUBLIC_KEY';
const privateKey = 'YOUR_PRIVATE_KEY';
const ts = Date.now().toString();
const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();
const apiUrl = `${baseURL}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

 