import uploadFileToBucket from './aws_s3_client_module.js';
import makeRequest from './requests.js';

const BASE_LINODE_URL_SUFFIX = '.linodeobjects.com';
const BASE_LINODE_OBJECT_URL = 'https://api.linode.com/v4/object-storage/buckets/';

/**
 * Linode Helper Module to upload a file to object storage. The file is uploaded using
 * AWS S3 Client. Please refer to https://docs.aws.amazon.com/sdk-for-javascript/index.html for more details.
 *
 * @param accessKeyId bucket specific unique identifier required for authentication
 * @param secretAccessKey user specific unique identifier required for authentication
 * @param region indicates the geographical server location (e.g us-east-1, eu-west-1a)
 * @param file complete path of the file to be uploaded is passed on as a parameter
 * @param bucket uniquely identifies the bucket where the file should be uploaded
 * @returns {Promise<void>}
 */
async function uploadFileToLinodeBucket (accessKeyId, secretAccessKey, region, file, bucket) {

    await uploadFileToBucket(accessKeyId,
        secretAccessKey, region, file, bucket, BASE_LINODE_URL_SUFFIX);

}

/**
 * Linode Helper module Creates a pre-signed URL to access a single Object in a bucket.
 * This can be used to share objects, and also to create/delete objects by using the appropriate
 * HTTP method in your request body’s method parameter. This module uses
 * Linode Object URL Create API to generate public URLs.
 *
 * Please refer to https://www.linode.com/docs/api/object-storage/#object-storage-object-url-create for more details.
 *
 * @param accessToken Linode API Key.
 * @param clusterId indicates the geographical server location (e.g us-east-1, eu-west-1a)
 * @param bucketName Exact Name of the bucket the file resides in
 * @param objectName Exact Name of the the file
 * @returns {Promise<*>} File URL using which the file can be downloaded.
 */
async function fetchObjectUrl (accessToken, clusterId, bucketName, objectName) {
    const body = {
      'method': 'GET',
      'name': objectName
    };
    const response = await makeRequest(
        accessToken,
        'POST',
        `${BASE_LINODE_OBJECT_URL}/${clusterId}/${bucketName}/object-url`,
        body
    );
    console.log("Object Url received : " + JSON.stringify(response));
    return response;
}

export default {
  uploadFileToLinodeBucket,
  fetchObjectUrl
};