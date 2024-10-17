from flask import request, jsonify
from flask_restful import Resource
from config import app, db, api
from models import Customer, CustomerProfile, Car, Rental, Admin
#from werkzeug.security import generate_password_hash, check_password_hash

@app.route('/')
def index():
    return '<h1>Car Rental Management System </h1>'

# Customers Resource
class CustomersResource(Resource):
    def get(self):
        customers = Customer.query.all()
        return jsonify([customer.to_dict() for customer in customers])

    def post(self):
        data = request.get_json()
        try:
            new_profile = CustomerProfile(
                bio=data['profile']['bio'],
                social_links=data['profile']['social_links'],
                created_at=data['profile'].get('created_at', None)
            )
            db.session.add(new_profile)
            db.session.commit()

            new_customer = Customer(
                name=data['name'],
                email=data['email'],
                phone_number=data['phone_number'],
                address=data['address'],
                date_of_birth=data['date_of_birth'],
                profile_id=new_profile.id
            )
            db.session.add(new_customer)
            db.session.commit()

            return jsonify(new_customer.to_dict()), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 400

# Cars Resource
class CarsResource(Resource):
    def get(self):
        cars = Car.query.all()
        return jsonify([car.to_dict() for car in cars])

    def post(self):
        data = request.get_json()
        try:
            new_car = Car(
                model=data['model'],
                brand=data['brand'],
                year=data['year'],
                price_per_day=data['price_per_day'],
                availability_status=data['availability_status'],
                color=data['color']
            )
            db.session.add(new_car)
            db.session.commit()

            return jsonify(new_car.to_dict()), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 400

# Rentals Resource
class RentalsResource(Resource):
    def get(self):
        rentals = Rental.query.all()
        return jsonify([rental.to_dict() for rental in rentals])

    def post(self):
        data = request.get_json()
        try:
            new_rental = Rental(
                start_date=data['start_date'],
                end_date=data['end_date'],
                total_price=data['total_price'],
                status=data['status'],
                booking_date=data['booking_date'],
                customer_id=data['customer_id'],
                car_id=data['car_id']
            )
            db.session.add(new_rental)
            db.session.commit()

            return jsonify(new_rental.to_dict()), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 400

# Customer Detail Resource
class CustomerDetailResource(Resource):
    def get(self, id):
        customer = Customer.query.get_or_404(id)
        return jsonify(customer.to_dict())

    def patch(self, id):
        customer = Customer.query.get_or_404(id)
        data = request.get_json()
        try:
            if 'name' in data:
                customer.name = data['name']
            if 'email' in data:
                customer.email = data['email']
            if 'phone_number' in data:
                customer.phone_number = data['phone_number']
            if 'address' in data:
                customer.address = data['address']
            if 'date_of_birth' in data:
                customer.date_of_birth = data['date_of_birth']
            db.session.commit()
            return jsonify(customer.to_dict()), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 400

    def delete(self, id):
        customer = Customer.query.get_or_404(id)
        try:
            db.session.delete(customer)
            db.session.commit()
            return jsonify({"message": "Customer deleted"}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 400

# Admins Resource
class AdminsResource(Resource):
    def get(self):
        admins = Admin.query.all()
        return jsonify([admin.to_dict() for admin in admins])

    def post(self):
        data = request.get_json()
        try:
            new_admin = Admin(
                name=data['name'],
                email=data['email'],
            )
            new_admin.set_password(data['password'])
            db.session.add(new_admin)
            db.session.commit()

            return jsonify(new_admin.to_dict()), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 400

# Admin Detail Resource
class AdminDetailResource(Resource):
    def get(self, id):
        admin = Admin.query.get_or_404(id)
        return jsonify(admin.to_dict())

    def patch(self, id):
        admin = Admin.query.get_or_404(id)
        data = request.get_json()
        try:
            if 'name' in data:
                admin.name = data['name']
            if 'email' in data:
                admin.email = data['email']
            if 'password' in data:
                admin.set_password(data['password'])
            db.session.commit()
            return jsonify(admin.to_dict()), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 400

    def delete(self, id):
        admin = Admin.query.get_or_404(id)
        try:
            db.session.delete(admin)
            db.session.commit()
            return jsonify({"message": "Admin deleted"}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 400

# Add Resources to API
api.add_resource(CustomersResource, '/customers')
api.add_resource(CustomerDetailResource, '/customers/<int:id>')
api.add_resource(CarsResource, '/cars')
api.add_resource(RentalsResource, '/rentals')
api.add_resource(AdminsResource, '/admins')
api.add_resource(AdminDetailResource, '/admins/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

