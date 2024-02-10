
<h1 style="color:blue;text-align:center;">dealerTrack</h1>

Thanks for visiting 👋 This is my full-stack dealership management web application that is capable of managing service, sales, and inventory. It is responsive, dynamic, and includes persistent database storage. This was designed using Domain Driven Design and a microservice infrastructure that can be deployed in a Docker container using the technologies listed below.

<br/>

## Tech Stack

**Frontend:**

<span>![image](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)</span>
<span>![image](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)</span>
<span>![image](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)</span>
<span>![image](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)</span>
<span>![image](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)</span>


**Backend:**

<span>![image](https://img.shields.io/badge/Python-14354C?style=for-the-badge&logo=python&logoColor=white)</span>
<span>![image](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)</span>

**Database:**

<span>![image](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)</span>

**Deployment**

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

<br/>

## Website Images

![alt text](README-images/Homepage.png)


<br/>
<br/>

![alt text](README-images/ServiceAppointments.png)

<br/>
<br/>

![alt text](README-images/ServiceHistory.png)

<br/>
<br/>



## Database Model Diagram

![alt text](README-images/dealerTRACK_ERD.png)
<br/>


## How to Setup the project locally

Clone the project

```bash
  git clone https://github.com/jkluse/dealertrack.git
```

Go to the project directory

```bash
  cd dealertrack
```

Install dependencies

```bash
  cd ghi/app
  npm install
```

Create a Volume, Build and Run the Docker Images

```bash
  cd <root project directory>
  docker volume create beta-data
  docker-compose build
  docker-compose up
```

On Browser:
```
go to http://localhost:3000/
1. Create a manufacturer
2. Create a model
3. Create an automobile
4. Create a technician
5. Create a salesperson
6. Create a customer
...then you can create a service appointment, a sale
...On Salesperson history, you can filter by salesperso
...On Service Appointments, you can filter by VIN, customer, or technician
```

## Author

- [John Kluse (Github profile) ](https://www.github.com/jkluse)
