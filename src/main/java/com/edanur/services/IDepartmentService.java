package com.edanur.services;

import com.edanur.dto.DtoDepartment;
import com.edanur.dto.DtoDepartmentIU;

import java.util.List;

public interface IDepartmentService {
    public DtoDepartment saveDepartment(DtoDepartmentIU dtoDepartmentIU);
    public List<DtoDepartment> getAllDepartments();
}
