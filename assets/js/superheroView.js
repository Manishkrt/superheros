import { baseURL, publicKey, generateHash } from './private.js'
 

async function fetchSuperheroDetails(superHeroId) {
    console.log("hit fetch", superHeroId);

    const ts = Date.now().toString();
    const hash = generateHash(ts);
    const apiUrl = `${baseURL}`;
    const tsUrl = `?ts=${ts}&apikey=${publicKey}&hash=${hash}`
    if (superHeroId) {
        let responseData = await fetch(`${apiUrl}/${superHeroId}${tsUrl}`).then(response => response.json())
        console.log("responseData", responseData);
        if (responseData.status == "Ok") {
            displaySuperheroes(responseData.data.results[0])
        }
    }
}

export const displaySuperheroes = (superheroDetails) => {
    console.log("superheroDetails", superheroDetails);
    const detailsContainer = document.getElementById('superheroesContainer');
    detailsContainer.innerHTML = `
        <div class="col-lg-6 col-md-6 col-12">
                <div class="card">
                    <img src="${superheroDetails.thumbnail.path}/portrait_uncanny.${superheroDetails.thumbnail.extension}" alt="${superheroDetails.name}">
                </div>
            </div>
            <div class="col-lg-6 col-md-6 col-12"> 
                <h2 class="text-primary-dark">${superheroDetails.name}</h2>
                <p class="text-muted">${superheroDetails.description}</p> 
                <h3>Comics</h3>
                <ul>
                    ${superheroDetails.comics.items.map(comic => `<li>${comic.name}</li>`).join('')}
                </ul>
                <h3>Series</h3>
                <ul>
                    ${superheroDetails.series.items.map(series => `<li>${series.name}</li>`).join('')}
                </ul>
                <h3>Stories</h3>
                <ul>
                    ${superheroDetails.stories.items.map(story => `<li>${story.name}</li>`).join('')}
                </ul>
                <h3>Events</h3>
                <ul>
                    ${superheroDetails.events.items.map(event => `<li>${event.name}</li>`).join('')}
                </ul> 
            </div>
    `;
    

}

function getSuperheroIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Initialize the details page
function initDetails() {
    const superheroId = getSuperheroIdFromUrl();
    if (superheroId) {
        fetchSuperheroDetails(superheroId);
    } else {
        console.error('No superhero ID found in URL');
    }
}
initDetails() 