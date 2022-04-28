package com.ecm.user.controller;

import java.io.IOException;
import java.net.FileNameMap;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ecm.exception.ServiceExeption;
import com.ecm.user.entities.Administrator;
import com.ecm.user.entities.Document;
import com.ecm.user.services.AdministratorService;
import com.ecm.user.services.DocumentService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api")
public class AdministratorController {
	@Autowired
	private AdministratorService AdministratorService;
	@Autowired
	private DocumentService documentService;

	// Get All Administrators
	@GetMapping("/administrator/liste")
	public List<Administrator> getAdministrators() {
		return AdministratorService.getAdministrators();
	}

	// find by id
	@GetMapping("/administrator/{id}")
	public Optional<Administrator> getAdministrator(@PathVariable Long id) {
		return AdministratorService.find(id);

	}

	// Delete Administrator
	@DeleteMapping("/administrator/delete/{id}")
	public boolean deleteAdministrator(@PathVariable long id) {
		AdministratorService.delete(id);

		return true;
	}

	// update Administrator
	@PutMapping("/administrator/update")
	public Administrator updateAdministrator(@RequestBody Administrator Administrator) {
		return AdministratorService.update(Administrator);

	}

	// add new Administrator
	@PostMapping(value = "/administrator/create", consumes = { MediaType.APPLICATION_JSON_VALUE,
			MediaType.MULTIPART_FORM_DATA_VALUE })
	public void fileUpload(@RequestPart("files") List<MultipartFile> files, @RequestPart("admin") String admin)
			throws ServiceExeption, JsonMappingException, JsonProcessingException {

		List<Document> documents = new ArrayList<>();
		// convert string to administrator
		ObjectMapper mapper = new ObjectMapper();
		JsonNode node = mapper.readTree(admin);
		Administrator adminstrator = mapper.convertValue(node, Administrator.class);
		if (!CollectionUtils.isEmpty(files)) {
			files.stream().forEach(file -> {
				try {
					Document filemode = new Document(file.getOriginalFilename(), file.getContentType(),
							file.getBytes());
					documents.add(filemode);
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			});

		}
		if (!documents.isEmpty()) {
			System.out.print("Add documents");
			adminstrator.setDocuments(documents);
		}

		AdministratorService.save(adminstrator);

	}

	// display file
	@GetMapping("/administrator/displayfile/{id}")
	public ResponseEntity<byte[]> displayFile(@PathVariable Long id) {

		Optional<Document> fileOptional = documentService.findById(id);
		if (fileOptional.isPresent()) {

			Document file = fileOptional.get();
			FileNameMap fileNameMap = URLConnection.getFileNameMap();
			// for power point and word file can't know the type
			String mimeType = fileNameMap.getContentTypeFor(file.getName());
			System.out.print(mimeType);
			HttpHeaders headers = new HttpHeaders();
			if (mimeType == null) {
				headers.setContentType(MediaType.parseMediaType("application/octet-stream"));
			} else {
				headers.setContentType(MediaType.parseMediaType(mimeType));
			}

			headers.add("Content-Disposition", "inline;filename=\"" + file.getName() + "\"");

			headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
			ResponseEntity<byte[]> response = new ResponseEntity<byte[]>(file.getBytes(), headers, HttpStatus.OK);

			return response;
		}

		return ResponseEntity.status(404).body(null);
	}

	// download file
	@GetMapping("/administrator/downloadfile/{id}")
	public ResponseEntity<byte[]> downloadFile(@PathVariable Long id) {

		Optional<Document> fileOptional = documentService.findById(id);
		if (fileOptional.isPresent()) {

			Document file = fileOptional.get();
			return ResponseEntity.ok()
					.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getName() + "\"")
					.body(file.getBytes());
		}

		return ResponseEntity.status(404).body(null);
	}

}
