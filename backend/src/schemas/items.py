from enum import Enum
from pydantic import BaseModel
from typing import Optional

class ItemCategory(str, Enum):
    merch = "Merchandise"
    concession = "Concession"
    entertainment = "Entertainment"
    other = "Other"

class ItemStatus(str, Enum):
    active = "Active"
    discontinued = "Discontinued"
    backorder = "Backorder"

class Item(BaseModel):
    sku: str 
    name: str 
    category: ItemCategory
    price: float 
    cost: float 
    status: ItemStatus
    vendor_id: str

class ItemCreateModel(BaseModel):
    sku: str 
    name: str 
    category: ItemCategory
    price: float 
    cost: float 
    status: Optional[ItemStatus | None] = 'Active'
    vendor_id: str

class ItemUpdateModel(BaseModel):
    sku: str 
    name: str 
    category: Optional[ItemCategory]
    price: Optional[float ]
    cost: Optional[float ]
    status: ItemStatus
    vendor_id: str