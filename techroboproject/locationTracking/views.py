# from django.shortcuts import render
#
# # Create your views here.
# from rest_framework.response import Response
# from rest_framework import generics
# from rest_framework.views import APIView
#
# from .serializers import CoordinatesSerializer, VehicleDataSerializer
# from .models import tblVehicleData,tblCoordinates
#
#
# # class CoordinatesView(APIView):
# #     serializer_class = CoordinatesSerializer
# #
# #     def get(self, request):
# #         # coordinate = [{"latitude": coordinate.latitude, "longitude": coordinate.longitude}
# #         #               for coordinate in tblCoordinates.objects.all()]
# #         coordinate=tblCoordinates.objects.all()
# #         return Response(coordinate)
# # class Coordinates_CR_View(generics.ListCreateAPIView):
# #     queryset = tblCoordinates.objects.all()
# #     serializer_class = CoordinatesSerializer
#
# class VehicleData_CR_View(generics.ListCreateAPIView):
#     queryset = tblVehicleData.objects.all()
#     serializer_class =  VehicleDataSerializer
# # class Coordinates_RU_View(generics.RetrieveUpdateAPIView):
# #     queryset = tblCoordinates.objects.all()
# #     serializer_class = CoordinatesSerializer'''



from .serializers import *
from rest_framework import generics
# Create your views here.


class VehicleData_CR_View(generics.ListCreateAPIView):
    queryset = tblVehicleData.objects.all()
    serializer_class = VehicleDataSerializer

class Coordinates_CR_View(generics.ListCreateAPIView):
    queryset = tblCoordinates.objects.all()
    serializer_class = CoordinatesSerializer


