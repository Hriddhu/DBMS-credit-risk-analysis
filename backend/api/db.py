import psycopg2
from django.conf import settings

def get_db_connection():
    return psycopg2.connect(
        host="localhost",
        database="credit_risk",
        user="postgres",
        password="your_password"
    )
