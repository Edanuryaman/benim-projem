package com.edanur.dto;
import jakarta.validation.constraints.NotEmpty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
//insert - update işlemleri için

public class DtoDepartmentIU {
    @NotEmpty(message = "Departman adı girmek zorunludur.")
    private String name;
}
