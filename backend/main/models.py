from back_auth.models import User
from django.db import models
from uuid import uuid4
from storages.backends.gcloud import GoogleCloudStorage
from django.conf import settings
from datetime import datetime
# Create your models here.


class Major(models.Model):
    name = models.CharField(max_length=255, blank=False, null=False)

    def __str__(self):
        return self.name


class Implement(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='implements/', blank=True)
    def __str__(self):
        return self.name
    
class ImplementHistory(models.Model):
    implement = models.ForeignKey(Implement, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    action = models.CharField(max_length=255)  # No se como hacer para que se configure y que sea "Añadir", "Eliminar" y "Editar" y que se muestre cuando se haga el respectivo cambio
    timestamp = models.DateTimeField(default=datetime.now)

    def __str__(self):
        return f"{self.user.email} - {self.action} - {self.timestamp}"


class Reservation(models.Model):
    implement = models.ForeignKey(Implement, on_delete=models.CASCADE)
    borrowed_by = models.ForeignKey(
        User, null=True, blank=True, on_delete=models.SET_NULL)
    start_date = models.DateTimeField(null=True)
    end_date = models.DateTimeField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    return_state_description = models.TextField(blank=True)
    cancel_token = models.UUIDField(null=True, blank=True)

    RETURN_LABELS = (
        ('DAMAGED', 'Dañado'),
        ('LOST', 'Perdido'),
        ('WORKING', 'Funcionando'),
        ('ACCEPTABLE', 'Prestable'),
    )
    return_label = models.CharField(
        max_length=20,
        choices=RETURN_LABELS,
        default='WORKING'
    )

    STATUS_CHOICES = (
        ('AVAILABLE', 'Disponible'),
        ('RESERVED', 'Reservado'),
        ('BORROWED', 'Prestado'),
        ('RETURNED', 'Devuelto'),
    )
    status = models.CharField(
        max_length=20, 
        choices=STATUS_CHOICES,
        default='AVAILABLE'
    )

    def generate_cancel_token(self):
        token = uuid4()
        self.cancel_token = token
        self.save()

    def __str__(self):
        return f"{self.implement.name} - {self.borrowed_by.get_username if self.borrowed_by else 'N/A'}"
