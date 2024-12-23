import string 
import secrets
from sqlalchemy import event
# from sqlalchemy.future import select as async_select
# from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session
from typing import TYPE_CHECKING, List
from sqlmodel import SQLModel, Field, Relationship, Column, Index, ForeignKey, CheckConstraint, select
import sqlalchemy.dialects.mysql as mysql

# Importing models that will be used for relationships, but only during type-checking
from src.models.supplies import Supplies
if TYPE_CHECKING:
    from src.models.purchase_orders import PurchaseOrders

class PurchaseOrderDetails(SQLModel, table=True):
    __tablename__ = "orderdetails"  # Name of the table in the database
    
    @staticmethod
    def generate_random_id(length=12):
        characters = string.ascii_letters + string.digits
        return ''.join(secrets.choice(characters) for _ in range(length))
    
    # order_details_id is the primary key for the order details, uniquely identifying each record.
    order_details_id: int = Field(
        default_factory=lambda: PurchaseOrderDetails.generate_random_id(),
        sa_column=Column(mysql.VARCHAR(12), primary_key=True, nullable=False, comment="Unique ID for each order detail"),
        alias="OrderDetailsID"
    )
    
    # order_id is a foreign key referencing the PurchaseOrders table, linking each order detail to a specific order.
    order_id: str = Field(
        sa_column=Column(mysql.VARCHAR(12), ForeignKey("purchaseorders.order_id"), nullable=False, comment="ID of the related purchase order"),
        alias="OrderID"
    )
    
    # supply_id is a foreign key referencing the Supplies table, linking each order detail to a specific supply.
    supply_id: str = Field(
        sa_column=Column(mysql.VARCHAR(12), ForeignKey("supplies.supply_id"), nullable=False, comment="ID of the related supply"),
        alias="SupplyID"
    )
    
    # quantity is the number of units of the supply in this order detail. It cannot be negative.
    quantity: int = Field(
        sa_column=Column(mysql.INTEGER, nullable=False, comment="Quantity of the supply in the order detail"),
        alias="Quantity"
    )
    
    # unit_price is the price per unit of the supply in this order detail. It cannot be negative.
    unit_price: float = Field(
        sa_column=Column(mysql.DECIMAL(10, 2), nullable=False, comment="Price per unit of the supply in the order detail"),
        alias="UnitPrice"
    )

    # subtotal is a calculated property that returns the total price for this order detail (quantity * unit price).
    @property
    def subtotal(self): 
        return self.quantity * self.unit_price

    # Relationships
    # The PurchaseOrderDetails table is linked to the PurchaseOrders table (one-to-many relationship).
    purchase_order: "PurchaseOrders" = Relationship(back_populates="order_details")
    
    # The PurchaseOrderDetails table is linked to the Supplies table (one-to-many relationship).
    supplies: "Supplies" = Relationship(back_populates="order_details")

    # Table indexes and constraints
    __table_args__ = (
        # Adds an index to improve the performance of queries 
        Index("idx_order_details_id", "order_details_id"),
        Index("idx_order_id", "order_id"),
        Index("idx_supply_id", "supply_id"),
        
        # Ensures the quantity is always greater than zero (check constraint)
        CheckConstraint("quantity > 0", name="chk_po_quantity_positive"),
        
        # Ensures the unit price is always greater than zero (check constraint)
        CheckConstraint("unit_price > 0", name="chk_po_unit_price_positive"),
    )

# # Define an async event to listen for before inserting or updating
# @event.listens_for(PurchaseOrderDetails, "before_insert")
# @event.listens_for(PurchaseOrderDetails, "before_update")
# async def set_unit_price(mapper, connection, target):
#     """
#     Asynchronous event listener to set the unit price in PurchaseOrderDetails
#     before inserting or updating a record.
#     """
#     async with AsyncSession(connection) as session:
#         # Fetch the price from the Supplies table based on supply_id
#         result = await session.execute(
#             async_select(Supplies).where(Supplies.supply_id == target.supply_id)
#         )
#         supply = result.scalar_one_or_none()
#         print("FROM LISTENER")
#         print(supply)

#         if supply:
#             target.unit_price = supply.price
#         else:
#             raise ValueError(f"Supply with ID {target.supply_id} not found")

@event.listens_for(PurchaseOrderDetails, "before_insert")
@event.listens_for(PurchaseOrderDetails, "before_update")
def set_unit_price(mapper, connection, target):
    # Use a regular session with a synchronous query
    with Session(connection) as session:
        result = session.execute(
            select(Supplies).where(Supplies.supply_id == target.supply_id)
        )
        supply = result.scalar_one_or_none()
        if supply:
            print(f"Setting unit_price for supply_id: {target.supply_id}")
            target.unit_price = supply.price
        else:
            raise ValueError(f"Supply with ID {target.supply_id} not found")