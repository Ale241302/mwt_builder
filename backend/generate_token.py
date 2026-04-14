import os
import django
from datetime import timedelta

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mwt_builder.settings')
django.setup()

from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth import get_user_model

def generate_long_lived_token(username='Admin'):
    User = get_user_model()
    try:
        user = User.objects.get(username=username)
        token = AccessToken.for_user(user)
        # Set expiration to 99 years
        token.set_exp(lifetime=timedelta(days=365*99))
        return str(token)
    except User.DoesNotExist:
        return f"Error: User {username} not found"
    except Exception as e:
        return f"Error: {str(e)}"

if __name__ == "__main__":
    token = generate_long_lived_token()
    print("--- PERMANENT TOKEN (99 YEARS) ---")
    print(token)
    print("----------------------------------")
