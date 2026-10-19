from rest_framework import generics, filters
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from .serializers import (BookCreateSerializer, BookDetailSerializer, BookUpdateSerializer, 
AuthorSerializer, PublisherSerializer, CategorySerializer, LoanSerializer, UserSerializer, 
AdminSerializer,  ReservationSerializer, BookPopularitySerializer, CategoryUsageSerializer, HistorySerialzer)
from .models import Book, Author, Publisher, Category, Loan, Member, Profile, Reservation, CategoryBooks, History
from .services import get_user_recommendations
from django.db.models import Count
# Create your views here.

class BookListCreateAPIView(generics.ListCreateAPIView):
    queryset = Book.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return BookCreateSerializer
        return BookDetailSerializer
    def get_permissions(self):
        self.permission_classes = [AllowAny]
        if self.request.method == 'POST':
            self.permission_classes = [IsAdminUser]
        return super().get_permissions()
    
class BookRetrieveUpdateAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return BookDetailSerializer
        return BookUpdateSerializer
    
 # note for the ListCreateAPIs: anything regarding GET will be AllowAny _for Now_ after some time every allowany will be changed to IsAuthenticated
        # and anything remotely POST will be IsAdminUser, however it's completely fine to change the permission class to AllowAny when needing to test the Frontend Implementation

class AuthorListCreateAPIView(generics.ListCreateAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
    def get_permissions(self):
        self.permission_classes = [AllowAny]
        if self.request.method == 'POST':
            self.permission_classes = [IsAdminUser]
        return super().get_permissions()

class PublisherListCreateAPIView(generics.ListCreateAPIView):
    queryset = Publisher.objects.all()
    serializer_class = PublisherSerializer
    def get_permissions(self):
       
        self.permission_classes = [AllowAny]
        if self.request.method == 'POST':
            self.permission_classes = [IsAdminUser]
        return super().get_permissions()
class CategoryListCreateAPIView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    def get_permissions(self):
        self.permission_classes = [AllowAny]
        if self.request.method == 'POST':
            self.permission_classes = [IsAdminUser]
        return super().get_permissions()


class LoanListCreateAPIView(generics.ListCreateAPIView):
        queryset = Loan.objects.all()
        serializer_class = LoanSerializer
        
class MemberListCreateView(generics.ListCreateAPIView):
        queryset = Member.objects.all()
        serializer_class = UserSerializer

class AdminListCreateView(generics.ListCreateAPIView):
    queryset = Member.objects.all()
    serializer_class = AdminSerializer
    permission_classes = [IsAdminUser]
class GetProfileView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
class ProfileList(generics.RetrieveUpdateDestroyAPIView):
    queryset = Member.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]
class RecommendationView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        recommended_books = get_user_recommendations(user)
        serializer = BookDetailSerializer(recommended_books, many=True)
        return Response(serializer.data)

class UpdateProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


class BookSearchAPIView(generics.ListAPIView):
    queryset = Book.objects.all()
    serializer_class = BookDetailSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'authors__name', 'categories__name']

class ReservationListCreateView(generics.ListCreateAPIView):
    serializer_class = ReservationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Reservation.objects.filter(member=self.request.user)

    def perform_create(self, serializer):
        serializer.save(member=self.request.user)

class ReservationRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
        serializer_class = ReservationSerializer
        permission_classes = [IsAuthenticated]
        def get_queryset(self):
            return Reservation.objects.filter(member=self.request.user)

class BookPopularityAPIView(generics.ListAPIView):
    serializer_class = BookPopularitySerializer
    permission_classes = [IsAdminUser]
    queryset = Book.objects.annotate(loan_count=Count('loan')).order_by('-loan_count')

class UsageByCategoryAPIView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CategoryUsageSerializer

    def get_queryset(self):
        return []  
    
    def list(self, request, *args, **kwargs):
        data = []
        for category in Category.objects.all():
            book_ids = CategoryBooks.objects.filter(category=category).values_list('book_id', flat=True)
            loan_count = Loan.objects.filter(book_id__in=book_ids).count()
            reservation_count = Reservation.objects.filter(book_id__in=book_ids).count()
            data.append({
                'category': category.name,
                'loan_count': loan_count,
                'reservation_count': reservation_count,
            })

        serializer = self.get_serializer(data=data, many=True)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data)

class UserHistoryView(generics.ListAPIView):
    serializer_class = [IsAuthenticated]
    serializer_class = HistorySerialzer

    def get_queryset(self):
        return History.objects.filter(user_id=self.request.user.pk)
    
