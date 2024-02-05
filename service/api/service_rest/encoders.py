from common.json import ModelEncoder
from .models import Technician, Appointment, AutomobileVO


class TechnicianListEncoder(ModelEncoder):
  model = Technician
  properties = [
    "first_name",
    "last_name",
    "employee_id"
  ]

# from .models import Automobile, Manufacturer, VehicleModel


# class ManufacturerEncoder(ModelEncoder):
#     model = Manufacturer
#     properties = [
#         "id",
#         "name",
#     ]


# class VehicleModelEncoder(ModelEncoder):
#     model = VehicleModel
#     properties = [
#         "id",
#         "name",
#         "picture_url",
#         "manufacturer",
#     ]
#     encoders = {
#         "manufacturer": ManufacturerEncoder(),
#     }
