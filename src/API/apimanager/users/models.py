from django.db import models

class User(models.Model):
    firstname = models.CharField(max_length=30)
    lastname  = models.CharField(max_length=30)
    userID    = models.IntegerField()
