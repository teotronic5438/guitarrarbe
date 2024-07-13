document.querySelector('.caracteristicas button').addEventListener('click', function() {
    document.getElementById('selected-tipo').innerText = document.getElementById('guitar-tipo').value;
    document.getElementById('selected-forma').innerText = document.getElementById('guitar-forma').value;
    document.getElementById('selected-cuerdas').innerText = document.getElementById('cantcuerdas').value;
    document.getElementById('selected-origen').innerText = document.getElementById('origen').value;
});

document.querySelector('.seleccionarmarca button').addEventListener('click', function() {
    let selectedMarca = '';
    document.querySelectorAll('.seleccionarmarca input[type="checkbox"]').forEach(function(checkbox) {
        if (checkbox.checked) {
            selectedMarca += checkbox.value + ', ';
        }
    });
    // Eliminar la última coma y espacio
    selectedMarca = selectedMarca.substring(0, selectedMarca.length - 2);
    document.getElementById('selected-marca').innerText = selectedMarca;
});



document.querySelector('.confirmarseleccion button').addEventListener('click', function() {
    // Define la información de la guitarra
    
    var guitarInfo = {
        image: 'https://bairesrocks.vteximg.com.br/arquivos/ids/244506/front.jpg?v=638439429284230000',
        brand: 'Cielito',
        name: 'Guitarra Clásica Criolla Cielito 5 De Estudio 3/4 De Caja - Esfumada',
        description: 'La guitarra Clásica/Criolla Cielito es la mejor opción para iniciarse en el mundo de la música. Este instrumento se adapta para varios niveles, tanto principiantes como a músicos de mayor nivel, especialmente para aquellos que buscan una guitarra de calidad a un precio accesible. Cielito se destaca por su sonido, comodidad y estética. Viene en variedad de colores y para todos los gustos.',
        details: 'Principales Características:\n-Medida 3/4.\n-Ideal para estudio/iniciación.\n-Cuerdas de nylon.\n-Trastes de bronce.\n-Clavijero de Precisión Niquelado Grabado.\n-Tapa de Abedul.\n-Diapasón de Kiri.\n-Origen Argentina.\n\nMedidas:\n-Largo total: 95 cm\n-Largo de escala: 38,5 cm\n-Ancho de cejilla: 43 mm\n-Profundidad del mango: 2,5 cm\n-Largo del cuerpo: 45 cm\n-Ancho superior del cuerpo: 25 cm\n-Ancho inferior del cuerpo: 33,7 cm\n-Profundidad de caja: 9,5 cm',
        demoVideo: 'https://www.youtube.com/embed/AAUOuVv3KdI'
    };
    
    // Actualiza la sección de información de la guitarra
    
    document.getElementById('guitar-image').src = guitarInfo.image;
    document.getElementById('guitar-brand').textContent = guitarInfo.brand;
    document.getElementById('guitar-name').textContent = guitarInfo.name;
    document.getElementById('guitar-description').textContent = guitarInfo.description;
    document.getElementById('guitar-details').textContent = guitarInfo.details;

    // Agrega el video demostrativo
    
    var videoElement = document.createElement('iframe');
    
    videoElement.src = guitarInfo.demoVideo;
    videoElement.width = 560;
    videoElement.height = 315;
    videoElement.title = "Guitarra Cielito - Criolla de estudio - Industria Nacional!";
    videoElement.frameborder = 0;
    videoElement.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    videoElement.referrerpolicy = "strict-origin-when-cross-origin";
    videoElement.allowfullscreen = true;
    document.querySelector('.guitar-videos').innerHTML= ""; 
    document.querySelector('.guitar-videos').appendChild(videoElement);

    // Muestra la sección de información de la guitarra
    document.querySelector('.guitar-info').style.display = 'flex';
});

// Inicialmente oculta la sección de información de la guitarra
document.querySelector('.guitar-info').style.display = 'none';