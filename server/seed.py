from datetime import datetime
from app import app
from models import db, Customer, CustomerProfile, Car, Rental

if __name__ == '__main__':
    with app.app_context():
        print("Starting seed...")


        db.drop_all()
        db.create_all()


        customer_profiles = [
            CustomerProfile(
                bio="Avid car enthusiast and traveler.",
                social_links="https://twitter.com/example",
                created_at=datetime.strptime('2024-01-15', '%Y-%m-%d')
            ),
            CustomerProfile(
                bio="Tech-savvy individual who loves road trips.",
                social_links="https://linkedin.com/in/example",
                created_at=datetime.strptime('2024-02-10', '%Y-%m-%d')
            )
        ]
        db.session.add_all(customer_profiles)
        db.session.commit()


        customers = [
            Customer(
                name="John Doe",
                email="john.doe@example.com",
                phone_number="555-1234",
                address="123 Main St, Anytown, USA",
                date_of_birth=datetime.strptime('1985-06-15', '%Y-%m-%d').date(),
                profile_id=customer_profiles[0].id
            ),
            Customer(
                name="Jane Smith",
                email="jane.smith@example.com",
                phone_number="555-5678",
                address="456 Oak St, Othertown, USA",
                date_of_birth=datetime.strptime('1990-09-23', '%Y-%m-%d').date(),
                profile_id=customer_profiles[1].id
            )
        ]
        db.session.add_all(customers)
        db.session.commit()

        cars = [
            Car(
                model="Corolla",
                brand="Toyota",
                year=2020,
                price_per_day=50.00,
                availability_status=True,
                color="Blue",
                image_url="https://pictures-kenya.jijistatic.com/70414400_MzAwLTE4OC0zMDVlMjUwNTgz.webp"
            ),
            Car(
                model="Civic",
                brand="Honda",
                year=2019,
                price_per_day=45.00,
                availability_status=False,
                color="Red",
                image_url="https://pictures-kenya.jijistatic.com/70150977_MzAwLTE2OS01MTJmNWU5Nzlm.webp"
            )
        ]

        db.session.add_all(cars)
        db.session.commit()

        rentals = [
                    Rental(
                        start_date=datetime.strptime('2024-08-01', '%Y-%m-%d'),
                        end_date=datetime.strptime('2024-08-05', '%Y-%m-%d'),
                        total_price=200.00,
                        status="completed",
                        booking_date=datetime.strptime('2024-07-25', '%Y-%m-%d'),
                        customer_id=customers[0].id,
                        car_id=cars[0].id
                    ),
                    Rental(
                        start_date=datetime.strptime('2024-09-10', '%Y-%m-%d'),
                        end_date=datetime.strptime('2024-09-15', '%Y-%m-%d'),
                        total_price=225.00,
                        status="booked",
                        booking_date=datetime.strptime('2024-09-01', '%Y-%m-%d'),
                        customer_id=customers[1].id,
                        car_id=cars[1].id
                    )
                ]
        db.session.add_all(rentals)
        db.session.commit()

        print("Seeding with custom data completed!")

