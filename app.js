let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', ()=>{
    if(pagina<1000){
        pagina += 1;
        cargarPeliculas();
        window.scrollTo(0, 0);
    }
})

btnAnterior.addEventListener('click', ()=>{
    if(pagina>1){
        pagina -= 1;
        cargarPeliculas();
        window.scrollTo(0, 0);
    }
})

const cargarPeliculas = async() =>{
    try{
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=a055f913b44f65ca23768972f5f39d7d&language=es-MX&page=${pagina}`);
    
        console.log(respuesta);

        if(respuesta.status == 200){
            const datos = await respuesta.json();

            let peliculas = '';
            datos.results.forEach(pelicula => {
                peliculas += `
                    <div class="pelicula-wrapper">
                    <div class="pelicula">
                        <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                    </div>
                    <h3 class="titulo">${pelicula.title}</h3>
                    </div>
                `;        
            });
            document.getElementById('contenedor').innerHTML = peliculas;

        }else if(respuesta.status == 401){
            console.log('Llave incorrecta!');
        }else if(respuesta.status == 404){
            console.log('Pelicula no existe!');
        }else{
            console.log('Error inesperado!');
        }
    }catch(error){
        console.log(error);
    }
}

cargarPeliculas();