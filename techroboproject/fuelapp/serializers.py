from rest_framework import serializers

from .models import *
# speedometer serializer
# class TblFuelStatusSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = TblFuelStatus
#         fields = ('fuel_status_id','fuel_mgmt_id','fuel_level','volts','avl_time','insert_time','comments','is_deleted')
#
# class FuelMgmtSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = TblFuelMgmt
#         fields = ('fuel_mgmt_id','allocateddeallocate','sensor','tank_capacity')
#
#
# class FuelCalibrationDataSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = FuelCalibrationData
#         fields = ('fuel_calibration_data_id', 'fuel_mgmt_id', 'from_volt', 'to_volt', 'from_fuel', 'to_fuel')
        
