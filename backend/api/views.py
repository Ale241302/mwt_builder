from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import Role, Artefacto
from .serializers import RoleSerializer, ArtefactoSerializer, UserSerializer

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        # Custom validation as requested
        if username == 'Admin' and password == 'MuitoWork2026?':
            from django.contrib.auth.models import User
            user, created = User.objects.get_or_create(username='Admin')
            if created:
                user.set_password(password)
                user.save()
            
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': UserSerializer(user).data
            })
        
        return Response({'error': 'Credenciales inválidas'}, status=status.HTTP_401_UNAUTHORIZED)

class ArtefactoViewSet(viewsets.ModelViewSet):
    queryset = Artefacto.objects.all().order_by('-created_at')
    serializer_class = ArtefactoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class RoleViewSet(viewsets.ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    permission_classes = [permissions.IsAuthenticated]
