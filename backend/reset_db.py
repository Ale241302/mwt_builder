import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

def reset_db():
    try:
        conn = psycopg2.connect(dbname='postgres', user='postgres', password='241302', host='127.0.0.1', port='5432')
        conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cur = conn.cursor()
        
        # Kill other connections to the DB
        cur.execute("SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = 'mwt_builder_db' AND pid <> pg_backend_pid();")
        
        cur.execute("DROP DATABASE IF EXISTS mwt_builder_db")
        cur.execute("CREATE DATABASE mwt_builder_db")
        print("Database mwt_builder_db reset successfully.")
        cur.close()
        conn.close()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    reset_db()
