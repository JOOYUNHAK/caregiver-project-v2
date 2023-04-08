## 프로필에 관한 실제 화면과 다음과 같은 요구사항이 있었어요.

### 목차
1. [프로필 목록](#목록)
2. [프로필 상세 조회](#상세-조회)
3. [프로필 필터](#필터)
4. [프로필 비공개](#비공개)
5. [프로필 찜](#찜)

### 목록
- **무한 스크롤**이 되면서 추가 데이터 조회가 가능해요.
- 추가 데이터 조회 시 데이터가 없으면 이후에는 **조회하지 않아요**.
- 위로 올려 **새로고침**을 수행해요.
<p>
<img src= "https://user-images.githubusercontent.com/99117410/230641157-2f5474e0-36b5-4b58-83ae-bfdf1d0b3d00.png" width = "240" height = "500">
</p>

### 상세 조회
- 해당 간병인이 **작성했던 내역**을 폼에 맞춰 제공해요.
- 해당 페이지에서 원하면 **찜,간병 신청**이 가능해요.
<p>
<img src= "https://user-images.githubusercontent.com/99117410/230642062-f018c986-bd11-4f84-b8e5-e96de38c1fc6.png" width = "240" height = "500">
<img src= "https://user-images.githubusercontent.com/99117410/230642076-312d6c3a-6ad9-4c55-a62d-cf9a1bc5f72c.png" width = "240" height = "500">
</p>

### 필터
- 찜 많은 순, 일당 낮은 순, 시작일 빠른 순만 **정렬**을 제공해요.(후기 많은 순, 별점 높은 순은 아직 구현이 되지 않았습니다.)
- 일당, 시작 가능 일 **범위 필터**를 제공해요.
- 성별, 연령, 지역, 자격증등 **기타 필터**를 추가 제공해요.  
- 각 필터들은 **각각 조합**이 가능해요.
- 메인 필터와 기타 필터 각각 **초기화**가 가능해요.(메인 필터 전체만, 기타 필터 전체만)

<p>
<img src= "https://user-images.githubusercontent.com/99117410/230640935-77414a74-941d-4cf1-8497-9bc764bd7b74.png" width = "240" height = "500">
<img src= "https://user-images.githubusercontent.com/99117410/230639331-1d257c1d-ae68-4cbc-9fc4-b7c479d074cb.png" width = "240" height = "500">
<img src= "https://user-images.githubusercontent.com/99117410/230639340-78c59d2b-3c13-409d-8915-7c267c69ea2b.png" width = "240" height = "500">
<br>
<img src= "https://user-images.githubusercontent.com/99117410/230639347-c93c7500-43d7-4e84-9e9c-389a73a7dab2.png" width = "240" height = "500">
<img src= "https://user-images.githubusercontent.com/99117410/230641487-47adb7f2-994b-4ea0-a1b8-7bee661e6cc3.png" width = "240" height = "500">
</p>

### 비공개
- 간병인은 언제든 **프로필 노출 ON/OFF가** 가능해요.
- OFF 상태면 프로필 목록에 노출되지 않아요.  
- 변경이 있을 당시 새로고침을 안한 사용자가 조회하면 **안내문**을 표시해요.    

<p >
<img src= "https://user-images.githubusercontent.com/99117410/230642652-5a7928c5-f33b-487c-a3ef-2e9119ea088c.png" width = "235" height = "500">
<img src= "https://user-images.githubusercontent.com/99117410/230642665-51082c62-92e7-4af7-bb93-16280425bd41.png" width = "235" height = "500">
<img src= "https://user-images.githubusercontent.com/99117410/230642672-2c630645-541f-4702-a867-6968dfc82aec.png" width = "235" height = "500">
</p>

### 찜
- 원하는 간병인은 찜 이후 **찜** 목록에서 확인 가능해요.
- 보호자들에게 **찜 많은 순** 필터를 제공하므로 **간병인 데이터**는 포함하지 않아야 해요.
- 그래서 간병인이 누를 시 안내문을 표시해요.

<p >
<img src= "https://user-images.githubusercontent.com/99117410/230643706-45a4adad-da1c-4836-a909-9632bd3c32d2.png" width = "235" height = "500">
<img src= "https://user-images.githubusercontent.com/99117410/230643727-5ca20e99-88ac-4fed-a2b7-e35266a16cff.png" width = "235" height = "500">
<img src= "https://user-images.githubusercontent.com/99117410/230643799-789a1a23-d548-4280-81a5-9c9a031b9ef6.jpg" width = "235" height = "500">
</p>