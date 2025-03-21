from django.shortcuts import redirect, render
from django.urls import reverse
from .services import get_pexels_image, generate_hashtags, generate_caption

from django.shortcuts import render, redirect
from django.urls import reverse

def home(request):
    """Renders the home page where users can input product details."""
    return render(request, "base/index.html")


def generate_post(request):
    """Handles form submission, generates AI-based post, and allows editing before finalizing."""

    if request.method == "POST":
        # Extract user inputs
        product_name = request.POST.get("product_name", "").strip()
        description = request.POST.get("description", "").strip()
        target_audience = request.POST.get("target_audience", "").strip()

        if not product_name or not description or not target_audience:
            return render(request, "base/index.html", {"error": "All fields are required."})

        try:
            # Generate AI-based content
            caption = generate_caption(product_name, description, target_audience)
            hashtags = generate_hashtags(description, target_audience)
            image_query = f"{product_name} promotional post, {description}, best for {target_audience}"
            image_url = get_pexels_image(image_query)

            # Store generated values in session for editing
            request.session["post_data"] = {
                "product_name": product_name,
                "caption": caption,
                "hashtags": hashtags,
                "image_url": image_url
            }

            # Render editable preview page
            return render(request, "base/edit_post.html", {
                "product_name": product_name,
                "caption": caption,
                "hashtags": hashtags,
                "image_url": image_url
            })

        except Exception as e:
            print(f"🚨 Error in post generation: {e}")
            return render(request, "base/index.html", {"error": "Something went wrong. Please try again!"})

    return render(request, "base/index.html")


def finalize_post(request):
    """Handles user edits and presents the final preview before submission."""
    
    if request.method == "POST":
        # Retrieve stored data
        post_data = request.session.get("post_data", {})

        if not post_data:
            return redirect("home")

        # Get user-edited content
        edited_caption = request.POST.get("edited_caption", "").strip()
        edited_hashtags = request.POST.get("edited_hashtags", "").strip()

        # Update session with final values
        request.session["final_data"] = {
            "product_name": post_data.get("product_name", ""),
            "caption": edited_caption or post_data.get("caption", ""),
            "hashtags": edited_hashtags or post_data.get("hashtags", ""),
            "image_url": post_data.get("image_url", "")
        }

        return redirect(reverse("final_post"))

    return redirect("home")


def final_post(request):
    """Displays the finalized post before publishing."""
    
    final_data = request.session.get("final_data", {})

    if not final_data:
        return redirect("home")

    return render(request, "base/final_post.html", final_data)

