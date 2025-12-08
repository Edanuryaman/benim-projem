package com.edanur.controller.impl;

import com.edanur.controller.IDepartmentController;
import com.edanur.dto.DtoDepartment;
import com.edanur.dto.DtoDepartmentIU;
import com.edanur.services.IDepartmentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/api/department")
public class DepartmentControllerImpl implements IDepartmentController {
    @Autowired
    private IDepartmentService departmentService;

    @PostMapping(path = "/save")
    @Override
    public DtoDepartment saveDepartment(@RequestBody @Valid DtoDepartmentIU dtoDepartmentIU) {
        return departmentService.saveDepartment(dtoDepartmentIU);
    }
}
