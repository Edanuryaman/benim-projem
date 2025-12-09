package com.edanur.services.impl;

import com.edanur.dto.DtoCommunication;
import com.edanur.dto.DtoDepartment;
import com.edanur.dto.DtoEmployee;
import com.edanur.dto.DtoEmployeeIU;
import com.edanur.entity.Communication;
import com.edanur.entity.Department;
import com.edanur.entity.Employee;
import com.edanur.repository.CommunicationRepository;
import com.edanur.repository.DepartmentRepository;
import com.edanur.repository.EmployeeRepository;
import com.edanur.services.IEmployeeService;
import jakarta.transaction.Transactional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.Normalizer;
import java.util.*;

@Service
public class EmployeeServiceImpl implements IEmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private CommunicationRepository communicationRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

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

    @Override
    public DtoEmployee getEmployeeById(long id) {
        Optional<Employee> optional = employeeRepository.findById(id);
        if (optional.isEmpty()) {
            return null;
        }
        Employee employee = optional.get();

        DtoEmployee dtoEmployee = new DtoEmployee();
        DtoCommunication dtoCommunication = new DtoCommunication();
        DtoDepartment dtoDepartment = new DtoDepartment();

        BeanUtils.copyProperties(employee, dtoEmployee);

        if (employee.getCommunication() != null) {
            BeanUtils.copyProperties(employee.getCommunication(), dtoCommunication);
            dtoEmployee.setCommunication(dtoCommunication);
        }

        if (employee.getDepartment() != null) {
            BeanUtils.copyProperties(employee.getDepartment(), dtoDepartment);
            dtoEmployee.setDepartment(dtoDepartment);
        }

        return dtoEmployee;
    }

    @Override
    @Transactional
    public DtoEmployee saveEmployee(DtoEmployeeIU dto) {

        // 1) Department çek
        Department department = departmentRepository
                .findById(dto.getDepartmentId())
                .orElseThrow(() -> new RuntimeException("Department not found"));

        Communication communication = communicationRepository
                .findById(dto.getCommunicationId())
                .orElseThrow(() -> new RuntimeException("Communication not found"));


        // 3) Username oluştur
        String username = generateUsername(dto.getFirstName(), dto.getLastName(), dto.getDateOfBirth());

        // 4) Employee oluştur
        Employee employee = new Employee();
        BeanUtils.copyProperties(dto, employee);
        employee.setUsername(username);
        employee.setDepartment(department);
        employee.setCommunication(communication);

        Employee dbEmployee = employeeRepository.save(employee);

        // 5) Return DTO
        DtoEmployee dtoEmployee = new DtoEmployee();
        BeanUtils.copyProperties(dbEmployee, dtoEmployee);
        return dtoEmployee;
    }


    public String generateUsername(String firstName, String lastName, Date dateOfBirth) {
        String normalizedFirst = Normalizer.normalize(firstName, Normalizer.Form.NFD)
                .replaceAll("[^\\p{ASCII}]", "")
                .toLowerCase()
                .replace(" ", "_"); // boşluk → _

        String normalizedLast = Normalizer.normalize(lastName, Normalizer.Form.NFD)
                .replaceAll("[^\\p{ASCII}]", "")
                .toLowerCase()
                .replace(" ", "_"); // soyadında da boşluk olabilir

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(dateOfBirth);

        int month = calendar.get(Calendar.MONTH) + 1;
        int year = calendar.get(Calendar.YEAR) % 100;

        String monthStr = String.format("%02d", month);
        String yearStr = String.format("%02d", year);

        // Format: firstname.lastnameMMYY
        return normalizedFirst + "." + normalizedLast + monthStr + yearStr;
    }

}
