"""added employee gender with enumerated type.

Revision ID: d382a385b924
Revises: 
Create Date: 2024-10-22 18:05:28.123114

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'd382a385b924'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('employees', sa.Column('gender', sa.Enum('M', 'F', 'N', name='employeegender'), nullable=False))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('employees', 'gender')
    # ### end Alembic commands ###
