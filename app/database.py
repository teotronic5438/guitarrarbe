import os
import psycopg2 # type: ignore
from flask import g
from dotenv import load_dotenv  # type: ignore # Cargamos el paquete dotenv para manejar variables de entorno

# Cargar variables de entorno desde el archivo .env
load_dotenv()

# Configuración de la base de datos usando variables de entorno
DATABASE_CONFIG = {
    'user': os.getenv('DB_USERNAME'),
    'password': os.getenv('DB_PASSWORD'),
    'host': os.getenv('DB_HOST'),
    'database': os.getenv('DB_NAME'),
    'port': os.getenv('DB_PORT', 5432)
}

# Función para obtener la conexión a la base de datos
def get_db():
    if 'db' not in g:
        try:
            g.db = psycopg2.connect(**DATABASE_CONFIG)
        except psycopg2.DatabaseError as e:
            print(f"Error al conectar a la base de datos: {e}")
            raise
    return g.db

# Función para cerrar la conexión a la base de datos
def close_db(e=None):
    db = g.pop('db', None)
    if db is not None:
        db.close()

# Función para inicializar la aplicación con el manejo de la base de datos
def init_app(app):
    app.teardown_appcontext(close_db)

# Función para probar la conexión a la base de datos
def test_connection():
    try:
        conn = psycopg2.connect(**DATABASE_CONFIG)
        cur = conn.cursor()
        conn.commit()
        cur.close()
        conn.close()
        print("Conexión exitosa a la base de datos")
    except psycopg2.DatabaseError as e:
        print(f"Error al conectar a la base de datos: {e}")

# Función para crear la tabla de reviews de guitarras
def create_table_reviews():
    conn = psycopg2.connect(**DATABASE_CONFIG)
    cur = conn.cursor()
    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS reviews(
            id SERIAL PRIMARY KEY,
            guitar_model VARCHAR(100) NOT NULL,
            brand VARCHAR(100) NOT NULL,
            rating INTEGER NOT NULL,
            reviewer_name VARCHAR(100),
            review_date DATE,
            pros TEXT,
            cons TEXT,
            comments TEXT
        );
        """
    )
    conn.commit()
    cur.close()
    conn.close()
