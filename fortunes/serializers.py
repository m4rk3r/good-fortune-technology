from rest_framework import serializers

from models import Fortune


class FortuneSerializer(serializers.ModelSerializer):

    class Meta:
        model = Fortune
        fields = ('text', )