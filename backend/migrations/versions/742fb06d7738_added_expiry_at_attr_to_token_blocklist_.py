"""added expiry at attr to token blocklist table.

Revision ID: 742fb06d7738
Revises: 25b0f9fd853d
Create Date: 2024-10-26 23:41:27.291014

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '742fb06d7738'
down_revision: Union[str, None] = '25b0f9fd853d'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('token_blocklist', sa.Column('expiry_at', sa.DateTime(), nullable=False))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('token_blocklist', 'expiry_at')
    # ### end Alembic commands ###