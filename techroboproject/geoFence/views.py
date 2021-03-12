from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework import generics, status
from .models import *
from rest_framework.response import Response

# Create your views here.


# class GeoLocationListView(generics.ListCreateAPIView):
#     queryset = Geolocation.objects.all()
#     serializer_class = GeolocationSerializer
#
#
# class GeoLocationView(generics.RetrieveUpdateDestroyAPIView):
#     serializer_class = GeolocationSerializer
#     queryset = Geolocation.objects.all()

class GeoLocationView(APIView):
    serializer_class = GeolocationSerializer

    def get(self, request, pk=None):
        id = pk
        if id is not None:
            geofencecreation = Geolocation.objects.get(id=id)
            serializer = GeolocationSerializer(geofencecreation)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            geofencecreation = Geolocation.objects.filter(is_deleted=False)
            print("query :", geofencecreation.query)
            serializer = GeolocationSerializer(geofencecreation, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data
        serializer = GeolocationSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        id = pk
        data = request.data
        geofencecreation = Geolocation.objects.get(id=id)
        serializer = GeolocationSerializer(geofencecreation, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        id = pk
        geofence = Geolocation.objects.get(id=id)
        geofence.is_deleted = True
        geofence.save()
        serializer = GeolocationSerializer(geofence)
        return Response({'msg': 'delete success', 'data': serializer.data}, status=status.HTTP_200_OK)

# class CircleListView(generics.ListCreateAPIView):
#     serializer_class = CircleSerializer
#     queryset = Circle.objects.all()
#
#
# class CircleView(generics.RetrieveUpdateDestroyAPIView):
#     serializer_class = CircleSerializer
#     queryset = Circle.objects.all()
#
#
# class RectangleListView(generics.ListCreateAPIView):
#     serializer_class = RectangleSerializer
#     queryset = Rectangle.objects.all()
#
#
# class RectangleView(generics.RetrieveUpdateDestroyAPIView):
#     serializer_class = RectangleSerializer
#     queryset = Rectangle.objects.all()
