from django.contrib import admin
from .models import TourCreation ,TourAllocate,StartPoint,EndPoint
# Register your models here.

class TourCreationAdmin(admin.ModelAdmin):
    list_display=('id','tour_name','start_point','end_point','stops','distance','duration','total_time','is_deleted','create_date_time')

class StartPointAdmin(admin.ModelAdmin):
    list_display=('id','start_address','lat','lng','is_deleted')

class EndPointAdmin(admin.ModelAdmin):
    list_display=('id','end_address','lat','lng','is_deleted')

class TourAllocateAdmin(admin.ModelAdmin):
    list_display = ('id','tour_allocate_name','Tour_Name','Vehicle_data','Date_allocate','Time_allocate','is_deleted')

admin.site.register(TourCreation,TourCreationAdmin)
admin.site.register(StartPoint,StartPointAdmin)
admin.site.register(TourAllocate,TourAllocateAdmin)
admin.site.register(EndPoint,EndPointAdmin)
#admin.site.register(StartEndLatLng)