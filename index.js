const pgAnterior = document.getElementById('pgAnterior');
const pgSiguiente = document.getElementById('pgSiguiente');
const pgUpComing = document.getElementById('upComing');
const pgTopRated = document.getElementById('topRated');
const pgPopular = document.getElementById('popular');
const search = document.getElementById('search');
const searchForm = document.getElementById('searchForm');
const boxPagina = document.getElementById('numPagina');

let pagina = 1;
let tipo = 'popular';

const mainUrl ='https://api.themoviedb.org/3/'
const apiKey = '?api_key=dd058bc5c64d32c16ae5cb314ede12b5'
const esEs = `&language=es-ES&page=`
const imgUrl = 'https://image.tmdb.org/t/p/w500/'
const urlSearch = `${mainUrl}search/movie${apiKey}&query=`
// let url = `${mainUrl}movie/${tipo}${apiKey}${esEs}`;

const changePage = () => {
    boxPagina.value = pagina;
}
pgUpComing.addEventListener('click', () => {
    tipo = 'upcoming';
    pagina = 1;
    cargarPeliculas(`${mainUrl}movie/${tipo + apiKey + esEs + pagina}`);
});
pgTopRated.addEventListener('click', () => {
    tipo = 'top_rated';
    pagina = 1;
    cargarPeliculas(`${mainUrl}movie/${tipo + apiKey + esEs + pagina}`);
});
pgPopular.addEventListener('click', () => {
    tipo = 'popular';
    pagina = 1;
    cargarPeliculas(`${mainUrl}movie/${tipo + apiKey + esEs + pagina}`);
});

pgAnterior.addEventListener('click', () => {
    if (pagina > 1) {
        pagina += -1;
        boxPagina.innerHTML = pagina;
        cargarPeliculas(`${mainUrl}movie/${tipo + apiKey + esEs + pagina}`);
    }
});

pgSiguiente.addEventListener('click', () => {
    if (pagina < 1000) {
        pagina += 1;
        boxPagina.innerHTML = pagina; 
        cargarPeliculas(`${mainUrl}movie/${tipo + apiKey + esEs + pagina}`);
        
    }
})
const getMovies = () => {
    const valBuscado = search.value;
    cargarPeliculas(urlSearch + valBuscado + esEs + pagina);
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    getMovies();
});

const cargarPeliculas = async (apiUrl) => {
    try {
        const respuesta = await fetch(apiUrl);	
        
        if (respuesta.status === 200) {
            const datos = await respuesta.json();
            let peliculas = '';

            datos.results.forEach(pelicula => {
                
                if (pelicula.poster_path !== null) {
                    const date = new Date(pelicula.release_date);
                    peliculas += `
                    <div class="boxPelicula">
                        <div class="pelicula">
                            <div class="description">
                                <h6>${pelicula.title}</h6>
                                <p>${pelicula.overview}</p>
                            </div>
                            <img src="${imgUrl}${pelicula.poster_path}" alt="${pelicula.title}">
                        </div>
                        <div class="dateAverage">
                            <span><p class="fa-solid fa-calendar"> ${date.getFullYear()}</p></span>
                            <span><p class="fa-solid fa-star"> ${pelicula.vote_average}</p></span> 
                        </div>
                    </div>
                `;
                }
            });

            document.getElementById('container').innerHTML = peliculas;
            
        } else if (respuesta.status === 404) {
            console.log('No se encontró la película');
        } else if (respuesta.status === 401) {
            console.log('Algo va mal')
        } else {
            console.log('No sabemos que pasó')
        }

    } catch (error) {
        console.log(error)
    }
};

cargarPeliculas(`${mainUrl}movie/popular${apiKey + esEs + pagina}`);