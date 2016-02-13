from django.shortcuts import render_to_response
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework import generics, viewsets
from rest_framework.permissions import AllowAny

from models import Fortune
from serializers import FortuneSerializer


@ensure_csrf_cookie
def home(request):
    return render_to_response('index.html')


class FortuneAPI(viewsets.ModelViewSet, generics.CreateAPIView):
    queryset = Fortune.objects.all()
    serializer_class = FortuneSerializer
    permission_classes = (AllowAny,)