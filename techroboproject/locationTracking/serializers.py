from .models import *
from rest_framework import serializers


class CoordinatesSerializer(serializers.ModelSerializer):
    class Meta:
        model = tblCoordinates
        fields = ('latitude', 'longitude')

class VehicleDataSerializer(serializers.ModelSerializer):
    position = CoordinatesSerializer(read_only=True, many=True)

    class Meta:
        model = tblVehicleData
        fields = ('vehicle_status', 'speed', 'vehicle_number', 'date_time', 'current_location', 'end_point', 'icon','icon_marker',
                  'position')
