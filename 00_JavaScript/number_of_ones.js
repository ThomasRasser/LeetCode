// URLs and other information
/* ------------------------------------------------------------ */
// Online article:
// https://codingforspeed.com/how-many-ones-between-number-1-to-n/

// Online solution:
// https://leetcode.com/problems/number-of-digit-one/discuss/64382/JavaPython-one-pass-solution-easy-to-understand

/* ------------------------------------------------------------ */

// Counts the number of ones in a number
// Example: number_of_ones(12) -> 5
//  0  -> 0
//  1  -> 1
//  2  -> 0
//  ...
//  9  -> 0
//  10 -> 1
//  11 -> 2
//  12 -> 1
//  Result: 5
function number_of_ones_simple(n) {
  let cnt = 0;
  for (let cur_numb = 0; cur_numb <= n; cur_numb++) {
    for (let numb of cur_numb.toString()) {
      if (numb == "1") {
        cnt++;
      }
    }
  }
  return cnt;
}

// Counts the number of ones in a number
// Example: number_of_ones(12) -> 5
//  0  -> 0
//  1  -> 1
//  2  -> 0
//  ...
//  9  -> 0
//  10 -> 1
//  11 -> 2
//  12 -> 1
//  Result: 5
//
// This is achieved by calculating the number of 1s
// in each digit of the number and adding them up.
function number_of_ones_iterative(n) {
  const n_str = n.toString();
  const n_len = n_str.length;
  const cnt_array = [];
  
  // The number of 1s in the first digit is just the number divided by 10
  // since every ten digits, another 1 appears.
  // Example: 01, 11, 21, 31, ... 91, 101, ...
  cnt_array[0] = Math.ceil(n / 10);
  let cnt_array_sum = cnt_array[0];


  let div = 100;
  let multiplier = 10;
  for (let i = 1; i < n_len; i++, div*=10, multiplier*=10) {
    cnt_array[i] = Math.floor(n / div);
    cnt_array[i] *= multiplier;

    if (Number(n_str[n_len - (i+1)]) == 1) {
      cnt_array[i] += n % multiplier + 1;
    }

    if (Number(n_str[n_len - (i+1)]) > 1) {
      cnt_array[i] += multiplier;
    }

    cnt_array_sum += cnt_array[i];
  }

  return cnt_array_sum;
}

/* Testing */
/* ------------------------------------------------------------ */
function testing() {
  let error_cnt = 0;
  for(let i = 0; i < 12345; i++) {
    let simple = number_of_ones_simple(i);
    let iterative = number_of_ones_iterative(i);
    if (simple != iterative) {
      console.log(`Error ${i}: ${simple} != ${iterative}`);
      error_cnt++;
    }
  }

  if (error_cnt == 0) {
    console.log("All tests passed!");
  }
}
//testing();

/* Benchmarking */
/* ------------------------------------------------------------ */
function benchmark(max_magnitude) {
  console.log("\nBenchmark against simple approach\n");
  
  let start, end;
  for(let magnitude = 100; magnitude <= max_magnitude; magnitude*=10) {
    let random_number = Math.ceil(Math.random() * magnitude);

    console.log(`Number: ${random_number}`);
    console.log("----------------------------------------");

    start = performance.now();
    number_of_ones_simple(random_number);
    end = performance.now();
    console.log(`Simple: ${end - start}`);

    start = performance.now();
    number_of_ones_iterative(random_number);
    end = performance.now();
    console.log(`Iterative: ${end - start}`);

    console.log("----------------------------------------\n");
  }
}
//benchmark(1000000);