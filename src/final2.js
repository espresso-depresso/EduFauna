const btnComenzar = document.querySelector("#comenzar");
const btnInicio = document.querySelector("#inicio");
const animal = document.querySelector("#animal");
const nombre = document.querySelector("#nombre");
const animalito = document.querySelector("#animalito");

if (nombre) {
    nombre.innerHTML = localStorage.getItem("nombre") || "Jugador";
}

const puntosGuardados = parseInt(localStorage.getItem("puntaje-total")) || 0;

if (animal && animalito) {
    if (puntosGuardados >= 16) { 
        animal.src = "../images/animal.png"; 
        animal.alt = "Manatí";
        animalito.innerHTML = " Manatí, ¡Eres un espíritu tranquilo y sereno! Te apasiona disfrutar del momento, relajarte y buscar la paz en tu día a día. Destacas por tu sabiduría, tu gran intuición para resolver problemas y esa curiosidad constante por aprender del mundo que te rodea.";
    } 
    else if (puntosGuardados >= 12) {
        animal.src = "../images/animal(3).png"; 
        animal.alt = "Condor";
        animalito.innerHTML = " Cóndor, ¡Destacas por tu lealtad y calidez! Te encanta compartir con tu familia y amigos, siendo un pilar sociable, paciente y pacifico. Con tu energía positiva y tu enfoque brillante ante los retos, siempre encuentras la forma de mantener el equilibrio y cuidar a quienes te rodean.";
    }else if (puntosGuardados >= 7) {
        animal.src = "../images/4.png"; 
        animal.alt = "Sapito";
        animalito.innerHTML = " Sapito amarillo de Mérida, ¡Eres una chispa de energía y entusiasmo! Lleno de vitalidad, te caracterizas por ser activo, alegre y súper llamativo allá donde vas. Disfrutas de los días frescos, vives al máximo tu rutina y contagias tu buena vibra a cualquiera que se cruce en tu camino.";
    } else {
        animal.src = "../images/12.png"; 
        animal.alt = "Venado";
        animalito.innerHTML = " Venado paramero, ¡Un alma libre, observadora y cautelosa! Prefieres seguir tus propios instintos, valoras tu espacio y cuentas con una agilidad increíble ante cualquier desafío. Tu agudeza y serenidad te convierten en un verdadero explorador, siempre atento a los pequeños detalles del camino.";
    }
}

if (btnComenzar) {
    btnComenzar.addEventListener("click", () => {
        localStorage.setItem("puntaje-total", 0);
        location.href = "quizz2.html";
    });
}

if (btnInicio) {
    btnInicio.addEventListener("click", () => {
        location.href = "juegos.html";
    });
}