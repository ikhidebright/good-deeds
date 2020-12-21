import upload from '../middleware/uploader'

const singleUpload = upload.single('image');

export async function uploadFile (request, response, next) {
        try {
            singleUpload(request, response, function(err) {
                console.log(request)
              if (err) {
                return response.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}]});
              }
          
              return response.json({'imageUrl': request.file.location});
            });
             } catch (error) {
              next(error)
             }
         }