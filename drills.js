/* eslint-disable no-console */
const dataset = [89, 30, 25, 32, 72, 70, 51, 42, 25, 24, 53, 55, 78, 50, 13, 40, 48, 32, 26, 2, 14, 33, 45, 72, 56, 44, 21, 88, 27, 68, 15, 62, 93, 98, 73, 28, 16, 46, 87, 28, 65, 38, 67, 16, 85, 63, 23, 69, 64, 91, 9, 70, 81, 27, 97, 82, 6, 88, 3, 7, 46, 13, 11, 64, 76, 31, 26, 38, 28, 13, 17, 69, 90, 1, 6, 7, 64, 43, 9, 73, 80, 98, 46, 27, 22, 87, 49, 83, 6, 39, 42, 51, 54, 84, 34, 53, 78, 40, 14, 5];

function swap(arr, i, j) {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}

function quickSort(arr, start=0, end=arr.length) {
  // General case
  if (start >= end) {
    return arr;
  }

  // Choose a pivot
  const pivot = arr[end - 1];

  // Partition the array
  let j = start;
  for (let i=start; i<end - 1; i++) {
    if (arr[i] <= pivot) {
      swap(arr, i, j);
      j++;
    }
  }

  // Move pivot to middle
  swap(arr, end-1, j);

  // Run quicksort on both side of the pivot recursively
  arr = quickSort(arr, start, j);
  arr = quickSort(arr, j+1, end);

  // Return sorted array
  return arr;
}

// console.log('QuickSort: ', quickSort(dataset));
function merge(left, right, arr) {
  let leftIndex = 0;
  let rightIndex = 0;
  let outputIndex = 0;
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      arr[outputIndex++] = left[leftIndex++];
    }
    else {
      arr[outputIndex++] = right[rightIndex++];
    }
  }

  for (let i=leftIndex; i<left.length; i++) {
    arr[outputIndex++] = left[i];
  }

  for (let i=rightIndex; i<right.length; i++) {
    arr[outputIndex++] = right[i];
  }
  return arr;
}

function mergeSort(arr) {
  // Split array in half recursively
  if (arr.length < 2) {
    return arr;
  }

  const middle = Math.floor(arr.length/2);
  const left = mergeSort(arr.slice(0, middle));
  const right = mergeSort(arr.slice(middle));
  // Merge arrays together
  // Return array
  return merge(left, right, arr);
}

// console.log('MergeSort: ', mergeSort(dataset));