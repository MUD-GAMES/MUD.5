from django.db import models

class Players(models.Model):
    name=models.CharField(max_length=50)
