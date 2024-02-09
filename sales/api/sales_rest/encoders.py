from common.json import ModelEncoder
from .models import AutomobileVO, Sale, Salesperson, Customer
from decimal import Decimal


class SalespeopleEncoder(ModelEncoder):
  model = Salesperson
  properties = [
    "id",
    "first_name",
    "last_name",
    "employee_id"
  ]

class AutomobileVOEncoder(ModelEncoder):
   model = AutomobileVO
   properties = [
      "id",
      "vin",
      "sold"
   ]

class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
      "id",
      "first_name",
      "last_name",
      "address",
      "phone_number"
    ]

class SaleEncoder(ModelEncoder):
  model = Sale
  properties = [
    "id",
    "price",
    "customer",
    "salesperson",
    "automobile"
  ]
  encoders = {
    "customer": CustomerEncoder(),
    "salesperson": SalespeopleEncoder(),
    "automobile": AutomobileVOEncoder()
    }
