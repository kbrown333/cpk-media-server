export class Ajax {
	
	get(data: any): void {
		$.ajax({
			url: data.path,
			type: 'GET',
			success: data.callback,
			error: data.error
		});
	}

	post(data: any): void {
		$.ajax({
			url: data.path,
			type: 'POST',
			headers: data.headers,
			data: data.data,
			success: data.callback,
			error: data.error
		});
	}

}