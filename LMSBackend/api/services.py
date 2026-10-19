from collections import Counter
from .models import History, Reservation, Book

def get_user_recommendations(user, top_n=5):
    viewed_books = History.objects.filter(user=user)
    reserved_books = Reservation.objects.filter(member=user)

    all_books = [entry.book for entry in viewed_books] + [entry.book for entry in reserved_books]

    if not all_books:
        return Book.objects.order_by('?')[:top_n]  

    genre_counter = Counter()
    for book in all_books:
        if book.genre:
            genre_counter[book.genre] += 1

    top_genres = [genre for genre, _ in genre_counter.most_common(2)]

    
    book_ids_seen = [book.id for book in all_books]
    recommended_books = Book.objects.filter(genre__in=top_genres).exclude(id__in=book_ids_seen).distinct()[:top_n]

    return recommended_books
