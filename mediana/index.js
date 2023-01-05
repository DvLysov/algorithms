/*
	https://github.com/Brooooooklyn?tab=repositories

	https://leetcode.com/problems/median-of-two-sorted-arrays/

	https://onecompiler.com/javascript/3yttuyjt3
*/

const tests = [
	{
		index: 0,
		a1: [1, 3],
		a2: [2],
	},
	{
		index: 1,
		a1: [1, 3, 5],
		a2: [2, 4],
	},
	{
		index: 2,
		a1: [1, 3, 5, 8],
		a2: [2, 6],
	},
	{
		index: 3,
		a1: [1, 9], 
		a2: [2, 3, 4],
	},
	{
		index: 4,
		a1: [1, 2],
		a2: [3, 4],
	},
	{
		index: 5,
		a1: [1, 6, 10],
		a2: [7, 20],
	},
	{
		index: 6,
		a1: [1],
		a2: [2],
	},
	{
		index: 7,
		a1: [5, 8, 10, 20],
		a2: [4, 6, 15],
	},
	{
		index: 8,
		a1: [5, 8, 10, 20],
		a2: [15, 25],
	},
	{
		index: 9,
		a1: [100, 120, 140, 160],
		a2: [90, 95],
	},
	{
		index: 10,
		a1: [10, 12, 14, 16], 
		a2: [17, 18, 19, 20, 22, 24, 25, 26],
	},
	{
		index: 11,
		a1: [30, 40], 
		a2: [10],
	},
	{
		index: 12,
		a1: [10, 20, 30, 40],
		a2: [15, 25],
	},
	{
		index: 12,
		a1: [10, 20, 30, 40], 
		a2: [5, 15, 25, 26, 35, 45, 60],
	},
];

const getRandomNumber = (min, max) => 
	min + Math.floor( Math.random() * (max - min + 1) );

const uniqueArray = (minRange, maxRange, arrayLength) => {
	var arrayLength = (arrayLength) ? arrayLength : 10
	var minRange = (minRange !== undefined) ? minRange : 1
	var maxRange = (maxRange !== undefined) ? maxRange : 100
	var numberOfItemsInArray = 0
	var hash = {}
	var array = []
  
	if ( arrayLength > (maxRange - minRange) ) throw new Error('Cannot generate unique array: Array length too high')
  
	while(numberOfItemsInArray < arrayLength){
	  var randomNumber = (Math.random() * (maxRange - minRange + 1) + minRange) << 0
  
	  if (!hash[randomNumber]) {
		hash[randomNumber] = true
		array.push(randomNumber)
		numberOfItemsInArray++
	  }
	}
	return array;
}

const MAX_VALUE = Math.pow(10, 6);
const MIN_VALUE = -1 * MAX_VALUE;

const checkIsEven = (l) => 
  l % 2 === 0 ? true : false;

const getMedian = (arr) => {
	if ( checkIsEven(arr.length) ) {
		const tmp = arr.length / 2;
		const a1 = arr[tmp - 1];
		const a2 = arr[tmp];
		return (a1 + a2) / 2;
	}
	return arr[Math.ceil(arr.length/2) - 1];
}

const getTrueM = (arr1, arr2) => {
	const tmp = [...arr1, ...arr2];
	tmp.sort( (a, b) => (a-b) );
	return getMedian(tmp);
}

const getM = (a1, a2) => {
	const l1 = a1.length;
	const l2 = a2.length;
	const ll = l1 + l2;
	let arr = [];
	let arr1 = a1;
	let arr2 = a2;
	const isEven = checkIsEven(ll);
	const col = isEven ? (ll/2 + 1) : Math.ceil(ll/2);
	while ( arr1.length && arr2.length && arr.length < col ) {
		if (arr1[0] < arr2[0]) {
			arr.push( arr1.shift() ); 
		} else { 
			arr.push( arr2.shift() ); 
		}
	}
	if ( arr.length < col && (arr1.length || arr2.length) ) {
		const addItems = [...arr1, ...arr2].slice(0, Math.abs(arr.length - col) );
		addItems.sort( (a, b) => (a-b) )
		Array.prototype.push.apply(arr, addItems);
	}
	return isEven ? ( arr[arr.length-2] + arr[arr.length-1] ) / 2 : arr[arr.length-1];
}

const r = [];


for (let i=0, l = tests.length; i<l; i++ ) {
	const test = tests[i];
	const l1 = test.a1.length;
	const l2 = test.a2.length;
	const a1 = test.a1;
	const a2 = test.a2;
	const mediana = getTrueM(a1, a2);
	const result = getM(a1, a2);
	r.push({
		a1Length: l1,
		a2Length: l2,
		mediana, 
		result, 
		isTrue: ( mediana === result ) 
	});
}

for (let i=0, l = 1; i<l; i++ ) {

	const a1 = uniqueArray(MIN_VALUE, MAX_VALUE, getRandomNumber(1, 1000));
	const a2 = uniqueArray(MIN_VALUE, MAX_VALUE, getRandomNumber(1, 1000));

	a1.sort( (a, b) => (a - b) );
	a2.sort( (a, b) => (a - b) );

	const l1 = a1.length;
	const l2 = a2.length;

	const mediana = getTrueM(a1, a2);

	const result = getM(a1, a2);

	r.push({
		a1Length: l1,
		a2Length: l2,
		mediana, 
		result, 
		isTrue: ( mediana === result ) 
	});
}

console.table(r);

if ( (r || []).some( c => (c.isTrue === false) ) ) {
	console.log('has false');
}



