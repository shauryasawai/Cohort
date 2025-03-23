from django.urls import path
from .views import generate_post_api, finalize_post_api, get_final_post_api, schedule_post_api
from base import views

urlpatterns = [
    path("", views.home, name="home"),
    path('api/generate-post/', generate_post_api, name='generate-post'),
    path('api/finalize-post/', finalize_post_api, name='finalize-post'),
    path('api/final-post/', get_final_post_api, name='final-post'),
    path('api/schedule-post/', schedule_post_api, name='schedule-post'),
]





