from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.core.auth import get_clerk_claims
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.db.session import get_db
from app.db.models import User, InviteCode


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
def me(claims=Depends(get_clerk_claims), db: Session = Depends(get_db)):
    clerk_user_id = claims.get("sub")
    email = claims.get("email")
    email_verified = bool(claims.get("email_verified", False))

    user = db.query(User).filter(User.clerk_user_id == clerk_user_id).first()

    if not user:
        # auto-allow umbc.edu users
        if email and email_verified and email.lower().endswith("@umbc.edu"):
            user = User(
                clerk_user_id=clerk_user_id,
                email=email,
                email_verified=True,
                onboarding_completed=False,
            )
            db.add(user)
            db.commit()
            db.refresh(user)
        else:
            raise HTTPException(403, "Invite required")

    return {
        "id": str(user.id),
        "email": user.email,
        "needs_onboarding": not user.onboarding_completed,
    }


class InviteSignupRequest(BaseModel):
    code: str

@app.post("/signup/invite")
def signup_with_invite(
    payload: InviteSignupRequest,
    claims=Depends(get_clerk_claims),
    db: Session = Depends(get_db),
):
    clerk_user_id = claims.get("sub")
    if not clerk_user_id:
        raise HTTPException(status_code=401, detail="Invalid token (missing sub)")

    # If already has account, done
    existing = db.query(User).filter(User.clerk_user_id == clerk_user_id).first()
    if existing:
        return {"ok": True, "message": "Account already exists."}

    invite = db.query(InviteCode).filter(InviteCode.code == payload.code).first()
    if not invite or invite.used:
        raise HTTPException(status_code=400, detail="Invalid or already-used invite code.")

    # NOTE: These may be missing depending on Clerk JWT template.
    email = claims.get("email")
    email_verified = bool(claims.get("email_verified", False))

    # If your token doesn't include email, we can still create the account without it.
    # But for your requirement (“valid email”), you'll eventually want email + verified.
    user = User(
        clerk_user_id=clerk_user_id,
        email=email,
        email_verified=email_verified,
    )
    db.add(user)
    db.flush()  # assigns user.id

    invite.used = True
    invite.used_by_user_id = user.id

    db.commit()
    return {"ok": True, "message": "Account created."}

@app.post("/onboarding/complete")
def onboarding_complete(claims=Depends(get_clerk_claims), db: Session = Depends(get_db)):
    clerk_user_id = claims.get("sub")
    user = db.query(User).filter(User.clerk_user_id == clerk_user_id).first()
    if not user:
        raise HTTPException(403, "Invite required")
    user.onboarding_completed = True
    db.commit()
    return {"ok": True}
