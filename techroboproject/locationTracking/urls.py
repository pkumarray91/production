from django.urls import path

from locationTracking import views

urlpatterns = [
    path('coordinates/', views.VehicleData_CR_View.as_view()),
    path('coordinates1/', views.Coordinates_CR_View.as_view()),
]