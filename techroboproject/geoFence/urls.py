from django.urls import path
from geoFence import views

urlpatterns = [

    path('list/', views.GeoLocationView.as_view()),
    path('list/<int:pk>/', views.GeoLocationView.as_view()),
    # path('circle/', views.CircleListView.as_view()),
    # path('circle/<int:pk>/', views.CircleView.as_view()),
    # path('rectangle/', views.RectangleListView.as_view()),
    # path('rectangle/<int:pk>/', views.RectangleView.as_view()),
]
