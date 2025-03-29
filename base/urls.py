from django.urls import path
from . import views
from .views import generate_image





urlpatterns = [
    path('', views.home, name='home'),
    path("generate-image/", generate_image, name="generate_image"),
    path('generate-post/', views.generate_post, name='generate_post'),
    path('finalize-post/', views.finalize_post, name='finalize_post'),
    path('schedule-post/', views.schedule_post, name='schedule_post'),  
]