//package com.abhijeet.eventsphere.kafka;
//
//
//import org.springframework.kafka.core.KafkaTemplate;
//import org.springframework.stereotype.Service;
//
//@Service
//public class KafkaProducerService {
//    private static final String TOPIC = "event-topic";
//
//    private final KafkaTemplate<String, String> kafkaTemplate;
//
//    public KafkaProducerService(KafkaTemplate<String, String> kafkaTemplate){
//        this.kafkaTemplate = kafkaTemplate;
//    }
//    public void sendMessage(String message){
//        kafkaTemplate.send(TOPIC, message);
//    }
//}
