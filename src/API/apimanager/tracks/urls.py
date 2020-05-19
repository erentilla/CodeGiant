from rest_framework import routers
from .api import TrackViewSet

router = routers.DefaultRouter()
router.register('api/tracks', TrackViewSet, 'tracks')

urlpatterns = router.urls
