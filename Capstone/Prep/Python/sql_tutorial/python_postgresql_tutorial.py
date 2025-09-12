# from https://realpython.com/python-sql-libraries/#postgresql

import os
import psycopg2
from psycopg2 import OperationalError
from dotenv import load_dotenv

load_dotenv()


def create_connection(db_name, db_user, db_password, db_host, db_port):
    db_connection = None
    try:
        db_connection = psycopg2.connect(
            database=db_name or 'sm_app',
            user=db_user or 'sm_app_user', # sm_app_user CRUD data only, not tables
            password=db_password or os.getenv('SM_APP_DB_PASSWORD'),
            host=db_host,
            port=db_port,
        )
        print("Connection to PostgreSQL DB successful")
    except OperationalError as e:
        print(f"The error '{e}' occurred")
    return db_connection


# connection = create_connection(
#     "postgres", "", "abc123", "127.0.0.1", "5432"
# )

def create_database(db_connection, query):
    db_connection.autocommit = True
    cursor = db_connection.cursor()
    try:
        cursor.execute(query)
        print("Query executed successfully")
    except OperationalError as e:
        print(f"The error '{e}' occurred")


# create_database_query = "CREATE DATABASE sm_app"
# create_database(connection, create_database_query)

connection = create_connection(
    "sm_app", "sm_app_user", "", "127.0.0.1", "5432"
)


def execute_query(db_connection, query):
    db_connection.autocommit = True
    cursor = db_connection.cursor()
    try:
        cursor.execute(query)
        print(f"Query {query} executed successfully")
    except OperationalError as e:
        print(f"The error '{e}' occurred")


create_users_table = """
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,  
    name TEXT NOT NULL,
    age INTEGER,
    gender TEXT,
    nationality TEXT
)
"""
# execute_query(connection, create_users_table)

create_posts_table = """
CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    user_id INTEGER REFERENCES users(id)
)
"""

# execute_query(connection, create_posts_table)

create_comments_table = """
CREATE TABLE IF NOT EXISTS comments (
  id SERIAL PRIMARY KEY,
  text TEXT NOT NULL, 
  user_id INTEGER NOT NULL REFERENCES users(id), 
  post_id INTEGER NOT NULL REFERENCES posts(id)
);
"""

create_likes_table = """
CREATE TABLE IF NOT EXISTS likes (
  id SERIAL PRIMARY KEY, 
  user_id INTEGER NOT NULL REFERENCES users(id), 
  post_id INTEGER NOT NULL REFERENCES posts(id) 
);
"""

# execute_query(connection, create_comments_table)
# execute_query(connection, create_likes_table)

users = [
    ("James", 25, "male", "USA"),
    ("Leila", 32, "female", "France"),
    ("Brigitte", 35, "female", "England"),
    ("Mike", 40, "male", "Denmark"),
    ("Elizabeth", 21, "female", "Canada"),
]

user_records = ", ".join(["%s"] * len(users))

insert_query = (
    f"INSERT INTO users (name, age, gender, nationality) VALUES {user_records}"
)

# connection.autocommit = True
# cursor = connection.cursor()
# cursor.execute(insert_query, users)

posts = [
    ("Happy", "I am feeling very happy today", 1),
    ("Hot Weather", "The weather is very hot today", 2),
    ("Help", "I need some help with my work", 2),
    ("Great News", "I am getting married", 1),
    ("Interesting Game", "It was a fantastic game of tennis", 5),
    ("Party", "Anyone up for a late-night party today?", 3),
]

post_records = ", ".join(["%s"] * len(posts))

posts_insert_query = (
    f"INSERT INTO posts (title, description, user_id) VALUES {post_records}"
)

# connection.autocommit = True
# cursor = connection.cursor()
# cursor.execute(posts_insert_query, posts)

def execute_read_query(connection, query):
    cursor = connection.cursor()
    result = None
    try:
        cursor.execute(query)
        result = cursor.fetchall()
        return result
    except OperationalError as e:
        print(f"The error '{e}' occurred")

select_users = "SELECT * FROM users"
users = execute_read_query(connection, select_users)

for user in users:
    print(user)