// package ems.service.Admin.mapper;

// import ems.service.Admin.dto.EmployeeDto;
// import ems.service.Admin.dto.EmployeeDtoGen;
// import ems.service.Admin.entity.Employee;

// public class EmployeeMapper {
//     public static EmployeeDto toEmployeeDto(Employee employee) {
//         return new EmployeeDto(
//             employee.getId(),
//             employee.getName(),
//             employee.getEmail(),
//             employee.getEmployeeTeam()
//         );
//     }

//     public static EmployeeDtoGen toEmployeeDtoGen(Employee employee) {
//         return new EmployeeDtoGen(
//             employee.getId(),
//             employee.getName(),
//             employee.getEmail(),
//             employee.getPosition(),
//             employee.getEmployeeTeam().getTeamName()
//         );
//     }
// }
