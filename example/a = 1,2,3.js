let a = [1,2,3]
a.valueOf = function () {
    return a.shift()
}
if(a == 1 && a == 2 && a == 3) {
    console.log(true)
}

const fn = function () {console.log(this)}
const arr = [fn]
arr[0]()
