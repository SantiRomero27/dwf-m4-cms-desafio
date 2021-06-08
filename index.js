// Función encargada de manipular los elementos del DOM y mostrar los proyectos
function mostrarProyecto(nombre, descripcion, link, imagen) {
    // Primero, obtengo el template y el contenedor padre
    const templateEl = document.querySelector(".project-item-template");
    const contenedorEl = document.querySelector(".my-projects-results");

    // Empiezo a modificar los elementos del template: Agrego la imagen
    const imgEl = templateEl.content.querySelector(".project-img");
    imgEl.setAttribute("src", imagen);

    // Agrego el nombre
    const nombreEl = templateEl.content.querySelector(".project-name");
    nombreEl.textContent = nombre;

    // Agrego la descripción
    const descripcionEl = templateEl.content.querySelector(
        ".project-description"
    );
    descripcionEl.textContent = descripcion;

    // Finalmente, agrego el link...
    const linkEl = templateEl.content.querySelector(".project-link");
    linkEl.setAttribute("href", link);

    // Ahora, agrego el elemento creado al DOM
    const clonado = document.importNode(templateEl.content, true);
    contenedorEl.appendChild(clonado);
}

// Función encargada de procesar los datos
function procesarData(JSONdata) {
    // Obtengo el array con todos los items del JSON
    const arrayItems = JSONdata["items"];
    const arrayImagenes = JSONdata["includes"]["Asset"].reverse();

    arrayItems.forEach((item, index) => {
        // Obtengo toda la información de cada item
        let nombre = item["fields"]["nombre"];
        let descripcion = item["fields"]["descripcion"];
        let link = item["fields"]["url"];
        let imagen = arrayImagenes[index]["fields"]["file"]["url"];

        // Creo los elementos y los muestro en pantalla
        mostrarProyecto(nombre, descripcion, link, imagen);
    });
}

// Función principal
function main() {
    // Hago el fetch
    fetch(
        "https://cdn.contentful.com/spaces/9635uuvwn9dq/environments/master/entries?access_token=POHdnNPw5fAJmhdb4EnfTOtDlBRs0Y1V-ztKkN2LvM4"
    )
        .then((resp) => resp.json())
        .then((data) => procesarData(data));
}

// EJECUCIÓN
main();
