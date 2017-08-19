function CancelledPromiseError(originalError) {
	this.name = 'CancelledPromiseError';
	this.originalError = originalError;
	this.isCanceled = true;
}

CancelledPromiseError.prototype = Error.prototype;

export default (parampromise) => {
	let hasCanceled = false;

	const promise = new Promise((resolve, reject) => {
		parampromise.then(val => {
			if (hasCanceled) {
				throw new CancelledPromiseError();
			}
			resolve(val);
		})
			.catch((error) => {
				if (hasCanceled) {
					reject(new CancelledPromiseError(error));
				}
				reject(error);
			});
	});
	return {
		promise,
		cancel() {
			hasCanceled = true;
		},
	};
};
