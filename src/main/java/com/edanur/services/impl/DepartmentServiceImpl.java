package com.edanur.services.impl;

import com.edanur.dto.DtoDepartment;
import com.edanur.dto.DtoDepartmentIU;
import com.edanur.entity.Department;
import com.edanur.repository.DepartmentRepository;
import com.edanur.services.IDepartmentService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DepartmentServiceImpl implements IDepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;

    @Override
    public DtoDepartment saveDepartment(DtoDepartmentIU dtoDepartmentIU) {
        Department department = new Department();
        DtoDepartment dtoDepartment = new DtoDepartment();
        BeanUtils.copyProperties(dtoDepartmentIU, department);
        Department dbDepartment = departmentRepository.save(department);
        BeanUtils.copyProperties(dbDepartment, dtoDepartment);
        return dtoDepartment;
    }
}
