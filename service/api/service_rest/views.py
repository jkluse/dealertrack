import sys
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from django.db.models import BooleanField, Case, Value, When
from .models import Technician, Appointment, AutomobileVO
from .encoders import TechnicianListEncoder, AppointmentEncoder

@require_http_methods(["GET", "POST"])
def api_technicians(request):
  if request.method == "GET":
    techs = Technician.objects.all()
    return JsonResponse(
      {
        "technicians": techs
      }, encoder=TechnicianListEncoder
    )
  else: #POST
    try:
      content = json.loads(request.body)
      tech = Technician.objects.create(**content)
      return JsonResponse(
          tech,
          encoder=TechnicianListEncoder,
          safe=False,
      )
    except:
      response = JsonResponse(
          {"message": "Could not create the technician"}
      )
      response.status_code = 400
      return response

@require_http_methods(["DELETE"])
def api_technician(request, id):
  try:
    tech = Technician.objects.get(id=id)
    tech.delete()
    return JsonResponse(
        {"message": "Technician deleted successfully"},
        safe=False,
    )
  except Appointment.DoesNotExist:
      return JsonResponse({"message": "Technician does not exist"}, status=404)


@require_http_methods(["GET", "POST"])
def api_appointments(request):
  if request.method == "GET":
    vip_vins = set(AutomobileVO.objects.values_list('vin', flat=True))
    print("VIPS", vip_vins)

    Appointment.objects.filter(vin__in=vip_vins).update(isVIP=True)

    appointments = Appointment.objects.all()

    return JsonResponse(
        {"appointments": appointments},
        encoder=AppointmentEncoder,
    )
  else:  # POST
    try:
        content = json.loads(request.body)
        technician_id = content["technician"]
        technician = Technician.objects.get(id=technician_id)
        content["technician"] = technician
        appt = Appointment.objects.create(**content)

        return JsonResponse(
            appt,
            encoder=AppointmentEncoder,
            safe=False,
        )
    except Technician.DoesNotExist:
        return JsonResponse({"message": "Technician does not exist"}, status=400)
    except KeyError:
        return JsonResponse({"message": "Invalid request data. Missing 'technician' key"}, status=400)
    except Exception as e:
        exc_type = type(e).__name__
        exc_value = str(e)
        return JsonResponse({
            "message": "Could not create the appointment",
            "exception": {
                "type": exc_type,
                "value": exc_value
            }
        }, status=400)


@require_http_methods(["DELETE", "PUT"])
def api_appointment(request, id, action=None):
  if request.method == "DELETE":
    try:
      appt = Appointment.objects.get(id=id)
      appt.delete()
      return JsonResponse(
          {"message": "Appointment deleted successfully"},
          safe=False,
      )
    except Appointment.DoesNotExist:
        return JsonResponse({"message": "Appointment does not exist"}, status=404)

  else:
    try:
      appointment = Appointment.objects.get(id=id)
      if action == 'canceled' or action == 'finished':
        appointment.status = action
      else:
        raise ValueError("Invalid action")

      appointment.save()
      return JsonResponse(
          appointment,
          encoder=AppointmentEncoder,
          safe=False,
      )
    except Appointment.DoesNotExist:
        response = JsonResponse({"message": "Does not exist"})
        response.status_code = 404
        return response
