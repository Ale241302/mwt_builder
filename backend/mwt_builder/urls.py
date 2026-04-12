from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    # path('admin/', admin.site.urls), # Admin disabled for simplicity or can be enabled
    path('api/', include('api.urls')),
]
