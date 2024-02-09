from django.db import models


class AutomobileVO(models.Model):
  vin = models.CharField(max_length=200)
  sold = models.BooleanField()


class Salesperson(models.Model):
  first_name = models.CharField(max_length=200)
  last_name = models.CharField(max_length=200)
  employee_id = models.CharField(max_length=200)

class Customer(models.Model):
  first_name = models.CharField(max_length=200)
  last_name = models.CharField(max_length=200)
  address = models.CharField(max_length=200)
  phone_number = models.CharField(max_length=200)

class Sale(models.Model):
  price = models.DecimalField(max_digits=10, decimal_places=2)
  automobile = models.ForeignKey(
        AutomobileVO,
        related_name="sales",
        on_delete=models.CASCADE,
    )
  customer = models.ForeignKey(
        Customer,
        related_name="sales",
        on_delete=models.CASCADE,
    )
  salesperson = models.ForeignKey(
        Salesperson,
        related_name="sales",
        on_delete=models.CASCADE,
    )
