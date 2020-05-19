from django.contrib import admin
from django.urls import path, include

from django.conf.urls import url
from users.api import UserList, UserDetail

urlpatterns = [
    #path('admin/', admin.site.urls),
    
    #path('', include('users.urls')),
    path('', include('tracks.urls')),
    url(r'^api/users/$', UserList.as_view(), name='users'),
    url(r'^api/users/(?P<userID>\d+)$', UserDetail.as_view(), name='users'),

]
