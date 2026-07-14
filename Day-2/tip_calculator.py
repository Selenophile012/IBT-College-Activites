bill_total = 1600.00 #ETB
friends = ["Kaleab", "Danie;", "Daniel"]
num_people = len(friends)

def split_bill(bill_total, friends, num_people, tip_rate=0.10):
    tip_amount = bill_total * tip_rate
    all_total = bill_total + tip_amount
    per_person_amount = all_total / num_people
    
    print("--Bill split--")
    for name in friends:
        print(f"{name} owes: {per_person_amount:.2f} ETB")


split_bill(bill_total, friends, num_people)