package com.ecm;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.ecm.user.services.AdministratorService;
import com.ecm.user.services.ModuleService;
import com.ecm.user.services.PermissionService;
import com.ecm.user.services.RoleService;
import com.ecm.user.services.UserService;
import com.ecm.project.dao.PhaseDao;
import com.ecm.project.entities.Phase;
import com.ecm.user.entities.Administrator;
import com.ecm.user.entities.Module;
import com.ecm.user.entities.Permission;
import com.ecm.user.entities.Role;
import com.ecm.user.entities.User;

@Component
public class CommandLineAppStartupRunner implements CommandLineRunner {
	@Autowired
	private ModuleService moduleservice;
	@Autowired
	private PermissionService permissionservice;
	@Autowired
	private RoleService roleservice;
	@Autowired
	private AdministratorService administratorService;
	@Autowired
	PhaseDao Phasedao;

	@Override
	public void run(String... args) throws Exception {
		List<Permission> permissions = new ArrayList<Permission>();
		Module module1 = new Module();
		module1.setModuleName("Project");
		moduleservice.save(module1);
		Module module2 = new Module();
		module2.setModuleName("Employee");
		moduleservice.save(module2);
		Module module3 = new Module();
		module3.setModuleName("Client");
		moduleservice.save(module3);
		Module module4 = new Module();
		module4.setModuleName("Administrator");
		moduleservice.save(module4);
		/********* permissions of projects *************************************/
		Permission permission = new Permission();
		permission.setId((long) 1);
		permission.setModule(module1);
		permission.setPermission_name("add project");
		permissionservice.save(permission);
		permissions.add(permission);
		permission = new Permission();
		permission.setId((long) 2);
		permission.setModule(module1);
		permission.setPermission_name("delete project");
		permissionservice.save(permission);
		permissions.add(permission);
		permission = new Permission();
		permission.setId((long) 3);
		permission.setModule(module1);
		permission.setPermission_name("consult project");
		permissionservice.save(permission);
		permissions.add(permission);
		permission = new Permission();
		permission.setId((long) 4);
		permission.setModule(module1);
		permission.setPermission_name("edit project");
		permissionservice.save(permission);
		permissions.add(permission);
		/*************************************
		 * permissions of employee
		 **********************************/
		permission = new Permission();
		permission.setId((long) 5);
		permission.setModule(module2);
		permission.setPermission_name("add employee");
		permissionservice.save(permission);
		/// add in list
		permissions.add(permission);
		permission = new Permission();
		permission.setId((long) 6);
		permission.setModule(module2);
		permission.setPermission_name("delete employee");
		permissionservice.save(permission);
		permissions.add(permission);
		permission = new Permission();
		permission.setId((long) 7);
		permission.setModule(module2);
		permission.setPermission_name("consult employee");
		permissionservice.save(permission);
		permissions.add(permission);
		permission = new Permission();
		permission.setId((long) 8);
		permission.setModule(module2);
		permission.setPermission_name("edit employee");
		permissionservice.save(permission);
		permissions.add(permission);
		/**********************************
		 * permissions of client
		 ****************************/
		permission = new Permission();
		permission.setId((long) 9);
		permission.setModule(module3);
		permission.setPermission_name("add client");
		permissionservice.save(permission);
		permissions.add(permission);
		permission = new Permission();
		permission.setId((long) 10);
		permission.setModule(module3);
		permission.setPermission_name("delete client");
		permissionservice.save(permission);
		permissions.add(permission);
		permission = new Permission();
		permission.setId((long) 11);
		permission.setModule(module3);
		permission.setPermission_name("consult client");
		permissionservice.save(permission);
		permissions.add(permission);
		permission = new Permission();
		permission.setId((long) 12);
		permission.setModule(module3);
		permission.setPermission_name("edit client");
		permissionservice.save(permission);
		permissions.add(permission);
		/**********************************
		 * permissions of administrator
		 ****************************/
		permission = new Permission();
		permission.setId((long) 13);
		permission.setModule(module4);
		permission.setPermission_name("add administrator");
		permissionservice.save(permission);
		permissions.add(permission);
		permission = new Permission();
		permission.setId((long) 14);
		permission.setModule(module4);
		permission.setPermission_name("delete administrator");
		permissionservice.save(permission);
		permissions.add(permission);
		permission = new Permission();
		permission.setId((long) 15);
		permission.setModule(module4);
		permission.setPermission_name("consult administrator");
		permissionservice.save(permission);
		permissions.add(permission);
		permission = new Permission();
		permission.setId((long) 16);
		permission.setModule(module4);
		permission.setPermission_name("edit administrator");
		permissionservice.save(permission);
		permissions.add(permission);
		/***************************** default role ***************************/
		Role role = new Role();
		role.setId((long) 1);
		role.setName("admin");
		role.setDescription("have all permission");

		role.setPermissions(permissions);
		roleservice.save(role);
		Administrator user = new Administrator();
		user.setRole(role);
		user.setFullname("Omar Abdelkefi");
		user.setPassword("123456");
		user.setId((long) 1);
		user.setUsername("omarabdelkefi130@gmail.com");
		user.setType("admin");
		user.setSuperadmin(true);
		administratorService.save(user);

		/*
		 * Phase Phase=new Phase(); Phase.setId( (long) 1); Phase.setName("refused");
		 * Phase.setOrderId((long) 0); Phasedao.saveAndFlush(Phase);
		 */
	}

}