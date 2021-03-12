from django.contrib.auth import get_user_model, password_validation
from rest_framework.authtoken.models import Token
from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from rest_framework.generics import get_object_or_404

from .models import *

User = get_user_model()


class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=20, min_length=6, write_only=True,required=False)
    auth_token = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = (
            'id', 'email', 'password', 'first_name', 'last_name', 'is_active', 'is_staff', 'is_superuser', 'auth_token',
            'user_url','user_type', 'contact_number', 'reseller', 'company', 'group', 'driver','category_type','is_deleted')

    # def validate(self, request):
    #     email = request.get('email', '')
    #     password = request.get('password', '')
    #     if not email:
    #         raise serializers.ValidationError({'field': "This email field may not be blank"})
    #     if not password:
    #         raise serializers.ValidationError({'field': "This password field may not be blank"})
    #     return request

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super(UserRegisterSerializer, self).create(validated_data)

    def get_auth_token(self, obj):
        token = Token.objects.filter(user=obj)
        if token:

            token = token[0]
        else:
            token = Token.objects.create(user=obj)
        return token.key


class ResellerSerializer(serializers.ModelSerializer):
    class Meta:
        model = tblreseller
        fields = ('reseller_id','reseller_url', 'reseller_name', 'company_name', 'is_deleted', 'created_at','is_deleted')

class TblUrlSerializer(serializers.ModelSerializer):
    class Meta:
        model =tblurl
        fields =('url','serverIP','created_at')


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = tblcompany
        fields = ('company_id','name', 'contact_number', 'reseller', 'is_deleted',)

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = tblgroup
        fields = ('group_id', 'company', 'group_name', 'is_deleted')


class DeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = tbldevice
        fields = ('device_id', 'reseller', 'device_name', 'GSM_number', 'ICCID_number', 'IMEI_number', 'device_type',
            'available','is_deleted')

class LocationTrackingSerializer(serializers.ModelSerializer):
    class Meta:
        model=tblLocationTracking
        fields=('Vehicle','Receive_Time','Longitude','Latitude','Altitude','Angle','Satellites','Speed','Formatted_address',
                'Geometery_latitude','Geometery_longitude','Location_type','Place_Id')

class VehicleSerializer(serializers.ModelSerializer):
   #locationtracking = LocationTrackingSerializer(many=True)
    class Meta:
        model = tblvehicle
        fields =  ('company','vehicle_id','vehicle_number','vehicle_icons', 'vehicle_marker', 'description', 'is_deleted',)

class AllocateDeallocateSerializer(serializers.ModelSerializer):
    class Meta:
        model=tblallocatedeallocate
        fields =('alloctae_deallocate_id','vehicle','device','allocate_on','deallocate_on','add_notes','is_deleted')

class AuditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Audit
        fields = ('file', 'upload_timestamp')

class TblFuelStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = TblFuelStatus
        fields = ('fuel_status_id','fuel_mgmt_id','fuel_level','volts','avl_time','insert_time','comments','is_deleted')

class FuelMgmtSerializer(serializers.ModelSerializer):
    class Meta:
        model = TblFuelMgmt
        fields = ('fuel_mgmt_id','allocateddeallocate','sensor','tank_capacity')


class FuelCalibrationDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = FuelCalibrationData
        fields = ('fuel_calibration_data_id', 'fuel_mgmt', 'from_volt', 'to_volt', 'from_fuel', 'to_fuel')

class UserLoginSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=300, required=True)
    password = serializers.CharField(required=True, write_only=True)
    is_deleted =serializers.BooleanField(default=False)


class AuthUserSerializer(serializers.ModelSerializer):
    auth_token = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'is_active', 'is_staff', 'is_superuser', 'auth_token',)
        read_only_fields = ('id', 'is_active', 'is_staff')

    def get_auth_token(self, obj):
        token = Token.objects.filter(user=obj)
        if token:

            token = token[0]
        else:
            token = Token.objects.create(user=obj)
        return token.key


class AuthOtherUserserSerializer(serializers.ModelSerializer):
    auth_token = serializers.SerializerMethodField()


    class Meta:
        model = User
        fields = ('id', 'email', 'user_type', 'user_url', 'auth_token','reseller','company','category_type','is_deleted')

    def get_auth_token(self, obj):
        token = Token.objects.filter(user=obj)
        if token:

            token = token[0]
        else:
            token = Token.objects.create(user=obj)
        return token.key


# change current password
class PasswordChangeSerializer(serializers.Serializer):
    current_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate_current_password(self, value):
        if not self.context['request'].user.check_password(value):
            raise serializers.ValidationError('Current password does not match')
        return value

    def validate_new_password(self, value):
        password_validation.validate_password(value)
        return value

#
#
# from django.contrib.auth import get_user_model, password_validation
# from rest_framework.authtoken.models import Token
# from rest_framework import serializers
#
# User = get_user_model()
#
#
# class UserLoginSerializer(serializers.Serializer):
#     email = serializers.CharField(max_length=300, required=True)
#     password = serializers.CharField(required=True, write_only=True)
#
#
# class AuthUserSerializer(serializers.ModelSerializer):
#     auth_token = serializers.SerializerMethodField()
#
#     class Meta:
#         model = User
#         fields = ('id', 'email', 'first_name', 'last_name', 'is_active', 'is_staff', 'is_superuser', 'auth_token')
#         read_only_fields = ('id', 'is_active', 'is_staff')
#
#     def get_auth_token(self, obj):
#         token = Token.objects.filter(user=obj)
#         if token:
#
#             token = token[0]
#         else:
#             token = Token.objects.create(user=obj)
#         return token.key
#
#
# class AuthOtherUserserSerializer(serializers.ModelSerializer):
#     auth_token = serializers.SerializerMethodField()
#
#     class Meta:
#         model = User
#         fields = ('id', 'email', 'user_type', 'reseller_type', 'auth_token')
#
#     def get_auth_token(self, obj):
#         token = Token.objects.filter(user=obj)
#         if token:
#
#             token = token[0]
#         else:
#             token = Token.objects.create(user=obj)
#         return token.key
