/**
 * @param {number[]} nums
 * @return {number}
 */
var pivotIndex = function (nums) {
    let left = 0

    let end = nums.length - 1
    let right = nums[end]
    for (let i = 0; i < nums.length; i++) {
        left = left + nums[i]
        console.log(left)
        if (left == right) {
            return i
        } else if (left > right) {
            right = right + nums[--end]
        }
    }
    return -1
};

console.log(pivotIndex([1, 7, 3, 6, 5, 6]))