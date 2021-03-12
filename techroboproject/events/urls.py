from django.urls import path

from events import views

urlpatterns = [
    #path('',views.EventView.as_view,name='event')
    path('main/', views.Main_CR_View.as_view()),
    path('main/<int:pk>/', views.Main_RU_View.as_view()),
    path('weekday/',views.WeekDay_CR_View.as_view()),
    path('weekday/<int:pk>/',views.WeekDay_RU_View.as_view()),
    path('time/', views.Time_CR_View.as_view()),
    path('time/<int:pk>/', views.Time_RU_View.as_view()),
    path('notification/', views.Notifications_CR_View.as_view()),
    path('notification/<int:pk>/', views.Notifications_RU_View.as_view()),
    path('template/', views.Template_CR_View.as_view()),
    path('template/<int:pk>/', views.Template_RU_View.as_view()),
    path('account/', views.Account_CR_View.as_view()),
    path('account/<int:pk>/', views.Account_CR_View.as_view()),
    path('subaccount/', views.Subaccount_CR_View.as_view()),
    path('subaccount/<int:pk>/', views.Subaccount_RU_View.as_view()),

]