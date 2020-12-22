export async function uploadFile (request, response, next) {
        try {
          return response.json({'imageUrl': request.file.location});
             } catch (error) {
              next(error)
             }
         }