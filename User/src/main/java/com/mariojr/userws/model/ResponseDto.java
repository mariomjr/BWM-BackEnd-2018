package com.mariojr.userws.model;

public class ResponseDto<T> {

	public T data;
	
	private String message;

	public ResponseDto(T data, String message) {
		this.data = data;
		this.message = message;
	}

	public T getData() {
		return data;
	}

	public void setData(T data) {
		this.data = data;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
}
