"""added ticket types table and updated relationship with tickets table.

Revision ID: 9670082e60e3
Revises: ba0b2baa7e65
Create Date: 2024-11-12 06:46:51.373929

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision: str = '9670082e60e3'
down_revision: Union[str, None] = 'ba0b2baa7e65'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('ticket_type')


    op.create_table('ticket_type',
    sa.Column('ticket_type', sa.Enum('SEASONAL', 'WEEKEND', 'DAY_PASS', 'VIP', 'GROUP', 'STUDENT', name='tickettype'), nullable=False, comment="Enum-based type of the ticket (e.g., 'SEASONAL', 'VIP')"),
    sa.Column('description', mysql.VARCHAR(length=255), nullable=True, comment='Description of the ticket type with details of its features'),
    sa.Column('base_price', mysql.DECIMAL(precision=10, scale=2), nullable=False, comment='The base price of this ticket type'),
    sa.PrimaryKeyConstraint('ticket_type')
    )

    # op.create_foreign_key(
    #     'tickets_ibfk_2',
    #     'tickets', 'ticket_type',
    #     ['ticket_type'], ['ticket_type']
    # )
    # ### end Alembic commands ###


def downgrade() -> None:
    # Drop the foreign key constraint between tickets and ticket_type
    # op.drop_constraint('tickets_ibfk_2', 'tickets', type_='foreignkey')

    # Drop the ticket_type table
    # op.drop_table('ticket_type')
    op.create_table('ticket_type',
    sa.Column('ticket_type', sa.Enum('SEASONAL', 'WEEKEND', 'DAY_PASS', 'VIP', 'GROUP', 'STUDENT', name='tickettype'), nullable=False, comment="Enum-based type of the ticket (e.g., 'SEASONAL', 'VIP')"),
    sa.Column('description', mysql.VARCHAR(length=255), nullable=True, comment='Description of the ticket type with details of its features'),
    sa.Column('base_price', mysql.DECIMAL(precision=10, scale=2), nullable=False, comment='The base price of this ticket type'),
    sa.PrimaryKeyConstraint('ticket_type')
    )
