from rest_framework import serializers
from .models import (tblMain,tblWeekDay, tblTime, tblNotifications, tblTemplate, tblAccount, tblSubaccount)


class MainSerializer(serializers.ModelSerializer):
    class Meta:
        model = tblMain
        fields = '__all__'

class WeekDaySerializer(serializers.ModelSerializer):
    class Meta:
        model = tblWeekDay
        fields = ['weekday']

class TimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = tblTime
        fields = '__all__'


class NotificationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = tblNotifications
        fields = '__all__'


class TemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = tblTemplate
        fields = '__all__'


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = tblAccount
        fields = '__all__'


class SubaccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = tblSubaccount
        fields = '__all__'
