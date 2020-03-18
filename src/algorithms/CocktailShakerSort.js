import SortingAlgorithm from "./SortingAlgorithm"

class CocktailShakerSort extends SortingAlgorithm{



    * getGenerator(arr){ 
        for (let i = arr.length - 1; i > 0; i--) {
            let swapped = false;
            let temp, j;
    
            // backwards
            for (j = arr.length -1; j > i; j--) {
                if (arr[j] < arr[j - 1]) {
                    temp = arr[j];
                    arr[j] = arr[j - 1];
                    arr[j - 1] = temp;
                    yield arr;
                    swapped = true;
                }
            }
    
            //forwards
            for (j = 0; j < i; j++) {
                if (arr[j] > arr[j + 1]) {
                    temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    yield arr;
                    swapped = true;
                }
            }
            if (!swapped) {
                return true;
            }
        }
    }
}

export default CocktailShakerSort;