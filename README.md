<h1># nestjs-api</h1>
NestJS API scaffold 
clone this repository .
execute  'install npm ' then
all the required dependence will be installed.
create a database named 'orga_structure'
execute 'nest start'. 
access and test your api via swagger 
http://localhost:3000/api

<h1> Requirements </h1>
<h2> Build  web application(API) for registering organization's employee hierarchy or structure </h2>
<p style="text-align:justfy; color:blue">
Assume medium level organization management structure with different level of positions/roles
Hierarchy. At the top of the Hierarch there is CEO and every position below a given hierarchy will
answer/Report to the immediate position in the organization's position structure hierarchy
</p>
<ol>
<li> shall create employee position/role  </li>
<li>  Build RESTFull API using NestJS (version >= 9) , PostgreSQL or SQL Server database as data 
store</li>
<li> The position should be hierarchical there is a parent child relationship between the positions e.g. CEO can be root position no parent and CFO is a child of CEO </li>
<li>shall get and list the positions in a tree mode with unlimited n positions e.g. 
<pre>
 CEO
 ├── CTO
 │   └── Project Manager
 │       └── Product Owner
 │           ├── Tech Lead
 │           │   ├── Frontend Developer
 │           │   ├── Backend Developer
 │           │   ├── DevOps Engineer
 │           │   └── ..
 │           ├── QA Engineer
 │           ├── Scrum Master
 │           └── ...
 ├── CFO
 │   ├── Chef Accountant
 │   │   ├── Financial Analyst
 │   │   └── Account and Payable
 │   └── Internal Audit
 ├── COO
 │   ├── Product Manager
 │   ├── Operation Manager
 │   ├── Customer Relation
 │   └── ...
 └── HR
 </pre>
 </li>
 <li>Model (you can update this model if needed) 
 
<table class="table">
<tr>  <th>Column </th>  <th>Type </th></tr>
<tr> <td> id </td>  <td> GUID </td>  </tr>
<tr> <td> name </td>  <td> string </td>  </tr>
<tr> <td> description </td>  <td> string </td>  </tr>
<tr> <td> parentId </td>  <td> GUID </td>  </tr>
</table>	
<li>
  <pre>
a. Insert new employe position/role
    • Every position/role must contain minimum information like Name, Description and Managing 
      position/role to whom the position Report To etc.
b. Update previously saved position/role at any time
c. Get single position/role detail     
d. Get all position/role structure according to hierarchy (You can use table or tree)
e. Get all childrens of a specific position/role 
f. remove  position/role  at any time based on the heirarchy 
  </pre>  
  </li>
  <p>
  <h3> Note:</h3>
  <ul>
 <li> Every position/role will answer/Report to one position/role except CEO</li>
<li> The client wants to add or Update management structure at any time.</li>
<li>The development should consider separation of concern and maintainability.</li>
<li>The development should include Unit Test for the controller.</li>
<li>To test your API, use Postman or Swagger</li>
  </ul>
  </p>
  <p>
<h3>Reading Materials</h3>
<h4> Books</h4>
<ul>
 <li>Patterns, Principles and Practices of Domain Driven Design (Scott Millett Nick Tune)</li>
<li> Clean Architecture, A Craftsman’s Guide to Software Structure and Design, (Robert C Martin)</li>
<li>DDD Reference (Domain Driven Design Reference)</li>
<li>DDD Quickly (Domain Driven Design Quickly)</li>
  </ul>
  <h4> Links</h4>
<h4>For Backend</h4>
<ul>
  <li> <a href="https://docs.nestjs.com/"> Nest (NestJS) </a></li>
  <li> <a href="https://herbertograca.com/2017/11/16/explicit-architecture-01-ddd-hexagonal-onion-clean-cqrs-how-i-put-it-all-together/"> DDD, Hexagonal, Onion, Clean, CQRS, … How I put it all together </li>   </li>
<li> <a href="https://www.ibm.com/cloud/architecture/architectures/event-driven-cqrs-pattern/"> Command Query Responsibility Segregation (CQRS) pattern <a> </li>
<li><a href="https://www.ibm.com/cloud/architecture/architectures/event-driven-cqrs-pattern/"> What is the CQRS pattern? </a></li>
  </ul>
<h4>For Database<h4>
  <ul>
    <li><a href="https://www.postgresql.org/docs/9.6/postgres-fdw.html">  PostgreSQL Documentation </a></li>    
    <li> <a href="https://docs.microsoft.com/en-us/sql/sql-server/?view=sql-server-ver16"> SQL Server </a>   </li>
    </ul>
</p>
</ol>
