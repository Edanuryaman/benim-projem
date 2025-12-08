package com.edanur.services;

import com.edanur.dto.DtoCommunication;
import com.edanur.dto.DtoCommunicationIU;

public interface ICommunicationService {
    public DtoCommunication save(DtoCommunicationIU dtoCommunicationIU);
}
