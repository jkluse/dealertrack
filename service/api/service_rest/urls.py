from django.urls import path

from .views import (
api_technicians,
api_technician,
api_appointments,
api_appointment
)

urlpatterns = [
    path(
      "technicians/",
      api_technicians,
      name="api_list_technicians",
    ),
    path(
      "technicians/<int:id>/",
      api_technician,
      name="api_technician"),
    path(
      "appointments/",
      api_appointments,
      name="api_appointments"
    ),
    path(
      "appointments/<int:id>/",
      api_appointment,
      name="api_appointment"
    ),
    path('appointments/<int:id>/cancel/',
        api_appointment,
        {'action': 'canceled'},
        name='cancel_appointment'),
    path('appointments/<int:id>/finished/',
        api_appointment,
        {'action': 'finished'},
        name='finish_appointment'),
]
