from django.db import models
from django.contrib.auth.models import AbstractUser

class Role(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

class UsuarioBuilder(AbstractUser):
    # Custom fields can be added here
    roles = models.ManyToManyField(Role, blank=True)

    class Meta:
        db_table = 'usuarios_builder'
        verbose_name = 'Usuario Builder'
        verbose_name_plural = 'Usuarios Builder'

class Artefacto(models.Model):
    title = models.CharField(max_length=255)
    created_by = models.ForeignKey(UsuarioBuilder, on_delete=models.CASCADE, related_name='artefactos')
    status = models.CharField(max_length=50, default='Published')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    structure_json = models.JSONField()

    def __str__(self):
        return self.title
