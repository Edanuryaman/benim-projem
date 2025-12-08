package com.edanur.services;

import com.edanur.dto.DtoDepartment;
import com.edanur.dto.DtoDepartmentIU;

public interface IDepartmentService {
    public DtoDepartment saveDepartment(DtoDepartmentIU dtoDepartmentIU);
}
