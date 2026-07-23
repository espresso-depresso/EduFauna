const scene = new THREE.Scene();
scene.background = new THREE.Color("skyblue");

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const clock = new THREE.Clock(); 

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

let pet;
const loader = new THREE.GLTFLoader();

loader.load(
    '../manatee.glb',
    function (gltf) {
        pet = gltf.scene;
        pet.scale.set(0.6, 0.4,0.4);
        pet.position.set(0,-3,0);
        scene.add(pet);
        console.log("Se cargó el modelo correctamente");
    },
    function (xhr) {
        if (xhr.total > 0) {
            console.log((xhr.loaded / xhr.total * 100) + '% cargado');
        }
    },
    function (error) {
        console.error('Ocurrió un error al cargar el modelo:', error);
    }
);

let stats = {
    hambre: 100,
    bienestar: 100,
    muerto: false
};

function Actualizar() {
    document.getElementById('hambre').innerText = Math.round(stats.hambre);
    document.getElementById('bienestar').innerText = Math.round(stats.bienestar);

    let status = "Feliz";
    if (stats.muerto) status = "Muerto";
    else if (stats.hambre < 30) status = "Hambriento";
    else if (stats.bienestar < 30) status = "Triste";
    document.getElementById('estado').innerText = status;
}



setInterval(() => {
    if (stats.muerto) return;

    stats.hambre -= 1.5;     
    stats.bienestar -= 2;    

    if (stats.hambre < 0) stats.hambre = 0;
    if (stats.bienestar < 0) stats.bienestar = 0;

    if (stats.hambre === 0 && stats.bienestar === 0) {
        stats.muerto = true;
        if (pet) {
            pet.traverse((child) => {
                if (child.isMesh) child.material.color.setHex(0x777777);
            });
        }
    }

    Actualizar();
}, 1000);

function alimentar() {
    if (stats.muerto || !pet) return;
    stats.hambre = Math.min(stats.hambre + 20, 100);
    
    pet.scale.set(0.6, 0.6,0.4);
    setTimeout(() => pet.scale.set(0.6, 0.4,0.4), 300);
    
    Actualizar();
}

function jugar() {
    if (stats.muerto || !pet) return;
    stats.bienestar = Math.min(stats.bienestar + 15, 100);
    
    let jumpCount = 0;
    const jumpInterval = setInterval(() => {
        pet.position.y = Math.sin(jumpCount) * 0.5;
        jumpCount += 0.2;
        if (jumpCount >= Math.PI) {
            clearInterval(jumpInterval);
            pet.position.y = -3;
        }
    }, 20);

    Actualizar();
}

function animate() {
    requestAnimationFrame(animate);

    if (pet && !stats.muerto) {
        const time = clock.getElapsedTime();
        pet.scale.y = 1 + Math.sin(time * 3) * 0.05;
        pet.rotation.y = Math.sin(time * 0.5) * 0.3;
    }

    renderer.render(scene, camera);
}

animate();


function interactuar(){



    
}