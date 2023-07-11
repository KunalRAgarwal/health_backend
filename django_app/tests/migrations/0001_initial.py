# Generated by Django 4.2.3 on 2023-07-10 06:34

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('login', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Test',
            fields=[
                ('testid', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('price', models.IntegerField()),
                ('labid', models.ManyToManyField(to='login.labinfo')),
            ],
        ),
    ]