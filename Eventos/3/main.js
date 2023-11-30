let notas = [
    {
        id: 1,
        titulo: 'Organizar la habitacion',
        descripcion: 'Clasificar los objetos en base a una clasficacion basada en cosas utiles, no utiles.',
        realizada: true
    },
    {
        id: 2,
        titulo: 'Realizar los trabajos de la U',
        descripcion: 'programar el tiempo necesario para cumplir con los trabajos pendientes de la U sobretodo Algoritmo',
        realizada: true
    },
    {
        id: 3,
        titulo: 'Ir al gym',
        descripcion: 'Madrugar y preparar las cosas para ir en camino al gym, binchas, agua y toalla.',
        realizada: false
    },
    {
        id: 4,
        titulo: 'Regalar libros',
        descripcion: 'Realizar una busqueda de la categoria de libros a regalar en los estantes.',
        realizada: true
    },
    {
        id: 5,
        titulo: 'preparar la fiesta',
        descripcion: 'comprar las cosas necesarias para la fiesta. licor, comida, juegos al azar.',
        realizada: false
    },
    {
        id: 6,
        titulo: 'apartar una cita',
        descripcion: 'Realizar una llamada a la eps para apartar una cita sobre mi estado de salud.',
        realizada: false
    }
]

let switchNotasRealizadas = false
let idGlobal = notas.length + 1

//pintar notas
let tarjetas = document.getElementById("tarjetasNotas")
document.addEventListener('DOMContentLoaded', pintarNotas(notas))

function pintarNotas(notas) {
    tarjetas.innerHTML = '';

    let notasAMostrar = switchNotasRealizadas ? notas.filter(nota => nota.realizada) : notas;

    if (notasAMostrar.length === 0) {
        tarjetas.innerHTML = '<div class="col-12 min-vh-50"><h2 class="text-center text-secondary my-5">No hay elementos para mostrar</h2></div>';
    } else {
        notasAMostrar.forEach(nota => {
            let descripcionTachada = nota.realizada ? 'text-decoration-line-through' : '';

            let card = document.createElement("div");
            card.className = "card col-md-4 col-lg-3 my-4 mx-md-5 mx-lg-4";
            card.innerHTML = `
                <div class="card-header d-flex justify-content-between bg-dark-subtle align-items-center w-100" data-id="${nota.id}">
                    <input class="clickeable" type="checkbox" ${nota.realizada ? "checked" : ""} onclick="marcarRealizada(${nota.id})">
                    </input>
                    <h5 class="m-2">${nota.titulo}</h5>
                    <a class="bi bi-trash3 text-danger clickeable" onclick="eliminarNota(${nota.id})"></a>
                </div>
                <div class="card-body">
                    <p class="card-text ${descripcionTachada}">${nota.descripcion}</p>
                </div>`;

            tarjetas.appendChild(card);
        });
    }
}



//Crear nueva Nota
document.getElementById('guardar').addEventListener('click', () => {
    let titulo = document.getElementById('tituloNota').value.trim();
    let descripcion = document.getElementById('textoNota').value.trim();

    funcionBorrarTexto();

    if (titulo && descripcion) {
        crearNota(titulo, descripcion);
    }
});


function crearNota(titulo, descripcion) {
    notas.push({
        id: idGlobal++,
        titulo,
        descripcion,
        realizada: false
    });

    funcionBorrarTexto();
    pintarNotas(notas);
}


//Borrar nota
let borrarTexto = document.getElementById('borrar')
borrarTexto.addEventListener('click', funcionBorrarTexto)
function funcionBorrarTexto(){
    let titulo = document.getElementById('tituloNota')
    let descripcion = document.getElementById('textoNota')
    titulo.value = ""
    descripcion.value = ""
}

//Eliminar Nota
function eliminarNota(id) {
    let index = notas.findIndex(nota => nota.id === id);
    if (index !== -1) {
        notas.splice(index, 1);
        pintarNotas(notas);
    }
}

//marcar Nota Realizadaaaaa
function marcarRealizada(id) {
    let index = notas.findIndex(nota => nota.id === id);
    if (index !== -1) {
        notas[index].realizada = !notas[index].realizada;
        pintarNotas(notas);
    }
}


//filtro mostrarRealizadasss
function mostrarRealizadas() {
    switchNotasRealizadas = !switchNotasRealizadas;
    pintarNotas(notas);
}

//Filtro por busqueda

let textoBusqueda = document.getElementById('textoBusqueda')
textoBusqueda.addEventListener('keyup', busqueda)

function busqueda() {
    let texto = textoBusqueda.value.trim().toLowerCase();
    let notasBuscadas = notas.filter(({ titulo, descripcion }) => 
        titulo.toLowerCase().includes(texto) || descripcion.toLowerCase().includes(texto)
    );
    pintarNotas(notasBuscadas);
}

