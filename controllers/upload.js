import { Files } from '../models/files'

export default class UploadController {
  static async uploadFile(request, response, next) {
    try {
      return response.status(200).send(request.file.location);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async uploadMultipleFile(request, response, next) {
    try {
      let files = request.files.map((item) => {
        return item.location
      })
      const fileData = {
        files: files,
        CreadtedBy: request.user._id
      }
      let filesToSave = new Files(fileData)
      await filesToSave.save()
      return response.status(200).send(filesToSave);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
