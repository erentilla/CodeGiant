from REST_API.models import REST_API_Models
from rest_framework import viewsets, permissions
from .serializers import REST_API_Serializer

#REST_API Viewset
class REST_API_ViewSet(viewsets.ModelViewSet):
    queryset = REST_API_Models.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = REST_API_Serializer