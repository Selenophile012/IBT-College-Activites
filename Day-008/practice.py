# Exercise 1 - Recursive Sum

def total(nums):
    if not nums:
        return 0
    return nums[0] + total(nums[1:])


def count_down(n):
    if n <= 0:
        return
    print(n)
    count_down(n - 1)


numbers = [100, 250, 400]
print("Recursive total:", total(numbers))

print("Count down:")
count_down(5)


# Exercise 2 - Binary Search

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


balances = [500, 1000, 1500, 2000, 2500, 3000]
print("Binary search index:", binary_search(balances, 2000))


# Exercise 3 - Merge Sort

def merge(left, right):
    result = []
    i = 0
    j = 0

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    result.extend(left[i:])
    result.extend(right[j:])

    return result


def merge_sort(items):
    if len(items) <= 1:
        return items

    mid = len(items) // 2

    left = merge_sort(items[:mid])
    right = merge_sort(items[mid:])

    return merge(left, right)


numbers = [38, 27, 43, 3, 9, 82, 10]

print("Merge sort:", merge_sort(numbers))
print("Python sorted:", sorted(numbers))

accounts = [
    ("Alice", 1500),
    ("Bob", 3200),
    ("Charlie", 800),
    ("David", 2500)
]

sorted_accounts = sorted(
    accounts,
    key=lambda account: account[1],
    reverse=True
)

print("Accounts by balance:")
for account in sorted_accounts:
    print(account)


# Exercise 5 - Two Pointers

def has_pair(nums, target):
    lo = 0
    hi = len(nums) - 1

    while lo < hi:
        current_sum = nums[lo] + nums[hi]

        if current_sum == target:
            return True
        elif current_sum < target:
            lo += 1
        else:
            hi -= 1

    return False


nums = [1, 2, 3, 4, 6, 8, 10]

print("Pair exists:", has_pair(nums, 10))
print("Pair exists:", has_pair(nums, 20))