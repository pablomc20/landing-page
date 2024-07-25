// Función para cargar el contenido del JSON en el DOM
function cargarContenido(idioma) {

    // Realiza una solicitud HTTP para obtener el archivo JSON
    var solicitud = new XMLHttpRequest();
    solicitud.open('GET', 'resources/languaje-list.json', true);
    solicitud.onreadystatechange = function() {
        if (solicitud.readyState === 4 && solicitud.status === 200) {
            // Parsea el JSON
            var contenido = JSON.parse(solicitud.responseText);
            
            for (var clave in contenido[idioma]) {
                if (contenido[idioma].hasOwnProperty(clave)) {
                    var valor = contenido[idioma][clave];
                    var search = "true"
                    let elementTranslate = document.querySelectorAll(`[${clave}="${search}"]`)

                    elementTranslate.forEach(element => {
                        
                        if (element) {
                            if (element.tagName == "INPUT") 
                                element.placeholder = valor
                            else if(element.tagName == "BUTTON") {
                                element.textContent = valor;
                            }
                            else if(element.tagName == "TEXTAREA") {
                                element.placeholder = valor
                            }
                            else
                                element.innerHTML = valor;
                        }
                        // Puedes realizar alguna acción con cada clave y valor aquí
                    });
                }
            }

        }
    };
    solicitud.send();
}

function showMessage(msg) {
    return new Promise((resolve, reject) => {
        // Crea un nuevo elemento <div> para el mensaje flotante
        var mensaje = document.createElement('div');

        // Agrega contenido al mensaje
        mensaje.textContent = msg;

        // Establece estilos para el mensaje flotante        
        mensaje.className = "dialog-message";

        // Agrega el mensaje al cuerpo del documento
        document.body.appendChild(mensaje);

        // Resuelve la promesa después de 3 segundos
        setTimeout(() => {
            mensaje.remove();
            resolve(); // Resuelve la promesa cuando se elimina el mensaje
        }, 1500);
    });
}


// Variable para rastrear si la tarea está en progreso
let tareaEnProgreso = false;

// Función asíncrona
async function sendMessageAsync(msg) {
    // Verifica si la tarea está en progreso
    if (tareaEnProgreso) {
        console.log("La tarea ya está en progreso. Espere a que termine.");
        return;
    }
    
    // Marca la tarea como en progreso
    tareaEnProgreso = true;
    
    try {
        await showMessage(msg);
    } catch (error) {
        console.error("Error al realizar la tarea:", error);
    } finally {
        // Marca la tarea como completada
        tareaEnProgreso = false;
    }
}



// Ejemplo de uso: cargar el contenido en inglés al cargar la página
window.onload = function() {
    const body = document.body;
    console.log(body.dataset.languaje);

    cargarContenido(body.dataset.languaje);

    const btn_languaje = document.querySelector('.fa-language');

    btn_languaje.addEventListener('click', function() {
        cargarContenido(toggleLanguaje());
    });

    let toggleLanguaje = () => {
        const ES = "es";
        const EN = "en";
        if (body.dataset.languaje === EN && !tareaEnProgreso) {
            sendMessageAsync("Cambio de idioma a Español")
            body.dataset.languaje = "es";
            return ES;
        }else if (body.dataset.languaje === ES && !tareaEnProgreso) {
            sendMessageAsync("English Language has been selected")
            body.dataset.languaje = "en";
            return EN;

        }
    }

    };
