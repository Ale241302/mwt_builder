import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

def create_db():
    try:
        # Connect to default 'postgres' database to create the new one
        conn = psycopg2.connect(
            dbname='postgres',
            user='postgres',
            password='241302',
            host='127.0.0.1',
            port='5432'
        )
        conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cur = conn.cursor()
        # Check if DB exists
        cur.execute("SELECT 1 FROM pg_database WHERE datname='mwt_builder_db'")
        exists = cur.fetchone()
        if not exists:
            cur.execute("CREATE DATABASE mwt_builder_db")
            print("Database mwt_builder_db created successfully.")
        else:
            print("Database mwt_builder_db already exists.")
        cur.close()
        conn.close()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    create_db()
