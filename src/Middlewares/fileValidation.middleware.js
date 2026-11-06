
import { fileTypeFromFile } from 'file-type';
import path from 'node:path';
import fs from 'node:fs/promises';
import { BadRequestException } from '../Common/Utils/Errors/exception.js';
import { allowedExtentions } from '../Common/constants.js';

export const fileValidation = async (req, res, next) => {
    try {
        if (!req.file) {
            throw new BadRequestException('File is required');
        }

        // 1. Detect actual file type using Magic Number
        const result = await fileTypeFromFile(req.file.path);

       // console.log( result);

        // 2. Get original file extension
        const originalExtension = path
            .extname(req.file.originalname)
            .slice(1)
            .toLowerCase();

        // 3. Get detected extension
        const detectedExtension = result?.ext?.toLowerCase();

        // JPEG alias normalization
        const normalizeExtension = (ext) =>
            ext === 'jpeg' ? 'jpg' : ext;

        const allowedExtensions = Object.values(allowedExtentions)
            .flat()
            .map(normalizeExtension);

        const isAllowed = allowedExtensions.includes(
            normalizeExtension(detectedExtension)
        );

        // 4. Compare actual extension with original extension
        const isMatching = normalizeExtension(originalExtension) ===normalizeExtension(detectedExtension);

        if (!result || !isAllowed || !isMatching) {
            //delete file from storage
            await fs.unlink(req.file.path).catch(() => {});
            //throw error invalid file type
            throw new BadRequestException( 'Invalid file type or extension mismatch');
        }

        // File is valid
        next();

    } catch (error) {
        next(error);
    }
};
