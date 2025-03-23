from django.core.management.base import BaseCommand
from .models import ScheduledPost
from django.utils import timezone

class Command(BaseCommand):
    help = 'Checks and posts scheduled posts'

    def handle(self, *args, **kwargs):
        now = timezone.now()
        posts = ScheduledPost.objects.filter(schedule_time__lte=now, is_posted=False)

        for post in posts:
            # Logic to post to social media
            self.stdout.write(f"Posting: {post.caption}")
            # Example: Call social media APIs here

            # Mark the post as posted
            post.is_posted = True
            post.save()

        self.stdout.write("Finished checking scheduled posts.")