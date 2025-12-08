package com.edanur.controller;

import com.edanur.dto.DtoCommunication;
import com.edanur.dto.DtoCommunicationIU;

public interface ICommunicationController {
    public DtoCommunication save(DtoCommunicationIU dtoCommunicationIU);
}
