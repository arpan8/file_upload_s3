const user = require('../../models').User;
const { success, error } = require('../../response/macros');
const upload = require('../../service/s3-bucket');
const getSignedURL = require('../../service/s3-url');
    module.exports = {
        create_user,
        emp_file_upload
    }

async function create_user(req, res) {
    try {

        const { name } = req.payload;

        let duplicate_user = await user.findOne({
            where: {
                name
            }
        });

        if (duplicate_user) {
            return success({}, 'User already exists')(res);
        }

        await user.create({
            name
        })

        return success({}, 'User created successfully')(res);
    } catch (err) {

        console.log(err);
        return error(err, 'Something went wrong')(res);
    }
}

async function emp_file_upload(request, res) {

    try {

    
        let fileName = request.payload.file.hapi.filename;

        let fileExtension = fileName.split('.').pop();

        const allowedExtensions = ["jpg", "jpeg", "png", "svg"];

        const shouldAcceptFileType = allowedExtensions.includes(fileExtension.toLowerCase());

        if (!shouldAcceptFileType) return error({}, `${fileExtension} files are not allowed`, 409)(h);

        let uploadResult = await upload(request.payload.file, fileName);

        console.log('upload result', uploadResult.Location)

        // let signedUrl = getSignedURL(uploadResult.Location, 8760);

        // console.log('signedUrl', signedUrl);


        return success({
            link: uploadResult.Location
        })(res);

    } catch (err) {
        console.log(err);
    }
}