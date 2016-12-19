module.exports.receive_message = function(job, done) {
	console.log('Message Received');
	try {
		var ts = getTimeDifference(new Date(job.data.event_time));
		if (ts > 1) {
			done();
			removeJob(job);
		} else {
			var device = svr_config.devices.filter((val) => {
				return val.name == job.data.device;
			});
			if (device.length > 0) {
				console.log("Processing Message");
				processAutoAction(job.data);
				done();
				removeJob(job);
			} else {
				done();
			}
		}
	} catch (ex) {
		console.dir(ex);
		done();
	}
}

function getTimeDifference(start) {
	var now = new Date();
	var diffMs = (now - start); // milliseconds between now and event start
	return Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
}

function removeJob(job) {
	setTimeout(() => {
		console.log("Removing job id: " + job.jobId);
		job.remove();
	}, 1000);
}
