import SortingAlgorithm from "./SortingAlgorithm";


class HeapSort extends SortingAlgorithm{

    heap_root =  (input, i) => {
        var left = 2 * i + 1;
        var right = 2 * i + 2;
        var max = i;
    
        if (left < this.array_length && input[left] > input[max]) {
            max = left;
        }
    
        if (right < this.array_length && input[right] > input[max])     {
            max = right;
        }
    
        if (max != i) {
             this.swap(input, i, max);
             this.heap_root(input, max);
        }
    }

    swap =  (input, index_A, index_B) => {
        var temp = input[index_A];  
        input[index_A] = input[index_B];
        input[index_B] = temp; 
    }

    * getGenerator(arr){
        this.array_length = arr.length;

        for (var i = Math.floor(this.array_length / 2); i >= 0; i -= 1)      {
             this.heap_root(arr, i);
             yield arr;
        }
    
        for (i = arr.length - 1; i > 0; i--) {
            this.swap(arr, 0, i);
            yield arr;
            this.array_length--;
                 
            this.heap_root(arr, 0);
            yield arr;
        }

        return arr;
    }
}

export default HeapSort;

/*
    use a callback function that can be placed anywher 

    getSortingAlgo => new HeapSort(() => {

    }).run();

*/