import { PutObjectCommand } from '@aws-sdk/client-s3';
import r2Client from '../config/r2.js';
import { v4 as uuidv4 } from 'uuid';

export const uploadImage = async (req, res) => {
  try {
    console.log('req.file:', req.file)
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: 'No file uploaded' 
      });
    }

    const fileExtension = req.file.originalname.split('.').pop();
    const fileName = `products/${uuidv4()}.${fileExtension}`;

    const uploadCommand = new PutObjectCommand({
      Bucket: process.env.CLOUDFLARE_R2_BUCKET,
      Key: fileName,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    });

    await r2Client.send(uploadCommand);

    const imageUrl = `${process.env.CLOUDFLARE_R2_PUBLIC_URL}/${fileName}`;

    res.json({ success: true, url: imageUrl });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};