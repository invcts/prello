package prello.service;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.ObjectCodec;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import prello.model.Appointment;

import java.io.IOException;


public class JsonAppointmentDeserializer extends JsonDeserializer<Appointment> {


    @Override
    public Appointment deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JsonProcessingException {
        ObjectCodec oc = jsonParser.getCodec();
        JsonNode node = oc.readTree(jsonParser);

        return new Appointment( node.get("start_time").textValue(),
                                node.get("end_time").textValue(),
                                node.get("title").textValue(),
                                node.get("description").textValue(),
                                node.get("type").textValue());
    }
}
