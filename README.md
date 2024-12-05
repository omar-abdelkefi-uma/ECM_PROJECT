# ECM_PROJECT (you can clone project and see video)
This project consist of the design and the realization of a web application making it possible to offer the main functions of effective project management.
It allows to make the link between the client and the project managers. Employees, according to their roles, manage their personal space . clients also manage their personal 
spaces. They will have the opportunity to follow the realization of their projects in real time. They can even declare new tickets or validate those already resolved as they
can contact the managers of their projects.
<h1>Technologies</h1>
<h2>Backend Technologies:</h2>
<ul>
<li>Spring Boot</li>
<li>Java 17</li>
<li>JPA</li>
<li>REST API</li>
<li>SMTP protocol</li>
<li>WebSocket protocol</li>
<li>Spring Security (JWT)</li>
</ul>
<h2>Frontend Technologies:</h2>
<ul>
<li>Angular</li>
<li>Angular Material</li>
<li>Typescript</li>
<li>JPA</li>
<li>Bootstrap</li>
<li>CSS</li>
<li>HTML</li>
<li>Node 14.15.5</li>
</ul>

<h2>Database:</h2>
<ul>
<li>MySQL</li>
</ul>

<ul>to run app back in docker 
<li>1)go to ECM_PROJECT\ECM_backendO\ and run mvn compile jib:dockerBuild</li>
<li>2)go to dockercompose folder and run docker compose up </li></ul>


<ul>to run app front in docker 
<li>1)go to ECM_PROJECT\ECM_frontendO  and docker build -t ecm-front .</li>
<li>2)docker run -d -p 4200:80 app-front </li>
<li>go to http://localhost:4200/</li></ul>