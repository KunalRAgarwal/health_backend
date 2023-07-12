# Generated by Django 4.2.3 on 2023-07-10 09:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('bills', '0001_initial'),
        ('tests', '0002_alter_test_testid'),
    ]

    operations = [
        migrations.CreateModel(
            name='TestsConducted',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.IntegerField()),
                ('billid', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bills.bills')),
                ('testid', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tests.test')),
            ],
        ),
    ]
