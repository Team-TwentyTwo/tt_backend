import { asyncHandler } from '../middlewares/asyncHandler.js';

export const uploadImage = asyncHandler(async (req, res) => {
  // 파일이 잘 업로드되었는지 확인
  if (!req.file) {
    return res.status(400).json({ message: 'No File Uploaded' });
  }

  // 업로드된 파일의 URL 생성
  const imageURL = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

  // 리스폰스 반환
  res.status(200).json({
    imageURL: imageURL,
  });
});