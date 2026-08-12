class Account:
    def __init__(self, number, name, balance, transactions=None):
        self.number = number
        self.name = name
        self.balance = balance
        self.transactions = transactions or []


def binary_search(items, target):
    lo = 0
    hi = len(items) - 1

    while lo <= hi:
        mid = (lo + hi) // 2

        if items[mid] == target:
            return mid
        elif items[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1

    return -1


class AccountRegistry:
    def __init__(self):
        self.by_number = {}

    def add_account(self, account):
        self.by_number[account.number] = account

    def top_by_balance(self, n=5):
        accounts = sorted(
            self.by_number.values(),
            key=lambda account: account.balance,
            reverse=True
        )

        return accounts[:n]

    def find_by_number(self, number):
        numbers = sorted(self.by_number)

        index = binary_search(numbers, number)

        if index >= 0:
            return self.by_number[numbers[index]]

        return None

    def total_transactions(self, number):
        account = self.find_by_number(number)

        if account is None:
            return 0

        def recursive_total(transactions, index=0):
            if index == len(transactions):
                return 0

            return transactions[index] + recursive_total(
                transactions,
                index + 1
            )

        return recursive_total(account.transactions)


registry = AccountRegistry()

registry.add_account(
    Account("1001", "Alice", 4500, [500, -200, 1000])
)

registry.add_account(
    Account("1002", "Bob", 7200, [1000, 1500, -300])
)

registry.add_account(
    Account("1003", "Charlie", 3200, [500, 700, -100])
)

registry.add_account(
    Account("1004", "David", 9100, [2000, -500, 3000])
)

registry.add_account(
    Account("1005", "Eve", 6100, [800, 1200, -200])
)


print("Top accounts by balance:")

for account in registry.top_by_balance(3):
    print(account.number, account.name, account.balance)


print("\nSearch account:")

account = registry.find_by_number("1003")

if account:
    print(account.number, account.name, account.balance)
else:
    print("Account not found")


print("\nTransaction total:")

print(
    "1001:",
    registry.total_transactions("1001")
)

print(
    "1004:",
    registry.total_transactions("1004")
)

print(
    "9999:",
    registry.total_transactions("9999")
)