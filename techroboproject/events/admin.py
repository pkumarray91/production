
from django.contrib import admin
from .models import tblMain,tblWeekDay,tblTime, tblNotifications, tblTemplate, tblSubaccount, tblAccount

# Register your models here.

admin.site.register(tblMain,)
admin.site.register(tblWeekDay,)
admin.site.register(tblTime,)
admin.site.register(tblNotifications,)
admin.site.register(tblTemplate,)
admin.site.register(tblAccount,)
admin.site.register(tblSubaccount,)


