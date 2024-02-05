from django.db import models

# Create your models here.
class Technician(models.Model):
  first_name = models.CharField(max_length=200)
  last_name = models.CharField(max_length=200)
  employee_id = models.IntegerField

  # def get_api_url(self):
  #       return reverse("api_technician", kwargs={"pk": self.id})

class AutomobileVO(models.Model):
  vin = models.CharField(max_length=200)
  sold = models.BooleanField()


class Appointment(models.Model):
  date_time = models.DateTimeField()
  reason = models.CharField(max_length=500)
  status = models.CharField(max_length=100)
  vin = models.CharField(max_length=200)
  customer = models.CharField(max_length=200)
  technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.CASCADE,
    )
