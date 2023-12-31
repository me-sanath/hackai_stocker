from django.contrib.auth import get_user_model
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from .serializers import RegistrationSerializer
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def check_authentication(request):
    # If the request reaches here, it means the user is authenticated
    if request.user.is_authenticated:
        # User is logged in
        return Response({"authenticated": True})
    else:
        # User is not logged in
        return Response({"authenticated": False})

@api_view(['POST'])
def register(request):
    data = request.data
    print(data)
    password = data.get('password')
    email = data.get('email')
    user_name = data.get('name')

  
    user = User()
    user.email = email
    user.set_password(password)
    user.is_active = True
    user.username = user_name
    user.save()

    
    token = Token.objects.create(user=user)
    return Response({'token': token.key,
                    'user_id': user.id,
                    'username': user_name}, status=status.HTTP_201_CREATED)

class UserLoginView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        email = request.data.get('email')
        password = request.data.get('password')

        user = User.objects.filter(email=email).first()

        if user and user.check_password(password):
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key, 'user_id': user.id, 'username': user.username}, status=status.HTTP_200_OK)

        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
