# Generated by Django 4.2.5 on 2023-11-06 03:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0006_reservation_cancel_token'),
    ]

    operations = [
        migrations.RenameField(
            model_name='reservation',
            old_name='borrowed_by',
            new_name='borrowed_by_id',
        ),
    ]