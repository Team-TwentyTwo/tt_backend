import multer from 'multer';
import path from 'path';

// 이 미들웨어는 'multipart/form-data' 형식으로 제출된 파일을 처리하는 데 사용된다.
// Multer 설정
const storage = multer.diskStorage({
  // destination 함수는 업로드된 파일이 저장될 디렉토리를 지정한다.
  // req: 현재 요청 객체
  // file: 업로드된 파일 객체
  // cb: 콜백 함수. 첫 번째 인자로 오류를 두 번째 인자로 파일을 저장할 경로를 전달한다.
  destination: function (req, file, cb) {
    // 이미지를 저장할 경로. 'uploads/' 폴더에 파일이 저장된다.
    cb(null, 'uploads/');
  },
  // filename 함수는 저장될 파일의 이름을 결정한다.
  // file 객체에는 파일의 원본 이름과 확장자 등의 정보가 포함된다.
  filename: function (req, file, cb) {
    // 파일명을 현재 시간 + 확장자로 저장(예: 123456789.jpg)
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Multer 미들웨어를 export해서 라우터에서 사용할 수 있도록 함
// 'storage'는 파일을 서버에 저장하는 방법을 정의한다. 여기서는 'diskStorage'(파일이 디스크에 저장)
export const upload = multer({ storage: storage });