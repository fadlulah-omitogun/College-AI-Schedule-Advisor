"""add onboarding_completed to users

Revision ID: 7d2be853675a
Revises: 8262bcbd1ee3
Create Date: 2026-01-19 00:14:53.659903

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

def upgrade():
    op.add_column("users", sa.Column("onboarding_completed", sa.Boolean(), nullable=False, server_default=sa.text("false")))

def downgrade():
    op.drop_column("users", "onboarding_completed")
    
# revision identifiers, used by Alembic.
revision: str = '7d2be853675a'
down_revision: Union[str, Sequence[str], None] = '8262bcbd1ee3'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
