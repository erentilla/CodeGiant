from django.db import models

class Track(models.Model):
    name = models.CharField(max_length=30)
    subject = models.CharField(max_length=30)
    difficulty = models.CharField(max_length=30)
    duration = models.CharField(max_length=30)
