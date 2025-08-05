FROM python:3.9-slim

# Set workdir
WORKDIR /app

# Copy and install FastAPI and Uvicorn
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy app code
COPY main.py .

# Run the app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]
