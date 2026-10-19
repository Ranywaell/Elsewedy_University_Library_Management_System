from django.core.management.base import BaseCommand
from faker import Faker
from api.models import Author
fake = Faker()

class Command(BaseCommand):
    help = 'creates author dummy data'

    def handle(self, *args, **options):
        
        for _ in range(20):
            name = fake.name()
            biography = fake.paragraph()
            birth_date = fake.date_of_birth(minimum_age=20, maximum_age=80)
            
            Author.objects.create(
                name = name,
                biography = biography,
                birth_date = birth_date
            )

            print(f"author {name} created.")
