"""techroboproject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.conf import settings
from django.conf.urls.static import static

schema_view = get_schema_view(
   openapi.Info(
      title="authentication API",
      default_version='v1',
      description="Test description",
      terms_of_service="https://www.ourapp.com/policies/terms/",
      contact=openapi.Contact(email="contact@authentication.local"),
      license=openapi.License(name="test auth"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', schema_view.with_ui('swagger', cache_timeout=0), name='allapidoc'),
    path('events/',include('events.urls')),
    path('sapasuser/',include('sapaslogin.urls')),
    ##path('locationTracking/',include('locationTracking.urls')),
    path('api-auth/', include('rest_framework.urls')),
    #path('fuel/',include('fuelapp.urls')),
    path('geoFence/', include('geoFence.urls')),
    path('tour/', include('tour.urls')),

] +static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
