from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ArtefactoViewSet, RoleViewSet, LoginView

router = DefaultRouter()
router.register(r'artefactos', ArtefactoViewSet)
router.register(r'roles', RoleViewSet)

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('', include(router.urls)),
]
