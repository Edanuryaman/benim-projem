package com.edanur.controller;

import com.edanur.dto.DtoDepartment;
import com.edanur.dto.DtoDepartmentIU;

import java.util.List;

public interface IDepartmentController {
    public DtoDepartment saveDepartment(DtoDepartmentIU dtoDepartmentIU);
    public List<DtoDepartment> getAllDepartments();
}
