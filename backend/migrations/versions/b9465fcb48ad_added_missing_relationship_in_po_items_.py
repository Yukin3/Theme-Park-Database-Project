"""added missing relationship in po items and updated item id to str dtype in parent and child tables.

Revision ID: b9465fcb48ad
Revises: 685fb2948bde
Create Date: 2024-10-23 09:04:46.752039

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision: str = 'b9465fcb48ad'
down_revision: Union[str, None] = '685fb2948bde'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Drop existing foreign key constraints
    # op.drop_constraint('fooditems_ibfk_1', 'fooditems', type_='foreignkey')
    # op.drop_constraint('rentals_ibfk_1', 'rentals', type_='foreignkey')
    # op.drop_constraint('sales_order_details_ibfk_2', 'sales_order_details', type_='foreignkey')
    # op.drop_constraint('beverageitems_ibfk_1', 'beverageitems', type_='foreignkey')
    # op.drop_constraint('merchandise_ibfk_1', 'merchandise', type_='foreignkey')

    # Change column types
    op.alter_column('merchandise', 'item_id',
               existing_type=mysql.INTEGER(),
               type_=mysql.VARCHAR(length=12),
               existing_comment='Foreign key referencing SKU in the Items table',
               existing_nullable=False)
    op.alter_column('beverageitems', 'sku',
               existing_type=mysql.INTEGER(),
               type_=mysql.VARCHAR(length=12),
               existing_comment='Foreign key referencing SKU in the Items table',
               existing_nullable=False)
    op.alter_column('fooditems', 'item_id',
               existing_type=mysql.INTEGER(),
               type_=mysql.VARCHAR(length=12),
               existing_comment='Foreign key linking to the ItemID in the items table',
               existing_nullable=False)
    op.alter_column('items', 'sku',
               existing_type=mysql.INTEGER(),
               type_=mysql.VARCHAR(length=12),
               existing_comment='Unique identifier for each item (primary key)',
               existing_nullable=False)
    op.alter_column('rentals', 'item_id',
               existing_type=mysql.INTEGER(),
               type_=mysql.VARCHAR(length=12),
               existing_comment='ID of the rented item, linked to Items table',
               existing_nullable=False)
    op.alter_column('sales_order_details', 'item_id',
               existing_type=mysql.INTEGER(),
               type_=mysql.VARCHAR(length=12),
               existing_comment='Foreign key referencing the item (SKU) in the inventory',
               existing_nullable=False)

    # Recreate foreign key constraints
    op.create_foreign_key('fooditems_ibfk_1', 'fooditems', 'items', ['item_id'], ['sku'])
    op.create_foreign_key('rentals_ibfk_1', 'rentals', 'items', ['item_id'], ['sku'])
    op.create_foreign_key('sales_order_details_ibfk_2', 'sales_order_details', 'items', ['item_id'], ['sku'])
    op.create_foreign_key('beverageitems_ibfk_1', 'beverageitems', 'items', ['sku'], ['sku'])
    op.create_foreign_key('merchandise_ibfk_1', 'merchandise', 'items', ['item_id'], ['sku'])



def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('sales_order_details', 'item_id',
               existing_type=mysql.VARCHAR(length=12),
               type_=mysql.INTEGER(),
               existing_comment='Foreign key referencing the item (SKU) in the inventory',
               existing_nullable=False)
    op.alter_column('rentals', 'item_id',
               existing_type=mysql.VARCHAR(length=12),
               type_=mysql.INTEGER(),
               existing_comment='ID of the rented item, linked to Items table',
               existing_nullable=False)
    op.alter_column('items', 'sku',
               existing_type=mysql.VARCHAR(length=12),
               type_=mysql.INTEGER(),
               existing_comment='Unique identifier for each item (primary key)',
               existing_nullable=False)
    op.alter_column('fooditems', 'item_id',
               existing_type=mysql.VARCHAR(length=12),
               type_=mysql.INTEGER(),
               existing_comment='Foreign key linking to the ItemID in the items table',
               existing_nullable=False)
    op.alter_column('beverageitems', 'sku',
               existing_type=mysql.VARCHAR(length=12),
               type_=mysql.INTEGER(),
               existing_comment='Foreign key referencing SKU in the Items table',
               existing_nullable=False)
    # ### end Alembic commands ###
