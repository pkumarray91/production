from .models import *
from rest_framework import serializers

class StartPointSerializers(serializers.ModelSerializer):
    class Meta:
        model =StartPoint
        fields=('id','lat','lng','is_deleted')
        read_only_field=('start_address',)

class EndPointSerializers(serializers.ModelSerializer):
    class Meta:
        model =EndPoint
        fields=('id','lat','lng','is_deleted')
        read_only_field = ('end_address',)


class TourAllocateSerializers(serializers.ModelSerializer):
    Tour_Name=serializers.ReadOnlyField(source='Tour_Name.tour_name',read_only=True)

    class Meta:
        model = TourAllocate
        fields= ('id','tour_allocate_name','Tour_Name','Vehicle_data','Date_allocate','Time_allocate','is_deleted')

class TourCreationSerializers(serializers.ModelSerializer):
    start_lat_lng=StartPointSerializers(many=True)
    end_lat_lng=EndPointSerializers(many=True)


    class Meta:
        model = TourCreation
        fields=('id','start_lat_lng','end_lat_lng','tour_name','start_point','end_point','stops','distance','duration','total_time','is_deleted','create_date_time')
        #read_only_field=('start_lat_lng','end_lat_lng')


    def create(self, validated_data):
        start = validated_data.pop('start_lat_lng',)
        end = validated_data.pop('end_lat_lng', )

        #print(start)
        tourcreations= TourCreation.objects.create(**validated_data)
        #print(tourcreations)
        for starts in start:
            StartPoint.objects.create(start_address=tourcreations, **starts)
        for ends in end:
            EndPoint.objects.create(end_address=tourcreations,**ends)
        return tourcreations

    def update(self, instance, validated_data):
        start_lat_lng= validated_data.pop('start_lat_lng',)
        end_lat_lng = validated_data.pop('end_lat_lng',)
        data = (instance.start_lat_lng).all()
        data1= (instance.end_lat_lng).all()
        datas = list(data)
        data1 =list(data1)

        instance.tour_name = validated_data.get("tour_name", instance.tour_name)
        #instance.group_id = validated_data.get("group_id", instance.group_id)
        instance.start_point = validated_data.get("start_point", instance.start_point)
        instance.end_point = validated_data.get("end_point", instance.end_point)
        instance.stops = validated_data.get("stops", instance.stops)
        instance.distance = validated_data.get("distance", instance.distance)
        instance.duration = validated_data.get("duration", instance.duration)
        instance.total_time = validated_data.get("total_time", instance.total_time)
        instance.is_deleted = validated_data.get("is_deleted", instance.is_deleted)
        instance.save()

        for choice in start_lat_lng:
            data = datas.pop(0)
            data.lat = choice.get('lat', data.lat)
            data.lng = choice.get('lng', data.lng)
            data.save()
            for choice in end_lat_lng:
                data=data1.pop(0)
                data.lat =choice.get('lat',data.lat)
                data.lng =choice.get('lng',data.lng)
                data.save()
        return instance










