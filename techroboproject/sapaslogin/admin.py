
from django.contrib import admin
from .models import *
from django.contrib.auth.admin import UserAdmin
# Register your models here.
admin.site.register(User,)
admin.site.register(tblurl,)
admin.site.register(tblcountries,)
admin.site.register(tblreseller,)
admin.site.register(tbladdress,)
admin.site.register(tblcompany,)
admin.site.register(tblgroup,)
admin.site.register(tbldevice,)
admin.site.register(tblvehicle,)
admin.site.register(tblallocatedeallocate,)
admin.site.register(Audit,)
admin.site.register(TblFuelMgmt,)
admin.site.register(TblFuelStatus,)
admin.site.register(FuelCalibrationData,)
# admin.site.register(tblLocationTracking,)

# from django.contrib import admin
# from .models import (User,tblurl,tblcompany,tblgroup,
#                      tblcountries,tbladdress,tblreseller,tblsubgroup,tbldriver)
#
# # Register your models here.
# admin.site.register(User,)
# admin.site.register(tblurl,)
# admin.site.register(tblcountries,)
# admin.site.register(tblreseller,)
# admin.site.register(tbladdress,)
# admin.site.register(tblcompany,)
# admin.site.register(tblgroup,)
# admin.site.register(tblsubgroup)
# admin.site.register(tbldriver)
