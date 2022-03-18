const aws = require('aws-sdk');
require('dotenv').config();

aws.config.update({
	secretAccessKey : process.env.AWS_ACCESS_KEY_ID,
	acessKeyId : process.env.AWS_SECRET_ACCESS_KEY,
	region:'us-east-1'
});

const bucketName = 'traqworx-files';

const s3 = new aws.S3({
    apiVersion: '2006-03-01',
    params: {Bucket: bucketName}
});


const options = {
	partSize:10*1024*1024,
	queueSize:1
};

async function upload(file,filename, folder=null, rawFileName=false){
	
	const params = {
		Bucket:bucketName,
		//Key:`${folder ? `${folder}/` : ''}${rawFileName ? `${filename}` : `${Date.now().toString()}-${filename}`}`,
		Key: `${process.env.PIC_LINK}/${filename}`,
		Body:file,
		ContentType: 'image/jpeg', 
        ACL:'public-read'
	};
	let fileResp = null;

	await s3.upload(params,options)
	.promise()
	.then((res)=>{
		console.log(res)
		fileResp = res;
	}).catch(err=>console.log(err))

	return fileResp;
}

module.exports = upload;
