from django.db import models
from accountConfig.models import CustomUser
# Create your models here.

class Company(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    to_notify = models.BooleanField()
    last_notified = models.IntegerField()
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
