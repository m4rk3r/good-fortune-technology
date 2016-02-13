from django.shortcuts import render_to_response
from rest_framework import generics, viewsets
from rest_framework.permissions import AllowAny

from models import Fortune
from serializers import FortuneSerializer


def home(request):
    return render_to_response('index.html')


class FortuneAPI(viewsets.ModelViewSet, generics.CreateAPIView):
    queryset = Fortune.objects.all()
    serializer_class = FortuneSerializer
    permission_classes = (AllowAny,)