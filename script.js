document.addEventListener("DOMContentLoaded", () => {

    const imagenes = document.querySelectorAll("#gallery img");

    const lightbox = document.createElement("div");
    lightbox.id = "lightbox";

    lightbox.innerHTML = `
        <img id="imagenActiva" alt="">
        <div id="contador"></div>
    `;

    document.body.appendChild(lightbox);

    const imagenActiva = document.getElementById("imagenActiva");
    const contador = document.getElementById("contador");

    let indice = 0;

    function mostrarImagen(i){

        indice = i;

        imagenActiva.src = imagenes[indice].src;

        contador.textContent =
        `${indice + 1} / ${imagenes.length}`;

        lightbox.classList.add("activo");

    }

    imagenes.forEach((img,index)=>{

        img.style.opacity = "0";
        img.style.transform = "translateY(20px)";

        setTimeout(()=>{

            img.style.transition =
            "opacity .8s ease, transform .8s ease";

            img.style.opacity = "1";
            img.style.transform = "translateY(0)";

        },index * 20);

        img.addEventListener("click",()=>{

            mostrarImagen(index);

        });

    });

    lightbox.addEventListener("click",(e)=>{

        if(
            e.target === lightbox ||
            e.target === contador
        ){

            lightbox.classList.remove("activo");

        }

    });

    document.addEventListener("keydown",(e)=>{

        if(!lightbox.classList.contains("activo")) return;

        if(e.key === "Escape"){

            lightbox.classList.remove("activo");

        }

        if(e.key === "ArrowRight"){

            indice++;

            if(indice >= imagenes.length){

                indice = 0;

            }

            mostrarImagen(indice);

        }

        if(e.key === "ArrowLeft"){

            indice--;

            if(indice < 0){

                indice = imagenes.length - 1;

            }

            mostrarImagen(indice);

        }

    });

    console.log(
        `CLICKEO Premium Gallery cargada con ${imagenes.length} fotografías`
    );

});