from django.conf.urls import url
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from sapaslogin import views
from .views import ResellerRegisterView, CompanyRegisterView, ResellerUserRegisterView, \
    CompanyUserRegisterView, DeviceRegisterView, CompanyVehicleRegisterView, AllocateView,\
    DeallocateView, VehicleView,LocationTracking,AuditView,FuelCalibrationView,SpeedoMeterView,FuelCalibrationDataView

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register('api/auth', views.AuthViewSet, basename='api/auth')

urlpatterns = [
    path('', include(router.urls)),
    path('Reseller/', ResellerRegisterView.as_view(), name='Reseller'),
    path('Reseller/<int:pk>/', ResellerRegisterView.as_view(), name='Reseller'),

    path('ResellerUserRegister/', ResellerUserRegisterView.as_view(), name='ResellerUserRegister'),
    url(r'^ResellerUserRegister/(?P<pk>https?:\/\/sapastelematics.co.[a-z][a-z]\/)$', ResellerUserRegisterView.as_view(),
        name='ResellerUserRegister'),
    path('ResellerUserRegister/<int:pk>/', ResellerUserRegisterView.as_view(), name='ResellerUserRegister'),

    path('Company/', CompanyRegisterView.as_view(), name='Company'),
    url(r'^displayCompany/(?P<pk>https?:\/\/sapastelematics.co.[a-z][a-z]\/)$',CompanyRegisterView.as_view(), name='displayCompany'),
    path('Company/<int:pk>/', CompanyRegisterView.as_view(), name='Company'),

    path('CompanyUserRegister/', CompanyUserRegisterView.as_view(), name='CompanyUser'),
    path('CompanyUser/<int:pk>/',CompanyUserRegisterView.as_view(), name='CompanyUser'),

    path('CompanyVehicleRegister/', CompanyVehicleRegisterView.as_view(), name='CompanyVehicleRegister'),
    path('CompanyVehicleRegister/<int:pk>/', CompanyVehicleRegisterView.as_view(), name='CompanyVehicleRegister'),

    path('DeviceRegister/', DeviceRegisterView.as_view(), name='DeviceRegister'),
    url(r'^displayDevice/(?P<pk>https?:\/\/sapastelematics.co.[a-z][a-z]\/)$',DeviceRegisterView.as_view(), name='displayDevice'),
    path('DeviceRegister/<int:pk>/', DeviceRegisterView.as_view(), name='DeviceRegister'),

    url('upload/', AuditView.as_view(), name='upload'),
    path('displayVehicle_number/<int:pk>/', VehicleView.as_view(), name='displayVehicle_number'),
    url(r'^displayVehicle_number/(?P<urldata>https?:\/\/sapastelematics.co.[a-z][a-z]\/)$',VehicleView.as_view(),name='displayVehicle_number'),

    path('vehicleAllocateDevice/<int:vehicle_id>/', AllocateView.as_view(), name='vehicleAllocateDevice'),
    path('allocateDevice/', AllocateView.as_view(), name='allocateDevice'),
    path('allocateDevice/<int:pk>/', AllocateView.as_view(), name='allocateDevice'),

    path('Deallocate/', DeallocateView.as_view(), name='Deallocate'),
    path('Deallocate/<int:pk>/', DeallocateView.as_view(), name='Deallocate'),

    url(r'^dispalyFuelCalibration/(?P<url>https?:\/\/sapastelematics.co.[a-z][a-z]\/)$',FuelCalibrationView.as_view(), name='displayFuelCalibration'),
    path('registerFuelCalibration/', FuelCalibrationView.as_view(), name='registerFuelCalibration'),


    path('registerFuelCalibrationData/', FuelCalibrationDataView.as_view(), name='registerFuelCalibrationData'),

    path('speedometer/<int:pk>/',SpeedoMeterView.as_view(),name='speedometer'),

    path('api/password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
    path('locationtracking/<int:pk>/',LocationTracking.as_view(),name='locationtracking'),
]

# from django.urls import path, include
# from rest_framework.routers import DefaultRouter
# from sapaslogin import views
#
# # Create a router and register our viewsets with it.
# router = DefaultRouter()
# router.register('api/auth', views.AuthViewSet,basename='api/auth')
#
# urlpatterns = [
#     path('', include(router.urls)),
#     path('api/password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
# ]
