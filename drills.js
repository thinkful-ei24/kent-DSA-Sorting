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

function bucketSort(arr, min, max) {
  // Create bucket for each number between min and max
  const bucket = [];
  const ret = [];
  for (let i=0; i<=max-min; i++) {
    bucket[i] = 0;
  }

  arr.forEach(num => {
    bucket[num-min]++;
  });

  bucket.forEach((count, i) => {
    for (let j=0; j<count; j++) {
      ret.push(i+min);
    }
  });

  return ret;
}

// console.log('bucketSort: ', bucketSort(dataset, 1, 98));

function shuffle(arr) {
  for (let i=0; i<arr.length; i++) {
    swap(arr, i, Math.floor(Math.random() * arr.length));
  }
}

const books = ['The Lord of the Rings',
  'Le Petit Prince',
  'Harry Potter and the Philosopher\'s Stone',
  'The Hobbit',
  'And Then There Were None',
  'Alice\'s Adventures in Wonderland',
  'She: A History of Adventure',
  'You Can Heal Your Life',
  'Cien años de soledad',
  'Lolita',
  'Heidis Lehr- und Wanderjahre',
  'Black Beauty',
  'Charlotte\'s Web',
  'Watership Down',
  'Il Nome della Rosa',
  'Jonathan Livingston Seagull',
  'Flowers in the Attic',
  'Kane and Abel',
  'Valley of the Dolls',
  'Gone with the Wind'];

// Sorting books
// input: 20 books in random order
// output: 20 books sorted in alphabetical order
// organanize books by starting character(A-Z)
// sort the books again
function sortBooks(books) {
  const bookMap = {};
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  let ret = [];
  books.forEach(book => {
    if (bookMap[book[0].toLowerCase()]) {
      bookMap[book[0].toLowerCase()] = [...bookMap[book[0].toLowerCase()], book];
    } else {
      bookMap[book[0].toLowerCase()] = [book];
    }
  });

  for (let i=0; i<chars.length; i++) {
    let charBooks = bookMap[chars[i]];
    if (charBooks) {
      if (charBooks.length > 1) {
        charBooks = quickSort(charBooks);
      }
      ret = [...ret, ...charBooks];
    }
  }
  return ret;
}

console.log(sortBooks(books));

function countQuickSort(arr) {
  let count = 0;
  quickSort(arr);
  function quickSort(arr, start=0, end=arr.length) {
    count++;
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
  return count;
}

console.log(countQuickSort(dataset));
console.log(countMergeSort(dataset));

function countMergeSort(arr) {
  let count = 0;
  mergeSort(arr);
  function mergeSort(arr) {
    count++;
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

  return count;
}