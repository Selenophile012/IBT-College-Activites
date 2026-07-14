try:
    customer_totals = {}

    with open("transactions.txt", "r") as file:
        for line in file:
            line = line.strip()

            if line == "":
                continue

            name, amount = line.split(",")
            amount = float(amount)

            if name in customer_totals:
                customer_totals[name] += amount
            else:
                customer_totals[name] = amount

    sorted_customers = sorted(
        customer_totals.items(),
        key=lambda item: item[1],
        reverse=True
    )

    print("Customer Spending Summary")
    print("-------------------------")

    for name, total in sorted_customers:
        print(f"{name}: {total:.2f}")

    with open("report.txt", "w") as report:
        report.write("Customer Spending Summary\n")
        report.write("-------------------------\n")

        for name, total in sorted_customers:
            report.write(f"{name}: {total:.2f}\n")

    print("\nReport saved to report.txt")

except FileNotFoundError:
    print("Error: transactions.txt was not found.")