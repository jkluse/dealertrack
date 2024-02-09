from common.json import ModelEncoder
from .models import Technician, Appointment, AutomobileVO


class TechnicianListEncoder(ModelEncoder):
  model = Technician
  properties = [
    "id",
    "first_name",
    "last_name",
    "employee_id"
  ]


class AppointmentEncoder(ModelEncoder):
  model = Appointment
  properties = [
    "id",
    "date_time",
    "reason",
    "status",
    "vin",
    "customer",
    "technician",
    "isVIP"
  ]
  encoders = {
    "technician": TechnicianListEncoder()
  }

