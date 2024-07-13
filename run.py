from flask import Flask
from flask_cors import CORS
from app.views import *  # Importamos todas las vistas
from app.database import init_app, create_table_reviews, test_connection  # Importamos las funciones de la base de datos

app = Flask(__name__,
            static_folder='guitar_site',
            template_folder='guitar_site/resources')

# Definimos las rutas para la API-REST
app.route('/', methods=['GET'])(index)
# app.route('/', methods=['GET'])(index)

# Definimos las rutas para el CRUD de reviews
app.route('/api/reviews/', methods=['GET'])(get_reviews)

# Testeo: http://127.0.0.1:5000/api/reviews/ prueba
# CONSULTAR QUE LA FUNCION DEVUELVA => VER TEST 5

# busqueda por id no implementada
app.route('/api/reviews/<int:review_id>', methods=['GET'])(get_review)
app.route('/api/reviews/create/', methods=['POST'])(create_review)
# app.route('/api/reviews/update/<int:review_id>', methods=['PUT'])(update_review)
# app.route('/api/reviews/delete/<int:review_id>', methods=['DELETE'])(delete_review)


# Conexión a la base de datos
try:
    test_connection()
    init_app(app)
    CORS(app)
    create_table_reviews()
except Exception as e:
    print(f"Error al conectar a la base de datos: {e}")

if __name__ == '__main__':
    app.run(debug=True)