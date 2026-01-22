import re
from datetime import datetime, timedelta

import jwt
from django.conf import settings
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.db import connection
from django.contrib.auth.hashers import make_password, check_password

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework import status

USERNAME_PATTERN = re.compile(r"^[A-Za-z0-9_]{3,30}$")


def _validate_signup_payload(username, email, password):
    if not username or not email or not password:
        return "Username, email, and password are required."
    if not USERNAME_PATTERN.match(username):
        return "Username must be 3-30 characters and use only letters, numbers, and underscores."
    try:
        validate_email(email)
    except ValidationError:
        return "Enter a valid email address."
    return None


def _validate_login_payload(username, password):
    if not username or not password:
        return "Username and password are required."
    if not USERNAME_PATTERN.match(username):
        return "Enter a valid username."
    return None


def _generate_token(username):
    payload = {
        "sub": username,
        "iat": datetime.utcnow(),
        "exp": datetime.utcnow() + timedelta(hours=2),
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")


@api_view(["POST"])
@permission_classes([AllowAny])
def signup(request):
    full_name = request.data.get("full_name")
    username = request.data.get("username")
    email = request.data.get("email")
    password = request.data.get("password")

    validation_error = _validate_signup_payload(username, email, password)
    if validation_error:
        return Response({"error": validation_error}, status=status.HTTP_400_BAD_REQUEST)

    hashed_pwd = make_password(password)

    with connection.cursor() as cursor:
        # Check duplicates
        cursor.execute("SELECT 1 FROM users WHERE username=%s OR email=%s", [username, email])
        if cursor.fetchone():
            return Response({"error": "Username or email already exists."}, status=status.HTTP_400_BAD_REQUEST)

        cursor.execute(
            """
            INSERT INTO users (full_name, username, email, password_hash)
            VALUES (%s, %s, %s, %s)
            """,
            [full_name or username, username, email, hashed_pwd]
        )

    return Response({"message": "User created successfully!"}, status=status.HTTP_201_CREATED)


@api_view(["POST"])
@permission_classes([AllowAny])
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")

    validation_error = _validate_login_payload(username, password)
    if validation_error:
        return Response({"error": validation_error}, status=status.HTTP_400_BAD_REQUEST)

    with connection.cursor() as cursor:
        cursor.execute("SELECT password_hash FROM users WHERE username = %s", [username])
        row = cursor.fetchone()

    if row and check_password(password, row[0]):
        token = _generate_token(username)
        return Response(
            {"message": "Login successful!", "username": username, "token": token},
            status=status.HTTP_200_OK,
        )

    return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
