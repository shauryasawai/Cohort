from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),  # Home page (input form)
    path("generate/", views.generate_post, name="generate_post"),  # Generate AI-based post
    path("finalize/", views.finalize_post, name="finalize_post"),  # Finalize after editing
    path("final/", views.final_post, name="final_post"),  # Final preview before submission
]
