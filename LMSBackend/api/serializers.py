from rest_framework import serializers
from api.models import Book, Author, Category, BookAuthor, CategoryBooks,Loan, Publisher, Profile , Reservation, Fine, Member, History


class NestedBookAuthorSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField(source='author.id')
    name = serializers.ReadOnlyField(source='author.name')
    role = serializers.CharField()

    class Meta:
        model = BookAuthor
        fields = ['id', 'name', 'role']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description']


class BookDetailSerializer(serializers.ModelSerializer):
    authors = serializers.SerializerMethodField()
    categories = serializers.SerializerMethodField()
   

    class Meta:
        model = Book
        fields = [
            'id', 'isbn', 'title', 'publisher', 'publication_date',
            'edition', 'language', 'page_count',
            'description', 'cover_image', 'status', 'date_added',
            'authors', 'categories','stock'
        ]

    def get_authors(self, obj):
        book_authors = BookAuthor.objects.filter(book=obj)
        return NestedBookAuthorSerializer(book_authors, many=True).data

    def get_categories(self, obj):
        category_books = CategoryBooks.objects.filter(book=obj)
        return CategorySerializer([cb.category for cb in category_books], many=True).data
    

class BookCreateSerializer(serializers.ModelSerializer):
    author_ids = serializers.PrimaryKeyRelatedField(queryset=Author.objects.all(), many=True, write_only=True)
    category_ids = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), many=True, write_only=True)

    class Meta:
        model = Book
        fields = [
            'id', 'isbn', 'title', 'publisher', 'publication_date',
            'edition', 'language', 'page_count', 'description',
            'cover_image', 'status', 'author_ids', 'category_ids','stock'
        ]
        read_only_fields = ['id', 'date_added']

    def create(self, validated_data):
        author_ids = validated_data.pop('author_ids')
        category_ids = validated_data.pop('category_ids')

        book = Book.objects.create(**validated_data)

        for author in author_ids:
            BookAuthor.objects.create(book=book, author=author)

        for category in category_ids:
            CategoryBooks.objects.create(book=book, category=category)

        return book

class BookUpdateSerializer(BookCreateSerializer):

    def update(self, instance, validated_data):
        author_ids = validated_data.pop('author_ids', None)
        category_ids = validated_data.pop('category_ids', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if author_ids is not None:
            BookAuthor.objects.filter(book=instance).delete()
            for author in author_ids:
                BookAuthor.objects.create(book=instance, author=author)

        if category_ids is not None:
            CategoryBooks.objects.filter(book=instance).delete()
            for category in category_ids:
                CategoryBooks.objects.create(book=instance, category=category)

        return instance

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = (
            'id',
            'name',
            'biography',
            'birth_date'
        )

        read_only_fields = ['id']

class PublisherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publisher
        fields = (
            'id',
            'name',
            'address', 
            'website', 
            'email', 
            'phone',
        )

        read_only_fields = ['id']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = (
            'id',
            'name',
            'description'
        )

        read_only_fields = ['id']


class LoanSerializer(serializers.ModelSerializer):
        class Meta:
            model = Loan
            fields = (
                'id',
                'book',
                'member',
                'due_date',
                'return_date',
                'status',
                'staff_checkout',
                'staff_return'
            )
        def create(self, validated_data):
            book = validated_data['book']

            if book.stock > 0:
                book.stock -= 1
                book.save()
            else:
                raise serializers.ValidationError("Book is out of stock and cannot be loaned")
            return super().create(validated_data)
        
class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = '__all__'
        read_only_fields = ['member','reservation_date']


class FineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fine
        fields = '__all__'
        read_only_fields = ['date_issued']



class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['phone', 'address', 'date_of_birth']

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = Member
        fields = (
            'first_name',
            'last_name',
            'email',
            'password',
            'profile',
            'is_staff',
            'is_active',

        )
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        email = validated_data.get('email')
        validated_data['username'] = email
        user = Member.objects.create_user(**validated_data)
        Profile.objects.create(user=user, **profile_data)
        return user
    def update(self, instance, validated_data):
        # Pop nested data for profile
        profile_data = validated_data.pop('profile', None)

        # Update User fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Update Profile fields if provided
        if profile_data:
            profile = instance.profile
            for attr, value in profile_data.items():
                setattr(profile, attr, value)
            profile.save()

        return instance

class AdminSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()
    class Meta:
        model = Member
        fields = (
            'first_name',
            'last_name',
            'email',
            'password',
            'profile',
            'is_staff',
            'is_superuser',
            'is_active',
            
        )
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        email = validated_data.get('email')
        validated_data['username'] = email
        user = Member.objects.create_user(**validated_data)
        Profile.objects.create(user=user, **profile_data)
        return user



class BookPopularitySerializer(serializers.Serializer):
    book = BookDetailSerializer(read_only=True)
    loan_count = serializers.IntegerField(read_only=True)
    def to_representation(self, instance):
        # instance is a Book instance with a loan_count attribute
        return {
            'book': BookDetailSerializer(instance).data,
            'loan_count': instance.loan_count,
        }



class CategoryUsageSerializer(serializers.Serializer):
    category = serializers.CharField()
    loan_count = serializers.IntegerField()
    reservation_count = serializers.IntegerField()


class HistorySerialzer(serializers.ModelSerializer):
    class Meta:
        model = History
        fields = '__all__'
