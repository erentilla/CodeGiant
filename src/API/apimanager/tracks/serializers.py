from rest_framework import serializers
from tracks.models import Track

#Track Serializer
class TrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Track
        fields = '__all__'