import SortingAlgorithm from "./SortingAlgorithm"

class BubbleSort extends SortingAlgorithm{
    * getGenerator(arr){
      var len = arr.length;
        for (var i = len-1; i>=0; i--){
          for(var j = 1; j<=i; j++){
            if(arr[j-1]>arr[j]){
                var temp = arr[j-1];
                arr[j-1] = arr[j];
                arr[j] = temp;
                yield arr;
             }
          }
        }
        return arr;
    }
}

export default BubbleSort