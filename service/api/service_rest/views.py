from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from .models import Technician, Appointment, AutomobileVO
from .encoders import TechnicianListEncoder

@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
  if request.method == "GET":
    techs = Technician.objects.all()
    return JsonResponse(
      {
        "technicians": techs
      }, encoder=TechnicianListEncoder
    )
