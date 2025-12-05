package com.edanur.services.impl;

import com.edanur.dto.DtoCommunication;
import com.edanur.dto.DtoDepartment;
import com.edanur.dto.DtoEmployee;
import com.edanur.entity.Communication;
import com.edanur.entity.Employee;
import com.edanur.repository.EmployeeRepository;
import com.edanur.services.IEmployeeService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EmployeeServiceImpl implements IEmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public List<DtoEmployee> getAllEmployees() {
        List<Employee> employeeList = employeeRepository.findAll();
        List<DtoEmployee> dtoEmployeeList = new ArrayList<>();
        if (employeeList.isEmpty()) {
            return null;
        }
        for (Employee employee : employeeList) {
            DtoEmployee dtoEmployee = new DtoEmployee();
            DtoCommunication dtoCommunication = new DtoCommunication();
            BeanUtils.copyProperties(employee, dtoEmployee);
            Communication communication = employee.getCommunication();
            BeanUtils.copyProperties(communication, dtoCommunication);
            dtoEmployee.setDepartment(new DtoDepartment(employee.getDepartment().getId(), employee.getDepartment().getName()));
            dtoEmployee.setCommunication(dtoCommunication);
            dtoEmployeeList.add(dtoEmployee);
        }
        return dtoEmployeeList;
    }
}
