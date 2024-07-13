// fetch_data_get.js

// Contenedor donde se dibujarán las reviews de guitarras
let reviewsContainer = document.querySelector('.charlas');

// Template de la tarjeta de review de guitarra
let reviewCardTemplateReference = document.querySelector('.card-template');

// Hago una copia del template
let reviewCardTemplate = reviewCardTemplateReference.cloneNode(true);

// Remuevo el template del documento para no duplicarlo
reviewCardTemplateReference.remove();

// Función para obtener y mostrar las reviews de guitarras
function fetchReviews() {
    fetchData("http://127.0.0.1:5000/api/reviews/", "GET", (data) => {
        console.log(data);
        
        let reviews = [];

        // Recorrer la lista de reviews obtenidas
        for (const review of data){
            console.log(review);

            // Paso 1: Duplicar la plantilla de la tarjeta de review
            let newReview = reviewCardTemplate.cloneNode(true);

            // Paso 2: Completar la tarjeta con los datos reales de la review
            newReview.querySelector("h2").textContent = review.guitar_model;
            newReview.querySelector(".card-rating-template").textContent = review.rating;
            newReview.querySelector(".card-info-template p:nth-child(1)").innerHTML = `<strong>Marca:</strong> ${review.brand}`;
            newReview.querySelector(".card-info-template p:nth-child(2)").innerHTML = `<strong>Reseñador:</strong> ${review.reviewer_name}`;
            newReview.querySelector(".card-info-template p:nth-child(3)").innerHTML = `<strong>Fecha:</strong> ${review.review_date}`;
            newReview.querySelector(".card-info-template p:nth-child(4)").innerHTML = `<strong>Pros:</strong> ${review.pros}`;
            newReview.querySelector(".card-info-template p:nth-child(5)").innerHTML = `<strong>Contras:</strong> ${review.cons}`;
            newReview.querySelector(".card-comments-template p:nth-child(2)").textContent = review.comments;

            // Agregar la nueva review a la lista de reviews para mostrar en el contenedor
            reviews.push(newReview);
        }

        // Limpiar el contenedor antes de agregar las nuevas reviews
        reviewsContainer.innerHTML = '';

        // Paso 3: Agregar las reviews al frontend
        reviews.forEach(review => {
            reviewsContainer.appendChild(review);
        });
    });
}

// Llamar a la función para obtener y mostrar las reviews al cargar la página
fetchReviews();