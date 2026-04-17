EduTrack Spring Boot + MySQL Backend

Open in Eclipse:
1. Open Eclipse
2. File > Import
3. Maven > Existing Maven Projects
4. Select this edutrack-springboot-backend folder
5. Finish

Before running:
1. Open MySQL Workbench / XAMPP MySQL / command line MySQL
2. Create database: edutrack
3. Open src/main/resources/application.properties
4. Change spring.datasource.password=YOUR_MYSQL_PASSWORD to your MySQL password
5. If your MySQL username is not root, change spring.datasource.username also

Run:
1. In Eclipse, open src/main/java/com/edutrack/EduTrackApplication.java
2. Right click file
3. Run As > Java Application or Spring Boot App

Test:
Open browser: http://localhost:8080/api/healthz
Expected: {"status":"ok"}

Demo logins:
Admin: admin / admin123
Student: student / pass123
