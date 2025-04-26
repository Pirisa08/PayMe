# PayMe
ชื่อ - นามสกุล (Full Name): Pirisa Kitichai<br>
รหัสนักศึกษา (Student ID): 6631503031 <br>
ชื่อแอป (App Name):PayMe <br>
Framework ที่ใช้ (Framework Used): React Native <br>
ลิงก์ GitHub Repository: [ใส่ลิงก์ที่นี่ | Insert link here] <br>
ลิงก์ไฟล์ติดตั้ง (APK/IPA): [(https://expo.dev/accounts/pirisa/projects/PayMe/builds/ae335c1c-6d29-4229-a156-6ad59fbbc625)] <br>

1. การออกแบบแอป | App Concept and Design (2 คะแนน / 2 pts)
1.1 ผู้ใช้งานเป้าหมาย | User Personas

Persona 1:  
- ชื่อ: Nut  
- อายุ:  20 years 
- อาชีพ: 2nd-year university student    
- ความต้องการ:  Wants to manage expenses such as utility bills (water, electricity) and requires a notification system for payment statuses.

Persona 2:  
- ชื่อ: Fah  
- อายุ:  20 years 
- อาชีพ: 2nd-year university student   
- ความต้องการ:  Wants to track various bill payments and check payment statuses for financial planning.




1.2 เป้าหมายของแอป | App Goals
ตัวอย่าง (Example):
Help users manage and track various bills (e.g., water, electricity, service charges).
- Provide a system to display bill payment status as "Paid" or "Pending."
- Display bill details such as bill name, amount, due date.



1.3 โครงร่างหน้าจอ / Mockup
![Image](https://github.com/user-attachments/assets/e530cf2e-cc41-4fbf-b2ce-7fbbe4e4f7c9)

![Image](https://github.com/user-attachments/assets/316be5ab-cc56-416b-b6e7-c45fc30b976f)

![Image](https://github.com/user-attachments/assets/05990bbc-06a9-4e7a-bad9-990313897cdb)

![Image](https://github.com/user-attachments/assets/cda9bd02-8a83-412d-b72a-299a5507d20a)



1.4 การไหลของผู้ใช้งาน | User Flow
Open App → Bill List → Choose Bill to see the deatail → add person → Payment History 

2. การพัฒนาแอป | App Implementation (4 คะแนน / 4 pts)
2.1 รายละเอียดการพัฒนา | Development Details
เครื่องมือที่ใช้ / Tools used:
- React Native
- Redux
- React Navigation

2.2 ฟังก์ชันที่พัฒนา | Features Implemented
Checklist:
- [x] Display all bills  
- [x] Display payment status of bills (Paid / Pending / Unpaid)  
- [x] Display payment history details  

2.3 ภาพหน้าจอแอป | App Screenshots
แนบภาพหรือ URL (Attach images or image links):
- ![Home]![Image](https://github.com/user-attachments/assets/e530cf2e-cc41-4fbf-b2ce-7fbbe4e4f7c9)
- ![Checklist]![Image](https://github.com/user-attachments/assets/316be5ab-cc56-416b-b6e7-c45fc30b976f)
- ![Add Person]![Image](https://github.com/user-attachments/assets/05990bbc-06a9-4e7a-bad9-990313897cdb)
- ![History]![Image](https://github.com/user-attachments/assets/cda9bd02-8a83-412d-b72a-299a5507d20a)

3. การ Build และติดตั้งแอป | Deployment (2 คะแนน / 2 pts)
3.1 ประเภท Build | Build Type
[x] Debug
3.2 แพลตฟอร์มที่ทดสอบ | Platform Tested
[x] Android
3.3 ไฟล์ README และวิธีติดตั้ง | README & Install Guide
แนบไฟล์หรือคำอธิบายการติดตั้งแอป | Insert steps
Download the `.apk` file.
2. Open it on an Android device.
3. Install via File Manager.

4. การสะท้อนผลลัพธ์ | Reflection (2 คะแนน / 2 pts)
ตัวอย่างหัวข้อ | Suggested points:
- Learned how to use `FlatList` to display data from dummy data sources.  
- If more time was available, I would have added a feature to store bill information in Firebase and dynamically display statuses based on the database.



5. การใช้ AI ช่วยพัฒนา | AI Assisted Development (Bonus / ใช้ประกอบการพิจารณา)
5.1 ใช้ AI ช่วยคิดไอเดีย | Idea Generation
Prompt ที่ใช้:  
"ช่วยคิดหน่อยได้ไหมสร้างแอพเกี่ยวกับแจ้งเตือนการจ่ายเงินของตัวเราและเพื่อน."
"ช่วยช่วยสร้างโครงสร้างได้ไหม"

ผลลัพธ์:  
- ได้ไอเดียแอปจัดการการเงินของตัวเราเองและเพื่อนให้มีประสิทธิภาพ
- ได้โครงสร้างโปรเจกต์ React Native (Expo)โดยใช้ React Navigation แบบ Stack Navigator และแยก Component/Screen


y5.2 ใช้ AI ช่วยออกแบบ UI | UI Layout Prompt
Prompt ที่ใช้:  
"Design a simple layout for a bill tracking app in React Native"
"ช่วยเพิ่มฟังชั่นลูกเล่นในหน้าchecklistได้ไหมสามารถว่า Paid pending อะไรประมาณนั้นได้ไหม"
ผลลัพธ์:  
- ได้ code structure สำหรับการสร้างหน้าจอแสดงรายการบิลและรายละเอียดของแต่ละบิล
- เพื่อแสดงสถานะของบิลว่าเป็น Paid หรือ Pending ได้ โดยการใช้สเตตัสของบิลเพื่อจัดการแสดงผลได้ง่ายขึ้น
5.3 ใช้ AI ช่วยเขียนโค้ด | Code Writing Prompt
Prompt ที่ใช้:  
"React Native code to create a flatlist for displaying bills"

ผลลัพธ์:  
ได้โค้ดที่ใช้ FlatList ในการแสดงรายการบิลจากข้อมูล dummy และการจัดการกับสถานะของแต่ละบิล


5.4 ใช้ AI ช่วย debug | Debug Prompt
Prompt ที่ใช้:  
"How to build React Native app and generate ADB for Android?"
"How to ติดตั้งแอนดรอยสตู"

ผลลัพธ์:  
- คำแนะนำในการใช้คำสั่ง react-native run-android เพื่อ build และ generate ADB สำหรับการทดสอบ
- วิธีแก้ไข และบอกวิธีการติดตั้งAndrid Studio

5.5 ใช้ AI ช่วย Deploy | Deployment Prompt
Prompt ที่ใช้:  
"How to build React Native app and generate APK for Android?"
"ขอวิธีการดีพอยขึ้นgoogle paystore"
ผลลัพธ์:  
- คำแนะนำในการใช้คำสั่ง react-native run-android เพื่อ build และ generate APK สำหรับการทดสอบ
- บอกวิธีการติดตั้งมาเป็นขั้นตอน




