from django.shortcuts import redirect, render
from django.urls import reverse
from .services import get_pexels_image, generate_hashtags, generate_caption
from .models import ScheduledPost
from django.contrib import messages
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

def home(request):
    """Renders the home page where users can input product details."""
    return render(request, "base/index.html")

def generate_image(request):
    """
    Fetches an image based on a user-provided prompt.
    """
    prompt = request.GET.get("prompt", "luxury hotel")
    image_url = get_pexels_image(prompt)
    return JsonResponse({"image_url": image_url})

def generate_post(request):
    """Handles post generation with template rendering"""
    if request.method == 'POST':
        try:
            product_name = request.POST.get("product_name", "").strip()
            description = request.POST.get("description", "").strip()
            target_audience = request.POST.get("target_audience", "").strip()

            if not product_name or not description or not target_audience:
                messages.error(request, "All fields are required.")
                return redirect('home')

            caption = generate_caption(product_name, description, target_audience)
            hashtags = generate_hashtags(description, target_audience)
            image_query = f"promotional post, {description}"
            image_url = get_pexels_image(image_query)

            context = {
                "product_name": product_name,
                "caption": caption,
                "hashtags": hashtags,
                "image_url": image_url
            }
            
            return render(request, "base/post_preview.html", context)

        except Exception as e:
            messages.error(request, f"Error in post generation: {e}")
            return redirect('home')
    
    return redirect('home')

def finalize_post(request):
    """Handles post finalization with template rendering"""
    if request.method == 'POST':
        try:
            product_name = request.POST.get("product_name", "").strip()
            edited_caption = request.POST.get("edited_caption", "").strip()
            edited_hashtags = request.POST.get("edited_hashtags", "").strip()
            image_url = request.POST.get("image_url", "").strip()

            context = {
                "product_name": product_name,
                "caption": edited_caption,
                "hashtags": edited_hashtags,
                "image_url": image_url
            }
            
            return render(request, "base/post_final.html", context)

        except Exception as e:
            messages.error(request, str(e))
            return redirect('home')
    
    return redirect('home')

def schedule_post(request):
    """Handles post scheduling with template rendering"""
    if request.method == 'POST':
        try:
            image_url = request.POST.get('image_url')
            caption = request.POST.get('caption')
            hashtags = request.POST.get('hashtags')
            schedule_time = request.POST.get('schedule_time')

            post = ScheduledPost(
                image_url=image_url,
                caption=caption,
                hashtags=hashtags,
                schedule_time=schedule_time
            )
            post.save()

            messages.success(request, 'Post scheduled successfully!')
            return redirect('home')

        except Exception as e:
            messages.error(request, f'Error scheduling post: {str(e)}')
            return redirect('home')
    
    return redirect('home')