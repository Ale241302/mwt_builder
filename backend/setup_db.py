import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mwt_builder.settings')
django.setup()

from django.contrib.auth import get_user_model
from api.models import Role

User = get_user_model()

def setup_data():
    # Create Superuser
    if not User.objects.filter(username='Admin').exists():
        User.objects.create_superuser('Admin', 'admin@muito.work', 'MuitoWork2026?')
        print("Superuser 'Admin' created.")
    else:
        print("Superuser 'Admin' already exists.")

    # Create Roles
    roles = ['Admin', 'CEO']
    for role_name in roles:
        Role.objects.get_or_create(name=role_name)
    print("Initial roles created.")

if __name__ == "__main__":
    setup_data()
