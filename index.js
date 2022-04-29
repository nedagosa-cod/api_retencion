const pgAnterior = document.getElementById('pgAnterior');
const pgSiguiente = document.getElementById('pgSiguiente');
const pgUpComing = document.getElementById('upComing');
const pgTopRated = document.getElementById('topRated');
const pgPopular = document.getElementById('popular');

let tipo = 'popular'
let pagina = 1;

pgUpComing.addEventListener('click', () => {
    tipo = 'upcoming';
    pagina = 1;
    cargarPeliculas();
});
pgTopRated.addEventListener('click', () => {
    tipo = 'top_rated';
    pagina = 1;
    cargarPeliculas();
});
pgPopular.addEventListener('click', () => {
    tipo = 'popular';
    pagina = 1;
    cargarPeliculas();
});

pgAnterior.addEventListener('click', () => {
    if (pagina > 1) {
        pagina += -1;
        cargarPeliculas();
    }
});

pgSiguiente.addEventListener('click', () => {
    if (pagina < 1000) {
        pagina += 1;
        cargarPeliculas();
    }
})

const cargarPeliculas = async () => {
    try {

        const mainUrl ='https://api.themoviedb.org/3/movie/'
        const apiKey = '?api_key=dd058bc5c64d32c16ae5cb314ede12b5'
        
        const url = `${mainUrl}${tipo}${apiKey}&language=es-ES&page=${pagina}`;
        
        const respuesta = await fetch(url);	

        if (respuesta.status === 200) {
            const datos = await respuesta.json();

            let peliculas = '';

            datos.results.forEach(pelicula => {
                peliculas += `
                    <div class="pelicula">
                        <div class="description">
                            <h6>${pelicula.title}</h6>
                            <p>${pelicula.overview}</p>
                        </div>
                        <img src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                    </div>
                `;
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

cargarPeliculas();