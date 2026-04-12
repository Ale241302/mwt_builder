from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Role, Artefacto

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'username']

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'

class ArtefactoSerializer(serializers.ModelSerializer):
    created_by_name = serializers.ReadOnlyField(source='created_by.username')

    class Meta:
        model = Artefacto
        fields = '__all__'
        extra_kwargs = {
            'created_by': {'required': False}
        }
