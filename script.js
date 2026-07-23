const modeloRana=document.getElementById("modeloRana");
const sections = Array.from(document.querySelectorAll("section"));
const audio=document.getElementById('audio')

//POSICIONES DENTRO DE LAS SECCIONES NO TOCAR
const shiftPositions=[25,65,65,65,60,60,60,25];
//POSICIONES DE LOS ANGULOS NO TOCAR
const cameraOrbits=[[135,90],[135,90],[135,90],[135,90],[135,90],[135,90],[135,90],[45,90]];

const interpolate =(start,end,progress)=> start+(end-start)*progress;

const sectionOffsets=sections.map(section=>section.offsetTop);
console.log(sectionOffsets);

const lastSectionIndex=sections.length-1;

const getScrollProgress=scrollY=>{
    for(let i=0;i<lastSectionIndex;i++){
        if(scrollY>=sectionOffsets[i] && scrollY<sectionOffsets[i+1]){
            return i + (scrollY-sectionOffsets[i])/(sectionOffsets[i+1]-sectionOffsets[i]);
        }
    }
return lastSectionIndex;
};

window.addEventListener("scroll", ()=>{
    const scrollProgress=getScrollProgress(window.scrollY);
    const sectionIndex= Math.floor(scrollProgress);
    const sectionProgress= scrollProgress-sectionIndex;

    const currentShift=interpolate(
    shiftPositions[sectionIndex],
    shiftPositions[sectionIndex + 1] ?? shiftPositions[sectionIndex],
    sectionProgress
    );
    const currentOrbit=cameraOrbits[sectionIndex].map((val,i) =>
        interpolate(val, cameraOrbits[sectionIndex + 1]?.[i] ?? val, sectionProgress)
);
    console.log(sectionProgress);

    modeloRana.style.transform = `translateX(${currentShift}%)`;
    modeloRana.setAttribute('camera-orbit', `${currentOrbit[0]}deg ${currentOrbit[1]}deg`);
});


/* =====================================================
   MAPA INTERACTIVO DE EDUFAUNA
   ===================================================== */

const regionesEduFauna = {

    merida: {

        nombre: "Estado Mérida",

        descripcion:
            "Las montañas y páramos de Mérida albergan una gran diversidad de especies únicas y amenazadas.",

        animales: [

            {
                emoji: "🦌",
                nombre: "Venado paramero",
                descripcion: "Habita en las zonas altas de los Andes."
            },

            {
                emoji: "🐸",
                nombre: "Sapito amarillo de La Carbonera",
                descripcion: "Especie asociada al bosque de La Carbonera."
            },

            {
                emoji: "🐸",
                nombre: "Sapito amarillo de Mérida",
                descripcion: "Se encuentra en las sierras de La Culata y Nevada."
            },

            {
                emoji: "🐸",
                nombre: "Sapito amarillo de Mucubají",
                descripcion: "Habita en los alrededores de la laguna de Mucubají."
            },

            {
                emoji: "🐸",
                nombre: "Sapito anaranjado de San Francisco",
                descripcion: "Especie registrada en San Francisco de Guaraque."
            },

            {
                emoji: "🐸",
                nombre: "Sapito verdirrojo de Piñango",
                descripcion: "Habita en los alrededores de Piñango."
            }

        ]

    },


    tachira: {

        nombre: "Estado Táchira",

        descripcion:
            "Los páramos y montañas del Táchira son el hogar de especies de gran importancia para la biodiversidad andina.",

        animales: [

            {
                emoji: "🦅",
                nombre: "Cóndor",
                descripcion: "Habita en los páramos de la Cordillera de Mérida y zonas andinas."
            },

            {
                emoji: "🐦",
                nombre: "Hormiguero tororoi tachirense",
                descripcion: "Especie endémica de la hoya del río Chiquito."
            },

            {
                emoji: "🦌",
                nombre: "Venado paramero",
                descripcion: "Habita en las zonas altas de los Andes."
            },

            {
                emoji: "🐸",
                nombre: "Sapito arlequín de Tamá",
                descripcion: "Se encuentra en el Parque Nacional El Tamá."
            },

            {
                emoji: "🦋",
                nombre: "Mariposa manchada del Tamá",
                descripcion: "Habita en los páramos del Macizo de El Tamá."
            }

        ]

    },


    trujillo: {

        nombre: "Estado Trujillo",

        descripcion:
            "Las montañas y páramos de Trujillo forman parte del hábitat de varias especies de la fauna andina.",

        animales: [

            {
                emoji: "🦅",
                nombre: "Cóndor",
                descripcion: "Habita en los páramos de la región andina."
            },

            {
                emoji: "🦌",
                nombre: "Venado paramero",
                descripcion: "Se encuentra en las zonas altas de los Andes."
            },

            {
                emoji: "🐸",
                nombre: "Sapito acollarado del Socopo",
                descripcion: "Se encuentra asociado a la Serranía de Trujillo y Cerro Socopo."
            },

            {
                emoji: "🐸",
                nombre: "Sapito amarillo y rojo de Niquitao",
                descripcion: "Habita en el páramo de Niquitao."
            },

            {
                emoji: "🦋",
                nombre: "Mariposa paramera del Cendé",
                descripcion: "Habita en el páramo de Cendé."
            }

        ]

    },


    falcon: {

        nombre: "Estado Falcón",

        descripcion:
            "Las serranías y bosques de Falcón albergan especies de anfibios adaptadas a ambientes montañosos.",

        animales: [

            {
                emoji: "🐸",
                nombre: "Rana arborícola del Socopo",
                descripcion: "Especie asociada al Cerro Socopo."
            },

            {
                emoji: "🐸",
                nombre: "Sapito acollarado de Churuguara",
                descripcion: "Habita en la Sierra de San Luis y Churuguara."
            },

            {
                emoji: "🐸",
                nombre: "Sapito acollarado del Socopo",
                descripcion: "Especie asociada al Cerro Socopo."
            },

            {
                emoji: "🐸",
                nombre: "Sapito silbador del Cerro Socopo",
                descripcion: "Especie exclusiva del Cerro Socopo."
            }

        ]

    },


    lara: {

        nombre: "Estado Lara",

        descripcion:
            "En los límites montañosos entre Lara y Trujillo se encuentran ecosistemas de gran importancia para especies de la fauna andina.",

        animales: [

            {
                emoji: "🦋",
                nombre: "Mariposa paramera del Cendé",
                descripcion: "Habita en el páramo de Cendé."
            }

        ]

    },


    zulia: {

        nombre: "Estado Zulia",

        descripcion:
            "El Sistema del Lago de Maracaibo y sus ríos tributarios representan importantes ecosistemas acuáticos del occidente venezolano.",

        animales: [

            {
                emoji: "🐋",
                nombre: "Manatí",
                descripcion: "Habita en el Sistema del Lago de Maracaibo y sus ríos tributarios."
            }

        ]

    }

};


/* =====================================================
   FUNCIÓN PARA MOSTRAR UNA REGIÓN
   ===================================================== */

function mostrarRegion(regionId) {

    const region = regionesEduFauna[regionId];

    if (!region) {

        console.error(
            "No se encontró la región:",
            regionId
        );

        return;

    }


    const titulo =
        document.getElementById("region-titulo");

    const descripcion =
        document.getElementById("region-descripcion");

    const contenedor =
        document.getElementById("region-animales");


    if (!titulo || !descripcion || !contenedor) {

        console.error(
            "No se encontraron los elementos del panel del mapa."
        );

        return;

    }


    /* ACTUALIZAR TÍTULO */

    titulo.textContent =
        "📍 " + region.nombre;


    /* ACTUALIZAR DESCRIPCIÓN */

    descripcion.textContent =
        region.descripcion;


    /* LIMPIAR ANIMALES */

    contenedor.innerHTML = "";


    /* CREAR TARJETAS */

    region.animales.forEach(animal => {

        const tarjeta =
            document.createElement("div");

        tarjeta.className =
            "animal-region-card";


        tarjeta.innerHTML = `

            <h4>
                ${animal.emoji}
                ${animal.nombre}
            </h4>

            <p>
                ${animal.descripcion}
            </p>

        `;


        contenedor.appendChild(tarjeta);

    });


    /* ANIMACIÓN DEL PANEL */

    const panel =
        document.getElementById("panel-region");


    panel.style.transform =
        "scale(0.97)";


    setTimeout(() => {

        panel.style.transform =
            "scale(1)";

    }, 150);

}

/* =====================================================
   ANIMACIÓN DE ESTADÍSTICAS
   ===================================================== */

function animarEstadisticas() {

    const numeros =
        document.querySelectorAll(
            ".estadistica-numero"
        );


    numeros.forEach(numero => {

        const objetivo =
            parseInt(
                numero.dataset.valor
            );


        let actual = 0;


        const incremento =
            Math.max(
                1,
                Math.ceil(
                    objetivo / 30
                )
            );


        const intervalo =
            setInterval(() => {

                actual += incremento;


                if (actual >= objetivo) {

                    actual =
                        objetivo;

                    clearInterval(
                        intervalo
                    );

                }


                numero.textContent =
                    actual;

            }, 40);

    });

}


/* EJECUTAR CUANDO CARGUE LA PÁGINA */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        animarEstadisticas();

    }
);

/* =====================================================
   CONEXIÓN ENTRE GRÁFICO Y MAPA
   ===================================================== */

function seleccionarEstadoDesdeGrafico(regionId) {

    /*
     * Mostrar la información del estado
     * utilizando la misma función del mapa.
     */

    mostrarRegion(regionId);


    /*
     * Quitar selección anterior
     */

    const barras =
        document.querySelectorAll(
            ".barra-estado"
        );


    barras.forEach(barra => {

        barra.classList.remove(
            "estado-seleccionado"
        );

    });


    /*
     * Buscar el botón correspondiente
     */

    const botonSeleccionado =
        document.querySelector(
            `.barra-estado[onclick*="'${regionId}'"]`
        );


    /*
     * Marcar estado seleccionado
     */

    if (botonSeleccionado) {

        botonSeleccionado.classList.add(
            "estado-seleccionado"
        );

    }


    /*
     * Desplazar la pantalla hacia el mapa
     */

    const mapa =
        document.getElementById(
            "explorar-biodiversidad"
        );


    if (mapa) {

        mapa.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

    }

}

