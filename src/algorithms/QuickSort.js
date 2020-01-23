import SortingAlgorithm from "./SortingAlgorithm"

class QuickSort extends SortingAlgorithm{


    quickSort(arr, left, right){
        var len = arr.length, 
        pivot,
        partitionIndex;
     
     
       if(left < right){
         pivot = right;
         partitionIndex = this.partition(arr, pivot, left, right);
         
        //sort left and right
        yield this.quickSort(arr, left, partitionIndex - 1);
        yield this.quickSort(arr, partitionIndex + 1, right);
       }
       return arr;
     }

     partition(arr, pivot, left, right){
        var pivotValue = arr[pivot],
            partitionIndex = left;
     
        for(var i = left; i < right; i++){
         if(arr[i] < pivotValue){
           this.swap(arr, i, partitionIndex);
           partitionIndex++;
         }
       }
       this.swap(arr, right, partitionIndex);
       return partitionIndex;
     }

     swap(arr, i, j){
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
     }
       


    * getGenerator(arr){ 
        yield quickSort(arr, left, right);
        return arr;
    }
}

export default InsertionSort;