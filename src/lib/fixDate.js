function fixDate (date, noTime) {
	let fixedDate = '';

	console.log(date);
	const stage1 = date.split(/T/);
	const stage2 = stage1[0].split(/-/);
	const stage3 = stage1[1].split(/\./);

	if (noTime === true) {
		fixedDate = `${stage2[1]}-${stage2[2]}-${stage2[0]}`;
	}
	else {
		fixedDate = `${stage2[1]}-${stage2[2]}-${stage2[0]} ${stage3[0]}`;
	}
	return fixedDate;
}

module.exports = fixDate;

// 2021-04-26T16:43:11.000Z

/*
function findBlogs(onFetch, type, slugName) {
	let waitTime = 250;

	return new Promise(resolve => {
		setTimeout(() => {
			resolve(onFetch(type, slugName));
		}, waitTime);

	});
}
module.exports = findBlogs;

 */