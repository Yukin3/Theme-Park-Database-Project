from datetime import date, datetime
from pydantic import BaseModel

class MonthlyWeeklyCustomerCount(BaseModel):
    month: int 
    week: int
    num_customers: int

class FrequentRide(BaseModel):
    month: int 
    name: str
    num_rides: int

class RideCount(BaseModel):
    ride_name: str 
    ride_type: str 
    ride_count: int | None

class BrokenRide(BaseModel):
    ride_name: str 
    last_inspected: date
    ride_status: str 
    assigned_employee: str 
    maintenance_type: str 
    date_created: datetime 
    wo_status: str 

class InvoiceStatus(BaseModel):
    invoice_id: str 
    company_name: str 
    supply: str
    amount_due: float 
    payment_status: str

class HoursWorked(BaseModel):
    first_name: str 
    last_name: str 
    job_function: str 
    department: str 
    year: int 
    month: str 
    day: int 
    hours_worked: float 