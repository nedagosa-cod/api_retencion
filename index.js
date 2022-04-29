const pgAnterior = document.getElementById('pgAnterior');
const pgSiguiente = document.getElementById('pgSiguiente');
let pagina = 1;

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

        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=dd058bc5c64d32c16ae5cb314ede12b5&language=es-ES&page=${pagina}`);	

        if (respuesta.status === 200) {
            const datos = await respuesta.json();
            
            let peliculas = '';

            datos.results.forEach(pelicula => {
                peliculas += `
                    <div class="pelicula">
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