from django.urls import path

from tour import views

urlpatterns = [
    path('tourcreation/',views.TourCreation_CRU_View.as_view()),
    path('tourcreation/<int:pk>/',views.TourCreation_CRU_View.as_view()),
    path('startpoint/', views.StartPoint_CR_View.as_view()),
    path('startpoint/<int:pk>/', views.StartPoint_RU_View.as_view()),
    path('endpoint/', views.EndPoint_CR_View.as_view()),
    path('endpoint/<int:pk>/', views.EndPoint_RU_View.as_view()),
    path('tourallocate/',views.TourAllocate_CRU_View.as_view()),
    path('tourallocate/<int:pk>/',views.TourAllocate_CRU_View.as_view()),

    ]