package com.edanur.controller;

import com.edanur.dto.DtoDepartment;
import com.edanur.dto.DtoDepartmentIU;

public interface IDepartmentController {
    public DtoDepartment saveDepartment(DtoDepartmentIU dtoDepartmentIU);
}
