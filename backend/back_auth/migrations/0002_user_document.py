# Generated by Django 4.2.5 on 2023-10-06 01:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('back_auth', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='document',
            field=models.CharField(default='', max_length=50),
            preserve_default=False,
        ),
    ]