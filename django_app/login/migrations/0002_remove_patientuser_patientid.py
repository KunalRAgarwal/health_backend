# Generated by Django 4.2.3 on 2023-07-10 06:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('login', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='patientuser',
            name='patientid',
        ),
    ]
