const AWS = require('aws-sdk');
const AmazonS3URI = require('amazon-s3-uri');

require('dotenv').config()

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});


function getSignedURL ( unsignedURL, hour = null ) {
    if ( unsignedURL === null || unsignedURL === "" || !unsignedURL ) {
        return unsignedURL;
    }
    let urlContains = unsignedURL.match(/amazonaws/gi);

    if ( !urlContains ) {
        return unsignedURL;
    }
    const { region, bucket, key } = AmazonS3URI( unsignedURL );
    if ( !bucket || !key || !region ) {
        return { error: "Invalid URI" };
    }
    const signedUrlExpireSeconds = hour === null ? ( 60*5 ) : ( hour*60*60 );
    return s3.getSignedUrl( 'getObject', {
        Bucket: bucket,
        Key: key,
        Expires: signedUrlExpireSeconds
    } )

}

module.exports = getSignedURL;