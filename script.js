const btn = document.getElementById('buttons');
const result = document.getElementById('joke-container');

async function getTheme(theme) {
    try {
        const apiUrl = `https://v2.jokeapi.dev/joke/${theme}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Provjera je li odgovor uspješan
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        // Prikaži vic ovisno o tipu
        if (data.type === 'single') {
            result.innerHTML =  `<p class="single" style="color: ${getColor(theme)}">${data.joke}</p>`;
        } else if (data.type === 'twopart') {
            result.innerHTML = `<p class="single" style="color: ${getColor(theme)}">${data.setup}</p> <p>${data.delivery}</p>`;
        }
    } catch (error) {
        console.error('There was a problem fetching the joke:', error.message);
    }
}

const getColor = (theme) => {
    switch(theme){
        case 'any':
            return 'rgb(92, 92, 135)';
            break;
        case 'misc': 
        return 'rgb(151, 207, 76)';
        break;
        case 'programming':
            return 'rgb(244, 66, 66)';
            break;
        case 'dark':
            return 'rgb(245, 129, 71)';
            break;
        case 'pun':
            return 'rgb(224, 227, 85)';
            break;
        case 'spooky':
            return 'rgb(244, 118, 185)';
            break;
        default:
            return 'rgb(28, 157, 138)';
    }
}

btn.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        const theme = event.target.id; // definiramo da je theme isto što i id od button-a koji se klikne
        getTheme(theme);
    }
});

    // trebam na temelju odabrane teme prikazat vic
    // ali ovaj api rai na foru da samo kada je odabrana jedna kategorija onda se prikaže vic
    // dakle ja ne mogu napisat data[0]
