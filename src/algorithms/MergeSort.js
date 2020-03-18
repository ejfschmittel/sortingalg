import SortingAlgorithm from "./SortingAlgorithm"

class MergeSort extends SortingAlgorithm{


     * merge(list1, list2) {
        var results = [];
      
        while(list1.length && list2.length) {
          if (list1[0] <= list2[0]) {
            results.push(list1.shift());
          } else {
            results.push(list2.shift());
          }
        }

      
        return results.concat(list1, list2);

    }

    * mergeSort(arr, restOfList, first){
        if (arr.length < 2) return arr;

        var listHalf = Math.floor(arr.length/2);
        var subList1 = arr.slice(0, listHalf);
        var subList2 = arr.slice(listHalf, arr.length);

        const merged = this.merge(this.mergeSort(subList1, subList2, true), this.mergeSort(subList2, subList1, false));
        
        // how to get full list
        if(!restOfList)
            yield* merged;
        else{
            if(first){
                yield* merged.concat(restOfList) 
            }else{
                yield* restOfList.concat(this.merge)
            }
        }
          
           


        return merged;
    }

    * getGenerator(arr) {
        const newArr = this.mergeSort(arr, null)  
        yield newArr
        return newArr;  
    }
}

export default MergeSort;