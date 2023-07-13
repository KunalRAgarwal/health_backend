import datetime
from django.db import models
from login.models import LabInfo
from bills.models import Bills
# import datetime

class Test(models.Model):
    testid = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    price = models.IntegerField()
    labid = models.ManyToManyField(LabInfo)

    def __str__(self):
        return self.name

class TestsConducted(models.Model):
    billid = models.ForeignKey(Bills, on_delete=models.CASCADE)
    testid = models.ForeignKey(Test, on_delete=models.CASCADE)
    price = models.IntegerField()
    created_on = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        test = self.testid
        if test:
            self.price = test.price
        super().save(*args, **kwargs)

    def __str__(self):
        return f"TestsConducted ID: {self.pk} - Bill ID: {self.billid} - Test ID: {self.testid}"