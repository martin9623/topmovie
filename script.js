const key = 'api_key=b1a875aeed67bfd1b699c08d7cf624ec'
const main = document.querySelector('.main')


//mostrar peliculas en inicio

const obtenerDatos = async () => {
    await fetch(`https://api.themoviedb.org/3/movie/popular?${key}&language=es-MX`)
        .then(response => response.json())
        .then(datos => {
            datos.results.forEach((pelicula) => {
                contenedor.innerHTML += `
                    <div id="${pelicula.id}" class="card">
                        <h3 class="card-title">${pelicula.title}</h3>
                        <img class="poster" src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}">
                    </div>
                `
            })
        })
}

//mostrar modal de pelicula

const obtenerPeli = async (id) => {
    await fetch(`https://api.themoviedb.org/3/movie/${id}?${key}&language=es-MX`)
        .then(response => response.json())
        .then(data => {
            console.log(data.title);
            main.innerHTML += `
                <div id="${data.id}" class="modal">
                    <h3>${data.title}</h3>
                    <div class="modal-img">
                        <img class="modal-img-img" src="https://image.tmdb.org/t/p/w500${data.poster_path}">
                    </div>
                    <div class="modal-cont">
                        <p class="overview">${data.overview}</p>
                    </div>
                </div>
                `
            const modal = main.querySelector('.modal')
            modal.style.display = 'flex'
        })
}

const obtenerVideo = async (id) => {
    await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?${key}&language=en-MX`)
        .then(response => response.json())
        .then(data => {
            const modal = document.querySelector('.modal-cont')
            modal.innerHTML += `
                <iframe class="modal-video" src="https://www.youtube.com/embed/${data.results[0].key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            `
        })
}

main.addEventListener('click', (e) => {
    const event = e.target
    console.log(event);

    if (event.parentNode.className === "card") {
        const id = Number(event.parentNode.id)

        obtenerPeli(id)
        obtenerVideo(id)
    }

    if (event.className === "modal") {
        const modal = main.querySelector('.modal')
        modal.remove()
    }

    if (event.id === 'btn-info') {
        const aboutUs = document.querySelector('#about-us')
        aboutUs.style.display = 'flex'
    }

    if (event.id === 'about-us') {
        const aboutUs = document.querySelector('#about-us')
        aboutUs.style.display = 'none'
    }
})


obtenerDatos()