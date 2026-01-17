from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.core.auth import get_clerk_claims

app = FastAPI(title="ThinkPath backend")

# Allow your Vite dev server to call your API
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "good"}

@app.get("/me")
def me(claims=Depends(get_clerk_claims)):
    clerk_user_id = claims.get("sub")
    if not clerk_user_id:
        raise HTTPException(status_code=401, detail="Invalid token (missing sub)")

    # TODO: query DB by clerk_user_id
    user = None  # replace with real DB lookup

    if user is None:
        # IMPORTANT: 403 means "authenticated but not allowed"
        raise HTTPException(
            status_code=403,
            detail="No ThinkPath account found. Please sign up or request access."
        )

    return {"id": user.id, "email": user.email}