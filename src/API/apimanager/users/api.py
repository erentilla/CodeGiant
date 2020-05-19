from users.models import User
from rest_framework import viewsets, permissions
from .serializers import UserSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from users.serializers import *

class UserList(APIView):

    def get(self, request):   
        model = User.objects.all()
        serializer = UserSerializer(model, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserDetail(APIView):

    def get(self, request, userID):
        try:
            model = User.objects.get(userID=userID)
        except:
            return Response(f'User with user ID {userID} is not found in database', status=status.HTTP_400_BAD_REQUEST)
        
        serializer = UserSerializer(model)
        return Response(serializer.data)

    def put(self, request, userID):
        try:
            model = User.objects.get(userID=userID)
        except:
            return Response(f'User with user ID {userID} is not found in database', status=status.HTTP_400_BAD_REQUEST)
        
        serializer = UserSerializer(model, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    def delete(self, request, userID):
        try:
            model = User.objects.get(userID=userID)
        except:
            return Response(f'User with user ID {userID} is not found in database', status=status.HTTP_400_BAD_REQUEST)
        
        model.delete()
        return Response(status=status.HTTP_200_OK)

"""
#User Viewset
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = UserSerializer
"""