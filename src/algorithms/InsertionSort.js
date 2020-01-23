import SortingAlgorithm from "./SortingAlgorithm"

class InsertionSort extends SortingAlgorithm{
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

