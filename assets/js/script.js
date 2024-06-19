// import {displaySuperheroes} from './display.js'
// const baseURL = 'https://gateway.marvel.com:443/v1/public/characters';
// const publicKey = 'e44bbf090c18c1c4920c47559c61d706';
// const privateKey = '156a2d00a893f982b1202aad11a2f68b193a7e2a'; 
import {baseURL, publicKey, privateKey, generateHash} from './private.js'
let favoriteList = []

const searchForm = document.getElementById('searchForm')
searchForm.addEventListener('submit', async(e) => {
    e.preventDefault()
    const searchTerm = document.getElementById('searchInput');
     fetchSuperheroes(searchTerm.value)
    searchTerm.value = '';
})





function updateFavListFunc() {
    const list = localStorage.getItem('favoriteList') 
    if (list) {
        favoriteList = JSON.parse(list) 
    }
}
updateFavListFunc()

async function fetchSuperheroes(searchTerm = '') {
    try {

        const ts = Date.now().toString();
        const hash = generateHash(ts);
        let apiUrl = `${baseURL}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
        if (searchTerm) { 
            apiUrl = `${apiUrl}&nameStartsWith=${searchTerm}`;
        }
        let response = await fetch(apiUrl)
        response = await response.json()  
        const finalResponse = response?.data?.results
        if (finalResponse) {
            displaySuperheroes(finalResponse)
        }
    } catch (error) {
        console.log(error);
    }
}
 

// this is fnction for display superhero to home page 
export const displaySuperheroes = (superheroes)=>{
    const superheroesContainer = document.getElementById('superheroesContainer');
    superheroesContainer.innerHTML = ''; 
    if(superheroes?.length > 0)
    superheroes.forEach(superhero => {
        const card = document.createElement('div');
        card.classList.add('col-lg-2', 'col-md-3', 'col-sm-4', 'col-6', 'mb-3');
        card.innerHTML = ` 
                    <div class="card">
                    <a href='/superhero.html?id=${superhero.id}' >
                    <img src="${superhero.thumbnail.path}/portrait_uncanny.${superhero.thumbnail.extension}" alt="${superhero.name}" class="img-fluid">
                    </a>
                    <div class="card-body ">
                        <h5 class="card-title"><a href='/superhero.html?id=${superhero.id}' >${superhero.name}<a/></h5> 
                        <button class="favorite-btn btn btn-primary btn-sm" data-id="${superhero.id}" >Add to Favorites</button>
                    </div> 
                    </div>
        `; 
        superheroesContainer.appendChild(card);
    })
    else{ 
        superheroesContainer.innerHTML = `
        
        ` 
    }

    document.querySelectorAll('.favorite-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const superheroId = event.target.getAttribute('data-id'); 
            addToFavorites(superheroId); 
        });
    });
}

// this is function for add superhero to favorites
function addToFavorites(superheroId) {
    const isAvailable = favoriteList.includes(superheroId) 
    if (!isAvailable) {
        favoriteList.push(superheroId)
        const totalFavorites = JSON.stringify(favoriteList)
        localStorage.setItem('favoriteList', totalFavorites)
        showAlertSuccess()
        updateFavListFunc()
    }
    else{
        showAlertFailed()
        
    }
} 

// these are function for alert when superhero is added to favorites
function showAlertSuccess() {
    Swal.fire({
        title: 'Success',
        text: 'Superhero added to favorite list',
        icon: 'success',
        timer: 1000,
        showConfirmButton: false
    });
}
function showAlertFailed() {
    Swal.fire({
        title: 'Error',
        text: 'Superhero already added to favorite list',
        icon: 'error',
        timer: 1000,
        showConfirmButton: false
    });
}




fetchSuperheroes()