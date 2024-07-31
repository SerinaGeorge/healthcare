// Load environment variables from .env file
require('dotenv').config();
/**
 * Create an S3 bucket if it doesn't exist.
 * @param {string} bucketName - The name of the bucket.
 * @returns {Promise} - A promise that resolves when the bucket is confirmed to exist.
 */

const AWS = require('aws-sdk');

// Configure AWS SDK with environment variables
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});
const createBucketIfNotExists = async (bucketName) => {
  try {
    // Check if the bucket exists
    await s3.headBucket({ Bucket: bucketName }).promise();
    console.log(`Bucket "${bucketName}" already exists.`);
  } catch (err) {
    if (err.code === 'NotFound') {
      // Bucket does not exist, create it
      await s3.createBucket({ Bucket: bucketName }).promise();
      console.log(`Bucket "${bucketName}" created successfully.`);
    } else {
      console.error('Error checking bucket existence or creating bucket:', err);
      throw err;
    }
  }
};

/**
 * Upload JSON data to S3
 * @param {Object} data - JSON data to upload
 * @param {string} key - S3 key (file path)
 */
const uploadJsonToS3 = async (data, key) => {

    // Import AWS SDK


  const bucketName = process.env.S3_BUCKET_NAME;

  // Ensure the bucket exists
  await createBucketIfNotExists(bucketName);

  // Convert JSON data to string
  const jsonString = JSON.stringify(data);

  // S3 upload parameters
  const params = {
    Bucket: bucketName,
    Key: key,
    Body: jsonString,
    ContentType: 'application/json'
  };

  // Upload JSON to S3
  s3.putObject(params, (err, data) => {
    if (err) {
      console.error('Error uploading JSON file:', err);
    } else {
      console.log('Successfully uploaded JSON file:', data);
    }
  });
};

module.exports = { uploadJsonToS3 };

/* // Example usage
const jsonData = {
  key1: 'value1',
  key2: 'value2'
};

const keyName = 'folder-path/your-file.json'; // Desired path in S3

// Upload JSON to S3
uploadJsonToS3(jsonData, keyName); */
