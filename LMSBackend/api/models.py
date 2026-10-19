from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class Member(AbstractUser):
    email = models.EmailField(unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ('username',)



class Publisher(models.Model):
    name = models.CharField(max_length=255)
    address = models.TextField(blank=True, null=True)
    website = models.URLField(blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=15, null=True, blank=True)

    def  __str__(self):
        return self.name

class Category(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

class Author(models.Model):
    name = models.CharField(max_length=255)
    biography = models.TextField(blank=True, null=True)
    birth_date = models.DateField(blank=True, null=True)

    def __str__(self):
        return  self.name
    
class Book(models.Model):
    STATUS = [
        ('available', "Available"),
        ('reserved', "Reserved"),
    ]

    isbn = models.CharField(max_length=13)
    title = models.CharField(max_length=255)
    authors = models.ManyToManyField(Author, through='BookAuthor')
    publisher = models.ForeignKey(Publisher, on_delete=models.SET_NULL, null=True, blank=True)
    publication_date = models.DateField(null=False, blank=False)
    edition = models.CharField(max_length=50)
    language = models.CharField(max_length=255)
    page_count = models.PositiveIntegerField()
    categories = models.ManyToManyField(Category, through='CategoryBooks')
    description = models.TextField()
    cover_image = models.ImageField(upload_to='book_covers/', blank=True, null=True)
    status = models.CharField(max_length=255, choices=STATUS, default='available')
    date_added = models.DateField(auto_now_add=True)
    stock = models.PositiveIntegerField(default=4)

    def save(self, *args, **kwargs):
        self.status = 'available' if self.stock > 0 else 'unavailable'
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

class BookAuthor(models.Model):
    ROLES = [
        ('primary', 'Primary Author'),
        ('co_author', 'Co-Author'),
        ('editor', 'Editor'),
        ('translator', 'Translator'),
    ]

    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    role = models.CharField(max_length=50, choices=ROLES, default='primary')
    
    
    def __str__(self):
        return f"{self.author.name} - {self.role} of {self.book.title}"
    

class CategoryBooks(models.Model):
    book =models.ForeignKey(Book, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)



class Loan(models.Model):
    LOAN_STATUS = [
        ('active', 'Active'),
        ('returned', 'Returned'),
        ('overdue', 'Overdue'),   
    ]
    book = models.ForeignKey(Book, on_delete=models.PROTECT)
    member = models.ForeignKey(Member, on_delete=models.PROTECT)
    checkout_date = models.DateTimeField(auto_now_add=True)
    due_date = models.DateTimeField()
    return_date = models.DateTimeField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=LOAN_STATUS, default='active')
    staff_checkout = models.ForeignKey(Member, on_delete=models.SET_NULL, null=True, related_name='checkout_staff')
    staff_return = models.ForeignKey(Member, on_delete=models.SET_NULL, null=True, blank=True, related_name='return_staff')
    
    def __str__(self):
        
        return f"{self.book.title} - {self.member.first_name + " " + self.member.last_name} ({self.checkout_date.strftime('%Y-%m-%d')})"

class Reservation(models.Model):
    RESERVATION_STATUS = [
        ('pending', 'Pending'),
        ('fulfilled', 'Fulfilled'),
        ('canceled', 'Canceled'),
    ]
    
    book = models.ForeignKey(Book, on_delete=models.PROTECT)
    member = models.ForeignKey(Member, on_delete=models.PROTECT)
    reservation_date = models.DateTimeField(auto_now_add=True)
    expiration_date = models.DateTimeField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=RESERVATION_STATUS, default='pending')
    
    def __str__(self):
        return f"{self.book.title} reserved by {self.member.first_name + " " + self.member.last_name}"


class Fine(models.Model):
    PAYMENT_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('paid', 'Paid'),
        ('waived', 'Waived'),
    ]
    
    member = models.ForeignKey(Member, on_delete=models.PROTECT)
    loan = models.ForeignKey(Loan, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=8, decimal_places=2)
    reason = models.CharField(max_length=200)
    date_issued = models.DateTimeField(auto_now_add=True)
    payment_status = models.CharField(max_length=20, choices=PAYMENT_STATUS_CHOICES, default='pending')
    payment_date = models.DateTimeField(blank=True, null=True)
    
    def __str__(self):
        return f"Fine of EGP{self.amount} for {self.member.first_name + " " + self.member.last_name}"

class Profile(models.Model):
    user = models.OneToOneField(Member, on_delete=models.CASCADE)
    phone = models.CharField(max_length=11, blank=True)
    address = models.TextField(blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    profile_image = models.ImageField(upload_to='profile_image/', blank=True, null=True)
    def __str__(self):
        return self.user.get_full_name

class History(models.Model):
    user = models.ForeignKey(Member, on_delete=models.CASCADE)
    book = models.ForeignKey('Book', on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} viewed {self.book.title}"


