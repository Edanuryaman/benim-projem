package com.edanur.controller.impl;

import com.edanur.controller.IEmployeeController;
import com.edanur.dto.DtoEmployee;
import com.edanur.services.IEmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/rest/api/employee")
public class EmployeeControllerImpl implements IEmployeeController {
    @Autowired
    private IEmployeeService employeeService;

    @GetMapping(path = "/list")
    @Override
    public List<DtoEmployee> getEmployeeList() {
        return employeeService.getAllEmployees();
    }

    @GetMapping(path = "list/{id}")
    @Override
    public DtoEmployee getEmployeeById(@PathVariable(name = "id") long id) {
        return employeeService.getEmployeeById(id);
    }
}
