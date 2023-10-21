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
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Reservation(models.Model):
    implement = models.ForeignKey(Implement, on_delete=models.CASCADE)
    borrowed_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL)
    borrow_date = models.DateTimeField(null=True, blank=True)
    return_date = models.DateTimeField(null=True, blank=True)
    return_state_description = models.TextField(blank=False, null=False)
    RETURN_LABELS = (
        ('DAMAGED', 'Dañado'),
        ('LOST', 'Perdido'),
        ('WORKING', 'Funcionando'),
        ('PRESTABLE', 'Prestable'),
    )
    return_label = models.CharField(
        max_length=20,
        choices=RETURN_LABELS,
        blank=True,
        null=True
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.implement.name} - {self.borrowed_by.get_username if self.borrowed_by else 'N/A'}"
