import BubbleSort from './BubbleSort';
import HeapSort from './HeapSort';
import InsertionSort from './InsertionSort';


export const SORT_ALGORITHMS = {
    HEAP_SORT: {
      display_name: "Heap Sort",
      value: "heap_sort",
      description: "heap sort. A sorting algorithm that works by first organizing the data to be sorted into a special type of binary tree called a heap. The heap itself has, by definition, the largest value at the top of the tree, so the heap sort algorithm must also reverse the order."
    },
    BUBBLE_SORT: {
      display_name: "Bubble Sort",
      value: "bubble_sort",
      description: "Bubble sort is a sorting algorithm that works by repeatedly stepping through lists that need to be sorted, comparing each pair of adjacent items and swapping them if they are in the wrong order. This passing procedure is repeated until no swaps are required, indicating that the list is sorted." 
    },
    INSERTION_SORT: {
        display_name: "Insertion Sort",
        value: "insertion_sort",
        description: "Insertion sort is a sorting algorithm in which the elements are transferred one at a time to the right position. In other words, an insertion sort helps in building the final sorted list, one item at a time, with the movement of higher-ranked elements."
    }
}


export const getSortingAlgorithm = (algo_value) => {
    switch(algo_value){
        case SORT_ALGORITHMS.HEAP_SORT.value:
            return new HeapSort();
        case SORT_ALGORITHMS.BUBBLE_SORT.value:
            return new BubbleSort();
        case SORT_ALGORITHMS.INSERTION_SORT.value:
            return new InsertionSort();
        default:
            return new HeapSort();
    }
}