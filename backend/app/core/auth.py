import os
import jwt
from jwt import PyJWKClient
from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from dotenv import load_dotenv

load_dotenv()

bearer = HTTPBearer(auto_error=False)

CLERK_JWKS_URL = os.getenv("CLERK_JWKS_URL")
CLERK_ISSUER = os.getenv("CLERK_ISSUER")

if not CLERK_JWKS_URL or not CLERK_ISSUER:
  raise RuntimeError("Missing CLERK_JWKS_URL or CLERK_ISSUER in backend/.env")

jwks_client = PyJWKClient(CLERK_JWKS_URL)

def get_clerk_claims(
    creds: HTTPAuthorizationCredentials = Depends(bearer),
) -> dict:
    if not creds or creds.scheme.lower() != "bearer":
        raise HTTPException(status_code=401, detail="Missing Bearer token")

    token = creds.credentials

    try:
        signing_key = jwks_client.get_signing_key_from_jwt(token).key

        claims = jwt.decode(
            token,
            signing_key,
            algorithms=["RS256"],
            issuer=CLERK_ISSUER,
            options={"verify_aud": False},  # keep simple for MVP
        )
        return claims

    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")
