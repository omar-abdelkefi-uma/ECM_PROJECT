<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org" xmlns="http://www.w3.org/1999/xhtml">
<head >
  <title>Bootstrap 4 CardImage</title>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
   <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>

   <style>
   .header img {
  float: left;
  width: 100px;
  height: 100px;
  background: #555;
}

.header p {
  position: relative;
  top: 18px;


}
   .header h3 {
  padding-top: 15px;
    padding-bottom: 0px;
    margin-bottom: 2px;
      margin-left: 37%;
  
}
.header span{
	 margin-left: 3%;
}
.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 5px;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

img {
  border-radius: 5px 5px 0 0;
}

.container {
  padding: 2px 16px;
}

</style>
  

</head>
<body>

				  <p align="center">
     					<img src='cid:myLogo'>
   				 </p>
		<div style="padding-left: 120px;padding-right: 120px">
	
				<div   style=" padding-left: 20px;background-color: #faefff;overflow: hidden;">

			<p align="center">hello omar abdelkefi</p>
			 <p align="center">
              	this email is to tell you there is a new client
            </p>
            <div >
				<div class="header">
					<img  style="border-radius: 50%;max-height: 80px;max-width: 80px;margin-left: 25%" th:src=${image} />
					<p><h3>My website name</h3>
					<span class="mb-3 text-muted">My website name</span></p>
				</div>
			</div>
			<br><br><br>
				<div style="padding-left: 80px;">
					<div class="card">
					  <img style="float: left; max-height: 250px;max-width: 250px" src="${image}" alt="Avatar" style="width:100%">
								<div style="margin-left: 20%;padding-top: 20px;padding-left: 20%">
							     <ul >
								    <li ><b>Cras justo odio</b><span style="padding-left: 50px">ddd</span></li>
								    <li ><b>Dapibus ac facilisis in</b></li>
								    <li ><b>Vestibulum at eros</b></li>
					 	 		</ul>
								</div>
					</div>
				</div>
	</div>

			</div>

</body>
</html>