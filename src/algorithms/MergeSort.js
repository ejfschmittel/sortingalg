import SortingAlgorithm from "./SortingAlgorithm"

class MergeSort extends SortingAlgorithm{
    * getGenerator(arr){
        for (let i = 1; i < arr.length; i++) {
            let idx = i;
            while (idx > 0 && arr[idx] < arr[idx - 1]) {
                let lineBeforeCurrent = arr[idx - 1];
                arr[idx - 1] = arr[idx];
                arr[idx] = lineBeforeCurrent;
                yield arr;
                idx--
            }
        }
        return arr;
    }
}

export default InsertionSort;


const mergeSort = function* (array, l, r) {
    if (l < r) {
      let m = Math.floor(l + (r - l) / 2);
  
      yield* mergeSort(array, l, m);
      yield* mergeSort(array, m + 1, r);
  
      yield* merge(array, l, m, r);
    }
  }