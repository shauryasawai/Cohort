from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    target_audience = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

class SocialPost(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    caption = models.TextField()
    hashtags = models.TextField()
    generated_image = models.URLField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
