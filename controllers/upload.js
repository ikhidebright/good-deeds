export async function uploadFile (request, response, next) {
        try {
             return response
             .status(200)
             .send(request)
             } catch (error) {
                 console.log(error)
              next(error)
             }
         }