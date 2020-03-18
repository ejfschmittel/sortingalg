import SortingAlgorithm from "./SortingAlgorithm"

class QuickSort extends SortingAlgorithm{



    * getGenerator(arr){ 
        var length = arr.length;
      
        if (length <= 1) {
          return arr;
        }
        var PIVOT = arr[0];
        var GREATER = [];
        var LESSER = [];
      
        for (var i = 1; i < length; i++) {
          if (arr[i] > PIVOT) {
            GREATER.push(arr[i]);
          } else {
            LESSER.push(arr[i]);
          }
        }
      
        var sorted = quickSort(LESSER);
        sorted.push(PIVOT);
        sorted = sorted.concat(quickSort(GREATER));
        
        return sorted;
      }
    }
}

export default QuickSort;