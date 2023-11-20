from django.contrib import admin
from .models import Major, Implement, Reservation, LogInfo

# Register your models here.

admin.site.register(Major)
admin.site.register(Implement)
admin.site.register(Reservation)
admin.site.register(LogInfo)