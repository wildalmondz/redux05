function findBlogs(onFetch, type, slugName) {
	let waitTime = 250;

	return new Promise(resolve => {
		setTimeout(() => {
			resolve(onFetch(type, slugName));
		}, waitTime);

	});
}
module.exports = findBlogs;

/*
function delay() {
  // `delay` returns a promise
  return new Promise(function(resolve, reject) {
    // Only `delay` is able to resolve or reject the promise
    setTimeout(function() {
      resolve(42); // After 3 seconds, resolve the promise with value 42
    }, 3000);
  });
}
 */