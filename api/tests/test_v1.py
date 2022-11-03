from fastapi.testclient import TestClient

from dotenv import load_dotenv
load_dotenv()

from main import app

client = TestClient(app)


def test_root():
    response = client.get("v1")
    assert response.status_code == 200
    assert response.json() == {"message": "v1 root"}

def test_ticket_post():
    assert 1==1
    response = client.post(
        url="v1/tickets",
        json={
            "subject": "test",
            "body": "i need help",
            "submitted_by": "test@example.com"
        }
    )
    assert response.json() == {"message": "ticket posted"}