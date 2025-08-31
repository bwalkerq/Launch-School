# app.py
from dotenv import load_dotenv
import os

# app.py
# Load environment variables from .env file
load_dotenv()

# app.py
# Accessing environment variables
database_url = os.getenv("DATABASE_URL")
secret_key = os.getenv("SECRET_KEY")
debug_mode = os.getenv("DEBUG")