from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, get_user_model
from .models import Role, Artefacto
from .serializers import RoleSerializer, ArtefactoSerializer, UserSerializer

User = get_user_model()

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        # Custom validation as requested
        if username == 'Admin' and password == 'MuitoWork2026?':
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

    @action(detail=True, methods=['post'])
    def duplicate(self, request, pk=None):
        artefacto = self.get_object()
        new_artefacto = Artefacto.objects.create(
            title=f"{artefacto.title} (Copia)",
            structure_json=artefacto.structure_json,
            status='Draft',
            created_by=request.user
        )
        serializer = self.get_serializer(new_artefacto)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class RoleViewSet(viewsets.ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    permission_classes = [permissions.IsAuthenticated]
