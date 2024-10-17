from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from werkzeug.security import generate_password_hash, check_password_hash
from config import db
from datetime import datetime


class CustomerProfile(db.Model, SerializerMixin):
    __tablename__ = 'customer_profiles'

    id = db.Column(db.Integer, primary_key=True)
    bio = db.Column(db.String(500), nullable=False)
    social_links = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)

    customers = db.relationship('Customer', backref='profile')


class Customer(db.Model, SerializerMixin):
    __tablename__ = 'customers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    phone_number = db.Column(db.String(15), nullable=False)
    address = db.Column(db.String(200), nullable=False)
    date_of_birth = db.Column(db.Date, nullable=False)
    profile_id = db.Column(db.Integer, db.ForeignKey('customer_profiles.id'))

    cars = association_proxy('customer_cars', 'car')

    rentals = db.relationship('Rental', backref='customer')

    serialize_rules = ('-rentals.customer', '-profile.customers')


class CustomerCar(db.Model):
    __tablename__ = 'customer_car'

    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'), primary_key=True)
    car_id = db.Column(db.Integer, db.ForeignKey('cars.id'), primary_key=True)

    customer = db.relationship('Customer', backref='customer_cars')
    car = db.relationship('Car', backref='customer_cars')


class Car(db.Model, SerializerMixin):
    __tablename__ = 'cars'

    id = db.Column(db.Integer, primary_key=True)
    model = db.Column(db.String(100), nullable=False)
    brand = db.Column(db.String(100), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    price_per_day = db.Column(db.Float, nullable=False)
    availability_status = db.Column(db.Boolean, nullable=False)
    color = db.Column(db.String(50), nullable=False)
    image_url = db.Column(db.String(200), nullable=True)

    rentals = db.relationship('Rental', backref='car')

    serialize_rules = ('-rentals.car',)



class Rental(db.Model, SerializerMixin):
    __tablename__ = 'rentals'

    id = db.Column(db.Integer, primary_key=True)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)
    total_price = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(50), nullable=False)
    booking_date = db.Column(db.DateTime, nullable=False)

    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'))
    car_id = db.Column(db.Integer, db.ForeignKey('cars.id'))

    serialize_rules = ('-customer.rentals', '-car.rentals')


class Admin(db.Model, SerializerMixin):
    __tablename__ = 'admins'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    serialize_rules = ('-password_hash',)
