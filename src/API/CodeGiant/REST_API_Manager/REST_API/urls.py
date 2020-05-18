from rest_framework import routers
from .api import REST_API_ViewSet

router = routers.DefaultRouter()
router.register('api/REST_API', REST_API_ViewSet, 'REST_API')

urlpatterns = router.urls