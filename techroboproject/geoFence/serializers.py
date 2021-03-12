from .models import *
from rest_framework import serializers, fields


#   def update(self, instance, validated_data):
#       albums_data = validated_data.pop('album_musician')
#       albums = (instance.album_musician).all()
#       albums = list(albums)
#       instance.first_name = validated_data.get('first_name', instance.first_name)
#       instance.last_name = validated_data.get('last_name', instance.last_name)
#       instance.instrument = validated_data.get('instrument', instance.instrument)
#       instance.save()

#      for album_data in albums_data:
#           album = albums.pop(0)
#           album.name = album_data.get('name', album.name)
#           album.release_date = album_data.get('release_date', album.release_date)
#           album.num_stars = album_data.get('num_stars', album.num_stars)
#           album.save()

#      return instance


# class CircleSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Circle
#         fields = ('id', 'radius', 'latitude', 'longtiude', 'circle')
#
#
# class RectangleSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Rectangle
#         fields = ('id', 'lat1', 'long1', 'lat2', 'long2', 'lat3', 'long3', 'lat4', 'long4', 'rectangle')


class GeolocationSerializer(serializers.ModelSerializer):
    # circle_geo = CircleSerializer(read_only=True, many=True)
    # rectangle_geo = RectangleSerializer(read_only=True, many=True)

    class Meta:
        model = Geolocation
        fields = (
            'id', 'name', 'location', 'latitude', 'longitude', 'fillColor', 'description', 'c_radius', 'c_lat', 'c_lng',
            'r_lat1',
            'r_lng1', 'r_lat2', 'r_lng2', 'r_lat3', 'r_lng3', 'r_lat4', 'r_lng4', 'is_deleted')

    # def create(self, validated_data):
    #     circle_data = validated_data.pop('circle_geo', 'rectangle_geo')
    #     geolocations = Geolocation.objects.create(**validated_data)
    #     for circle_datas in circle_data:
    #         Circle.objects.create(circle=geolocations, rectangle=geolocations, **circle_datas)
    #     return geolocations
    #
    # def update(self, instance, validated_data):
    #     circle_data = validated_data.pop('circle_geo')
    #     data = (instance.circle_geo).all()
    #     datas = list(data)
    #     instance.name = validated_data.get('name', instance.name)
    #     instance.description = validated_data.get('description', instance.description)
    #     instance.save()
    #
    #     for circle_datas in circle_data:
    #         data = datas.pop(0)
    #         data.name = circle_datas.get('name', data.name)
    #         data.description = circle_datas.get('description', data.description)
    #
    #         data.save()
    #
    #     return instance
