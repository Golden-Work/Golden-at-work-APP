# Generated by Django 4.1.7 on 2023-11-06 23:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0007_rename_borrowed_by_reservation_borrowed_by_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='reservation',
            old_name='borrowed_by_id',
            new_name='borrowed_by',
        ),
    ]