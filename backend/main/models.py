from back_auth.models import User
from django.db import models


# Create your models here.


class Major(models.Model):
    name = models.CharField(max_length=255, blank=False, null=False)

    def __str__(self):
        return self.name


class Implement(models.Model):
    name = models.CharField(max_length=255, blank=False, null=False)
    description = models.TextField(blank=False, null=False)
    available = models.BooleanField(default=True)
    borrowed_by = models.ForeignKey(
        User, null=True, blank=True, on_delete=models.SET_NULL)
    borrow_date = models.DateTimeField(null=True, blank=True)
    return_date = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Dog(models.Model):
    name = models.CharField(max_length=255, blank=False, null=False)
