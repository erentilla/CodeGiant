from django.db import models

class REST_API_Models(models.Model):
    first_name = models.CharField(max_length=100)
    last_name  = models.CharField(max_length=100)
    email      = models.EmailField(max_length=100, unique=True)
    message    = models.CharField(max_length=500, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)