from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('generate-post/', views.generate_post, name='generate_post'),  # Changed from API to regular view
    path('finalize-post/', views.finalize_post, name='finalize_post'),  # Changed from API to regular view
    path('schedule-post/', views.schedule_post, name='schedule_post'),  # Changed from API to regular view
]