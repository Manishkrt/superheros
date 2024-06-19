import { baseURL, publicKey, privateKey, generateHash } from './private.js'

let favoriteList = []

function updateFavListFunc() {
    const list = localStorage.getItem('favoriteList')
    if (list) {
        favoriteList = JSON.parse(list)
    }
}
updateFavListFunc()

async function favoriteFetchData() {
    const ts = Date.now().toString();
    const hash = generateHash(ts);
    const apiUrl = `${baseURL}`;
    const tsUrl = `?ts=${ts}&apikey=${publicKey}&hash=${hash}` 
    let promises = favoriteList.map(superId => fetch(`${apiUrl}/${superId}${tsUrl}`).then(response => response.json()));

    try {
        let results = await Promise.all(promises);
        let flattenedResults = results.flatMap(result => result.data.results);
        displaySuperheroes(flattenedResults)
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export const displaySuperheroes = (superheroes) => {
    const superheroesContainer = document.getElementById('superheroesContainer');
    superheroesContainer.innerHTML = '';
    if (superheroes?.length > 0)
        superheroes.forEach(superhero => {
            const card = document.createElement('div');
            card.classList.add('col-lg-2', 'col-md-3', 'col-sm-4', 'col-6', 'mb-3');
            card.innerHTML = ` 
                    <div class="card">
                    <a href='/superhero.html?id=${superhero.id}' >
                    <img src="${superhero.thumbnail.path}/portrait_uncanny.${superhero.thumbnail.extension}" alt="${superhero.name}" class="img-fluid">
                    </a>
                    <div class="card-body ">
                        <h5 class="card-title"><a href='/superhero.html' >${superhero.name}<a/></h5> 
                        <button class="favorite-btn btn btn-danger btn-sm" data-id="${superhero.id}" >Remove from Favorites</button>
                    </div> 
                    </div>
        `;
            superheroesContainer.appendChild(card);
        })
    else {
        superheroesContainer.innerHTML = `   <div class="d-flex align-items-center justify-content-center mt-5 text-center">
                    <div class="rounded card p-3">
                        <h2>No Favorite List</h2>
                        <p>Choose your favorite character by <a href="/index.html">click here. </a></p>
                    </div>    
                </div>`
    }

    document.querySelectorAll('.favorite-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const superheroId = event.target.getAttribute('data-id');
            // addToFavorites(superheroId); 
            removeFavorites(superheroId);
        });
    });
}

// this is function for add superhero to favorites
function removeFavorites(superheroId) {
    const removeIndex = favoriteList.indexOf(superheroId)
    favoriteList.splice(removeIndex, 1)
    const totalFavorites = JSON.stringify(favoriteList)
    localStorage.setItem('favoriteList', totalFavorites)
    updateFavListFunc()
    favoriteFetchData()
}

favoriteFetchData()