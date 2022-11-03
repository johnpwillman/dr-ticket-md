from fastapi.testclient import TestClient

from dotenv import load_dotenv
load_dotenv()

from main import app

client = TestClient(app)


def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello World"}