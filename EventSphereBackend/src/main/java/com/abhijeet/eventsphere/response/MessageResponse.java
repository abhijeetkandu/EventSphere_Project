package com.abhijeet.eventsphere.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MessageResponse {

    private String message;
    private boolean success;

    public static MessageResponse success(String message) {
        return new MessageResponse(message, true);
    }
}
