// fetch_data_post.js
let submitButton = document.querySelector("#Crear");
// console.log(submitButton);

submitButton.addEventListener("click", () => {
    const formData = {
        guitar_model: document.querySelector("#guitar_model").value,
        brand: document.querySelector("#brand").value,
        rating: parseInt(document.querySelector("#rating").value),
        reviewer_name: document.querySelector("#reviewer_name").value,
        review_date: document.querySelector("#review_date").value,
        pros: document.querySelector("#pros").value,
        cons: document.querySelector("#cons").value,
        comments: document.querySelector("#comments").value
    }

    fetchData("http://127.0.0.1:5000/api/reviews/create/", "POST", data => {
        console.log("Review created successfully:", data);
            // quiero resetar el formulario para no duplicar la informacion

            // DA ERROR AL RESETEAR VER CON EL PROFESOR
            // document.querySelector("#Formulario").reset();
            // cambiar la ruta, enviarla a tareas pendientes



            // ver con el profesor
            window.location.replace("../resources/index.html");
    }, formData);
})