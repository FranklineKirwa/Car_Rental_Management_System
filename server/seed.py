from datetime import datetime
from app import app
from models import User, db, Customer, CustomerProfile, Car, Rental

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
                price_per_day=5000.00,
                availability_status=True,
                color="Blue",
                image_url="https://pictures-kenya.jijistatic.com/70414400_MzAwLTE4OC0zMDVlMjUwNTgz.webp",
                full_image_url="https://www.motortrend.com/uploads/sites/5/2019/11/2020-Toyota-Corolla-Hybrid-LE-front-three-quarter-in-motion.jpg"

            ),
            Car(
                model="Civic",
                brand="Honda",
                year=2019,
                price_per_day=4500.00,
                availability_status=False,
                color="Black",
                image_url="https://pictures-kenya.jijistatic.com/70150977_MzAwLTE2OS01MTJmNWU5Nzlm.webp",
                full_image_url="https://images.dealersync.com/cloud/userdocumentprod/3/Photos/1006353/20230624042600230_IMG_3803.jpg?_=60acde452ff70e9bb726f49c7affe4fd366366d9"

            )
        ]

        db.session.add_all(cars)
        db.session.commit()

        rentals = [

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

        users = [
            User(username='Oloo', email='oloo@oloo.com',role='admin'),
            User(username='Otieno', email='otieno@otieno.com',role='customer'),
            User(username='Owino', email='owino@owino.com',role='customer')

        ]

        for user in users:
            user.set_password('123456')


        db.session.add_all(users)
        db.session.commit()

        print("Seeding with custom data completed!")

