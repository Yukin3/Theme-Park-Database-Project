"""changed order date to date from datetime.

Revision ID: 46929d2bade4
Revises: 14b40bc58fdf
Create Date: 2024-10-23 08:00:33.430888

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision: str = '46929d2bade4'
down_revision: Union[str, None] = '14b40bc58fdf'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('purchaseorders', 'order_date',
               existing_type=mysql.DATETIME(),
               type_=sa.DATE(),
               existing_comment='Date when the order was placed',
               existing_nullable=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('purchaseorders', 'order_date',
               existing_type=sa.DATE(),
               type_=mysql.DATETIME(),
               existing_comment='Date when the order was placed',
               existing_nullable=False)
    # ### end Alembic commands ###