import SortingAlgorithm from "./SortingAlgorithm"

class CocktailShakerSort extends SortingAlgorithm{

    * getGenerator(arr, RADIX) {

        //default radix is then because we usually count to base 10
        if (RADIX === undefined || RADIX < 1) {
          RADIX = 10;
        }
      
        var maxLength = false;
        var placement = 1;
      
        while (!maxLength) {
          maxLength = true;
          var buckets = [];
      
          for (var i = 0; i < RADIX; i++) {
            buckets.push([]);
          }
      
          for (var j = 0; j < arr.length; j++) {
            var tmp = arr[j] / placement;
            buckets[Math.floor(tmp % RADIX)].push(arr[j]);
            if (maxLength && tmp > 0) {
              maxLength = false;
            }
          }
      
          var a = 0;
          for (var b = 0; b < RADIX; b++) {
            var buck = buckets[b];
            for (var k = 0; k < buck.length; k++) {
              arr[a] = buck[k];
              yield arr;
              a++;
            }
          }
          placement *= RADIX;
        }
        return arr;
      }
}

export default CocktailShakerSort;