from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from rest_framework import generics

from .serializers import (MainSerializer, WeekDaySerializer, TimeSerializer, NotificationsSerializer, TemplateSerializer,
                          AccountSerializer, SubaccountSerializer)
from .models import (tblMain,tblWeekDay,tblTime, tblNotifications, tblTemplate, tblAccount, tblSubaccount)


# Create your views here.

class Main_CR_View(generics.ListCreateAPIView):
    queryset = tblMain.objects.all()
    serializer_class = MainSerializer

class Main_RU_View(generics.RetrieveUpdateAPIView):
    queryset = tblMain.objects.all()
    serializer_class = MainSerializer

class WeekDay_CR_View(generics.ListCreateAPIView):
    queryset = tblMain.objects.all()
    serializer_class = WeekDaySerializer


class WeekDay_RU_View(generics.RetrieveUpdateAPIView):
    queryset = tblMain.objects.all()
    serializer_class = WeekDaySerializer

class Time_CR_View(generics.ListCreateAPIView):
    queryset = tblTime.objects.all()
    serializer_class = TimeSerializer


class Time_RU_View(generics.RetrieveUpdateAPIView):
    queryset = tblTime.objects.all()
    serializer_class = TimeSerializer


class Notifications_CR_View(generics.ListCreateAPIView):
    queryset = tblNotifications.objects.all()
    serializer_class = NotificationsSerializer


class Notifications_RU_View(generics.RetrieveUpdateAPIView):
    queryset = tblNotifications.objects.all()
    serializer_class = NotificationsSerializer


class Template_CR_View(generics.ListCreateAPIView):
    queryset = tblTemplate.objects.all()
    serializer_class = TemplateSerializer


class Template_RU_View(generics.RetrieveUpdateAPIView):
    queryset = tblTemplate.objects.all()
    serializer_class = TemplateSerializer

class Account_CR_View(generics.ListCreateAPIView):
    queryset = tblAccount.objects.all()
    serializer_class = AccountSerializer


class Account_RU_View(generics.RetrieveUpdateAPIView):
    queryset = tblAccount.objects.all()
    serializer_class = AccountSerializer

class Subaccount_CR_View(generics.ListCreateAPIView):
    queryset = tblSubaccount.objects.all()
    serializer_class = SubaccountSerializer


class Subaccount_RU_View(generics.RetrieveUpdateAPIView):
    queryset = tblSubaccount.objects.all()
    serializer_class = SubaccountSerializer



