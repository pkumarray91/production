# from django.shortcuts import render
# from .models import  tblurl
# from rest_framework import generics
# from .serializers import tblcountrySerializer,tblresellerSerializer,tblurlSerializer,\
#     tbluserSerializer ,tblvehicleSerializer,tblpassengerSerializer,tblvehicletypeSerializer,\
#     tbltrailerSerializer,tbldriverSerializer,tblcompanySerializer,tbladdressSerializer,tblgroupSerializer
# from .models import (tblcountries,tblreseller,tblurl,
#                      tbluser,tblvehicle,tblpassengers,tblvehicletype,
#                      tbltrailers,tbldriver,tblcompany,tbladdress,
#                      tblgroup)
# from rest_framework.authentication import BaseAuthentication,SessionAuthentication
# from rest_framework.permissions import IsAuthenticated
# # Create your views here.
#
#
# # first api for countries
#
# class tblCountry_CR_View(generics.ListCreateAPIView):
#     queryset = tblcountries.objects.all()
#     serializer_class = tblcountrySerializer
#
# class tblCountry_RU_View(generics.RetrieveUpdateAPIView):
#     queryset = tblcountries.objects.all()
#     serializer_class = tblcountrySerializer
#
# # 2nd  api for countries
#
# class tblReseller_CR_View(generics.ListCreateAPIView):
#     queryset = tblreseller.objects.all()
#     serializer_class = tblresellerSerializer
#
# class tblReseller_RU_View(generics.RetrieveUpdateAPIView):
#     queryset = tblreseller.objects.all()
#     serializer_class = tblresellerSerializer
#
# # 3rd api for countries
#
# class tblUrl_CR_View(generics.ListCreateAPIView):
#     queryset = tblurl.objects.all()
#     serializer_class = tblurlSerializer
#
# class tblUrl_RU_View(generics.RetrieveUpdateAPIView):
#     queryset = tblurl.objects.all()
#     serializer_class = tblurlSerializer
#
#
#
#
#
#
#
#
#
#
# # Create your views here.
# from rest_framework.response import Response
# from rest_framework import generics
# from rest_framework.views import APIView
#
# from .serializers import CoordinatesSerializer
# from .models import tblCoordinates
#
#
# class Coordinates_CR_View(generics.ListCreateAPIView):
#     queryset = tblCoordinates.objects.all()
#     serializer_class = CoordinatesSerializer
