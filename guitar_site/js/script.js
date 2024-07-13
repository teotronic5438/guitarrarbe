document.addEventListener('DOMContentLoaded', function() {
    const imagesContainer = document.querySelector('.carousel-images')
    const images = document.querySelectorAll('.carousel-item')
    let currentIndex = 0
  
    document.querySelector('.prev').addEventListener('click', function() {
      currentIndex--
      if (currentIndex < 0) {
        currentIndex = images.length - 1  // Salta a la última imagen si es menor que 0
      }
      updateCarousel()
    });
  
    document.querySelector('.next').addEventListener('click', function() {
      currentIndex++;
      if (currentIndex >= images.length) {
        currentIndex = 0  // Salta a la primera imagen si supera el índice máximo
      }
      updateCarousel()
    });
  
    function updateCarousel() {
      const offset = -currentIndex * 100; // Cada imagen ocupa 100% del ancho del contenedor
      imagesContainer.style.transform = `translateX(${offset}%)`
    }

    // Codigo para agregar los listados de posibles ponentes
    const formulario = document.querySelector('.formulario_orador form');
    const charlasDiv = document.querySelector('.charlas');
    const charlas = []; // Array para almacenar los datos del formulario

    formulario.addEventListener('submit', function (event) {
        event.preventDefault(); // Previene la recarga de la página

        // Obtenemos los valores del formulario
        const nombre = formulario.querySelector('#nombre').value;
        const apellido = formulario.querySelector('#apellido').value;
        const correo = formulario.querySelector('#correo').value;
        const tematica = formulario.querySelector('#tematica').value;
        const fecha = formulario.querySelector('#fecha').value;

        // Creamos un objeto con los datos del formulario
        const nuevoRegistro = {
            nombre: nombre,
            apellido: apellido,
            correo: correo,
            tematica: tematica,
            fecha: fecha
        };
        
        // Agregamos el objeto al array
        charlas.push(nuevoRegistro);

        // Limpiamos el contenido anterior del div
        charlasDiv.innerHTML = `<h3>Información Registrada</h3>`;

        // Mostramos los datos en el div
        charlas.forEach(charla => {
            charlasDiv.innerHTML += `
                <div class='ponente'>
                    <p><strong>Nombre:</strong> ${charla.nombre}</p>
                    <p><strong>Apellido:</strong> ${charla.apellido}</p>
                    <p><strong>Correo:</strong> ${charla.correo}</p>
                    <p><strong>Temática:</strong> ${charla.tematica}</p>
                    <p><strong>Fecha:</strong> ${charla.fecha}</p>
                </div><hr />
            `;
        });

        // Limpiamos los inputs del formulario
        formulario.reset();
    });

});
  
