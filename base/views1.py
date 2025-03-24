from django.shortcuts import redirect, render
from django.urls import reverse
from .services import get_pexels_image, generate_hashtags, generate_caption
from django.views.decorators.csrf import csrf_exempt
import json
from .models import ScheduledPost
from django.http import JsonResponse
from django.views.decorators.http import require_POST, require_GET
from django.http import JsonResponse

def home(request):
    """Renders the home page where users can input product details."""
    return render(request, "base/index.html")


@csrf_exempt
@require_POST
def generate_post_api(request):
    """API endpoint to generate AI-based post"""
    
    try:
        data = json.loads(request.body)
        product_name = data.get("product_name", "").strip()
        description = data.get("description", "").strip()
        target_audience = data.get("target_audience", "").strip()

        if not product_name or not description or not target_audience:
            return JsonResponse({"error": "All fields are required."}, status=400)

        caption = generate_caption(product_name, description, target_audience)
        hashtags = generate_hashtags(description, target_audience)
        image_query = f"{product_name} promotional post, {description}, best for {target_audience}"
        image_url = get_pexels_image(image_query)

        request.session["post_data"] = {
            "product_name": product_name,
            "caption": caption,
            "hashtags": hashtags,
            "image_url": image_url
        }

        return JsonResponse({
            "product_name": product_name,
            "caption": caption,
            "hashtags": hashtags,
            "image_url": image_url
        }, status=201)

    except Exception as e:
        return JsonResponse({"error": f"Error in post generation: {e}"}, status=500)


@csrf_exempt
@require_POST
def finalize_post_api(request):
    """API endpoint to finalize user-edited post"""

    post_data = request.session.get("post_data", {})

    if not post_data:
        return JsonResponse({"error": "No post data found."}, status=404)

    try:
        data = json.loads(request.body)
        edited_caption = data.get("edited_caption", "").strip()
        edited_hashtags = data.get("edited_hashtags", "").strip()

        request.session["final_data"] = {
            "product_name": post_data.get("product_name", ""),
            "caption": edited_caption or post_data.get("caption", ""),
            "hashtags": edited_hashtags or post_data.get("hashtags", ""),
            "image_url": post_data.get("image_url", "")
        }

        return JsonResponse({"message": "Post finalized successfully!"}, status=200)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


@csrf_exempt
@require_GET
def get_final_post_api(request):
    """API endpoint to retrieve finalized post"""

    final_data = request.session.get("final_data", {})

    if not final_data:
        return JsonResponse({"error": "No finalized post found."}, status=404)

    return JsonResponse(final_data, status=200)


@csrf_exempt
@require_POST
def schedule_post_api(request):
    """API endpoint to schedule a post"""

    try:
        data = json.loads(request.body)
        image_url = data.get('image_url')
        caption = data.get('caption')
        hashtags = data.get('hashtags')
        schedule_time = data.get('schedule_time')

        post = ScheduledPost(
            image_url=image_url,
            caption=caption,
            hashtags=hashtags,
            schedule_time=schedule_time
        )
        post.save()

        return JsonResponse({'success': True, 'message': 'Post scheduled successfully!'}, status=201)

    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)}, status=400)
