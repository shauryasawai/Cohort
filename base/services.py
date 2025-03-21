from django.shortcuts import render
import requests

# 🎯 Pexels API Configuration
#
PEXELS_API_KEY = "VFL9S0rbYQB76BCzMex6cNBy8NL5EFOTvI93z8C8nxAiQGH4Q3tRgZO2"
PEXELS_SEARCH_URL = "https://api.pexels.com/v1/search"

import requests
import openai

# Set your OpenAI API key
OPENAI_API_KEY = "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"
openai.api_key = OPENAI_API_KEY


client = openai.OpenAI(api_key=OPENAI_API_KEY)

def generate_caption(product_name: str, description: str, audience: str) -> str:
    """
    Generates a catchy social media caption using OpenAI GPT-4 Turbo.
    """
    prompt = f"""
    Generate a catchy and engaging social media caption for a product.
    
    Product: {product_name}
    Description: {description}
    Target Audience: {audience}
    
    Keep the caption short, creative, and engaging.
    """
    
    try:
        response = client.chat.completions.create(
            model="gpt-4-turbo",
            messages=[{"role": "system", "content": "You are an expert in writing social media marketing content."},
                      {"role": "user", "content": prompt}]
        )
        
        return response.choices[0].message.content.strip()
    
    except Exception as e:
        print(f"🚨 Caption Generation API Request Failed: {e}")
    
    return "🚀 Discover something amazing today!"  # Fallback caption

def generate_hashtags(description: str, audience: str) -> str:
    """
    Generates relevant hashtags using OpenAI GPT-4 Turbo.
    """
    prompt = f"""
    Generate five relevant and trending hashtags for a product.
    
    Description: {description}
    Target Audience: {audience}
    
    Format: Return hashtags separated by spaces, e.g., "#Fitness #HealthyLife #Workout"
    """
    
    try:
        response = client.chat.completions.create(
            model="gpt-4-turbo",
            messages=[{"role": "system", "content": "You are an expert in social media marketing and hashtag optimization."},
                      {"role": "user", "content": prompt}]
        )
        
        return response.choices[0].message.content.strip()
    
    except Exception as e:
        print(f"🚨 Hashtag Generation API Request Failed: {e}")
    
    return "#Trending #MustHave #ShopNow #Innovation #Discover"  # Fallback hashtags


def get_pexels_image(prompt: str) -> str:
    """
    Fetches an image from the Pexels API based on a given prompt.

    Args:
        prompt (str): A query describing the image to search for.

    Returns:
        str: The URL of the fetched image, or a fallback placeholder.
    """
    headers = {"Authorization": PEXELS_API_KEY}
    params = {"query": prompt, "per_page": 1}

    try:
        response = requests.get(PEXELS_SEARCH_URL, headers=headers, params=params, timeout=10)

        if response.status_code == 200:
            photos = response.json().get("photos", [])
            if photos:
                return photos[0]["src"]["large"]  # Return high-quality image URL

        print(f"⚠️ No images found for '{prompt}', trying fallback...")
        return get_pexels_image("marketing poster")  # Fallback to a general marketing image

    except requests.RequestException as e:
        print(f"🚨 Pexels API Request Failed: {e}")

    return "https://via.placeholder.com/500"  # Fallback placeholder image
