 //Cambia las opciones segun el tipo de instrumento seleccionado (Funcional)
document.getElementById("instrumentForm").addEventListener("submit", function (event) {
event.preventDefault(); // Evitar que el formulario se envíe


//Crea un div para mostrar los videos del instrumento seleccionado (Incompleto)
var tipoDeGuitarra = document.getElementById("instrumentType").value;
var guideContainer = document.getElementById("guide-main-container");

if (tipoDeGuitarra !== "") {
    // Encabezado
    var guideHeader = document.createElement("h1");
    guideHeader.classList.add("guide-header"); //Clase
    guideHeader.textContent =  tipoDeGuitarra;
    guideContainer.innerHTML = ""; //resetea el div
    guideContainer.appendChild(guideHeader);

    // Crear un contenedor flex para los iframes
    var iframeFlexContainer = document.createElement("div");
    iframeFlexContainer.classList.add("iframe-container"); // Aplica la clase

    // Videos a mostrar
    var videoIds = [];
    let cursoCompleto = ''
    switch(tipoDeGuitarra) {
        case "Guitarra Clasica":
            videoIds.push("9UTknRO54e4?si=aE9tczKIBIy9NHkc","Ar0CRd5KUCU?si=6NjXGraq1qi-tttj", "LKiD4oBubSQ?si=-6a73WO9k1YWbiGa")
            cursoCompleto = "https://www.youtube.com/watch?v=9UTknRO54e4&list=PLUDDtbxz4OdSNhm3bqmpoO5h7-2bbbDUq"
            break;
        case "Guitarra Acústica":
            videoIds.push("ENeSd1qYv9Q?si=7DMXWiGdJw5feAiU", "ENeSd1qYv9Q?si=3islLC1cTw65T94T", "4whMCp9Kc84?si=2a4recxU9K-CF-aB")
            cursoCompleto = "https://www.youtube.com/watch?v=ENeSd1qYv9Q&list=PLRYhYjaYNiltoudRxjRg--8_NKMdTIqty"
            break;
        case "Guitarra Electrica":
            videoIds.push("KmBci4auRbk?si=UsbY7cFPFRxK1eID", "DM4FGdzeqGA?si=T8vgkQraXJHZgAKe", "E1sLqGMwVN4?si=-uvK3F5M-t45EAas")
            cursoCompleto = "https://www.youtube.com/watch?v=KmBci4auRbk&list=PLRYhYjaYNils6e0lEMHX-1H4SVbTaJZMJ"
            break;
    }

    for (let i = 0; i < videoIds.length; i++) {
        let iframeContainer = document.createElement("div");
        iframeContainer.style.marginRight = "10px"; 

        let iframe = document.createElement("iframe");
        iframe.setAttribute("width", "560");
        iframe.setAttribute("height", "315");
        iframe.setAttribute("src", "https://www.youtube.com/embed/" + videoIds[i]);
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("allowfullscreen", "");
        
        iframeContainer.appendChild(iframe);
        iframeFlexContainer.appendChild(iframeContainer);
    }
    guideContainer.appendChild(iframeFlexContainer);

    let botonVerMas = document.createElement("button");
    botonVerMas.textContent = "Ver el curso completo";
    botonVerMas.type = "submit"; 
    botonVerMas.addEventListener("click", function() {
        window.open(cursoCompleto, "_blank");
    });
    botonVerMas.classList.add("botonVerMas"); 
    guideContainer.appendChild(botonVerMas);

    
}
});