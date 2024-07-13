function get_guitar(guitarra) {
  return fetch("https://teotronic5438.github.io/grupo11/guitarras.json")
    .then(response => response.json())
    .then(data => {
      // Buscar la guitarra en la lista
      const info = data.guitars.find(guitar => guitar.name === guitarra);
      
      if (info) {
        // Generar el HTML para la guitarra encontrada
        return `
          <article>
            <h2>${info.name}</h2>
            <p>${info.description}</p>
            <p>Estilo de música: ${info.music_style}</p>
            <p>Marca recomendada: ${info.recommended_brand}</p>
            <img src="${info.image_url}" alt="${info.name}"class="imagen_guitarra">
            <p>Artista: ${info.artist}</p>
          </article>
        `;
      } else {
        return `
          <article>
            <h2>Información no disponible</h2>
          </article>
        `;
      }
    })
    .catch(error => {
      console.log("Ocurrió un error al obtener los datos: " + error);
      return `
        <article>
          <h2>Error al cargar la información</h2>
        </article>
      `;
    });
}

// Función para mostrar la información de la guitarra seleccionada
function mostrar_info_guitarra(formulario) {
  let seleccion;
  let informacionContainer;

  if (formulario === 'izquierda') {
    seleccion = document.getElementById("guitarras_izq").value;
    informacionContainer = document.getElementById("informacionIzquierdaContainer");
  } else if (formulario === 'derecha') {
    seleccion = document.getElementById("guitarras_der").value;
    informacionContainer = document.getElementById("informacionDerechaContainer");
  }

  get_guitar(seleccion).then(infoHTML => {
    informacionContainer.innerHTML = infoHTML;
    informacionContainer.style.display = "block";
  });
}

  