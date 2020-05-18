from rest_framework import serializers
from REST_API.models import REST_API_Models

#REST_API Serializer
class REST_API_Serializer(serializers.ModelSerializer):
    class Meta:
        model  = REST_API_Models
        fields = '__all__'