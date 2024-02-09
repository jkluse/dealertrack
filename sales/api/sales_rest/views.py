from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from .models import Sale, Salesperson, AutomobileVO, Customer
from .encoders import SalespeopleEncoder, SaleEncoder, AutomobileVOEncoder, CustomerEncoder


@require_http_methods(["GET", "POST"])
def api_salespeople(request):
  if request.method == "GET":
    salespeople = Salesperson.objects.all()
    return JsonResponse({
      "salespeople": salespeople
    },
    encoder=SalespeopleEncoder
    )
  else: #POST
    try:
      content = json.loads(request.body)
      tech = Salesperson.objects.create(**content)
      return JsonResponse(
          tech,
          encoder=SalespeopleEncoder,
          safe=False,
      )
    except:
      response = JsonResponse(
          {"message": "Could not create the technician"}
      )
      response.status_code = 400
      return response

@require_http_methods(["DELETE"])
def api_salesperson(request, id):
  try:
    salesperson = Salesperson.objects.get(id=id)
    salesperson.delete()
    return JsonResponse(
        {"message": "Salesperson deleted successfully"},
        safe=False,
    )
  except Salesperson.DoesNotExist:
      return JsonResponse({"message": "Salesperson does not exist"}, status=404)

@require_http_methods(["GET", "POST"])
def api_customers(request):
  if request.method == "GET":
    customers = Customer.objects.all()
    return JsonResponse({
      "customers": customers
    },
    encoder=CustomerEncoder
    )
  else: #POST
    try:
      content = json.loads(request.body)
      customer = Customer.objects.create(**content)
      return JsonResponse(
          customer,
          encoder=CustomerEncoder,
          safe=False,
      )
    except:
      response = JsonResponse(
          {"message": "Could not create the customer"}
      )
      response.status_code = 400
      return response

@require_http_methods(["DELETE"])
def api_customer(request, id):
  try:
    customer = Customer.objects.get(id=id)
    customer.delete()
    return JsonResponse(
        {"message": "Customer deleted successfully"},
        safe=False,
    )
  except Customer.DoesNotExist:
      return JsonResponse({"message": "Customer does not exist"}, status=404)


@require_http_methods(["GET", "POST"])
def api_sales(request):
  if request.method == "GET":
    sales = Sale.objects.all()
    return JsonResponse({
      "sales": sales
    },
    encoder=SaleEncoder
    )
  else: #POST
    try:
      content = json.loads(request.body)
      automobile = AutomobileVO.objects.get(vin=content["automobile"])
      customer = Customer.objects.get(id=content["customer"])
      salesperson = Salesperson.objects.get(id=content["salesperson"])

      content["salesperson"] = salesperson
      content["customer"] = customer
      content["automobile"] = automobile

      sale = Sale.objects.create(**content)
      return JsonResponse(
          sale,
          encoder=SaleEncoder,
          safe=False,
      )
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
@require_http_methods(["DELETE"])
def api_sale(request, id):
  try:
    sale = Sale.objects.get(id=id)
    sale.delete()
    return JsonResponse(
        {"message": "Sale deleted successfully"},
        safe=False,
    )
  except Sale.DoesNotExist:
      return JsonResponse({"message": "Sale does not exist"}, status=404)
