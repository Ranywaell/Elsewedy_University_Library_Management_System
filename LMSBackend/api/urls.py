from django.urls import path
from . import views

urlpatterns = [
    path('books/', views.BookListCreateAPIView.as_view()),
    path('books/<int:pk>/', views.BookRetrieveUpdateAPIView.as_view() ),
    path('authors/', views.AuthorListCreateAPIView.as_view()),
    path('publishers/', views.PublisherListCreateAPIView.as_view()),
    path('categories/', views.CategoryListCreateAPIView.as_view()),
    path('loans/', views.LoanListCreateAPIView.as_view()),
    path('register/', views.MemberListCreateView.as_view()),
    path('members/', views.AdminListCreateView.as_view()),
    path('profile/', views.GetProfileView.as_view()),
    path('profile/update/', views.UpdateProfileView.as_view()),
    path('books/search', views.BookSearchAPIView.as_view()),
    path('recommendations/', views.RecommendationView.as_view()),
    path('reservations/', views.ReservationListCreateView.as_view()),
    path('reservations/<int:pk>/', views.ReservationRetrieveUpdateDestroyView.as_view()),
    path('analytics/category-usage/', views.UsageByCategoryAPIView.as_view()),
    path('analytics/book-popularity/', views.BookPopularityAPIView.as_view()),
    path('history/', views.UserHistoryView.as_view()),

]

