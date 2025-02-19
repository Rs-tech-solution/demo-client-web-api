import aws from 'aws-sdk';
import fs from 'fs';
import { MediaS3Type } from '../Helpers/Types.js';
import { getOriginalFileName } from '../Helpers/Utility.js';

export enum defaultFolder {
  Misc = 'misc',
}

aws.config.update({
  secretAccessKey: process.env.S3_ACCESS_SECRET,
  accessKeyId: process.env.S3_ACCESS_KEY,
  region: process.env.S3_REGION,
});

const s3 = new aws.S3();

export const getMediaDetails = (key: string, lastModified: Date = null) => {
  return !key
    ? null
    : {
        originalName: getOriginalNameFromKey(key),
        name: getImageNameFromKey(key),
        key,
        url: getImageUrl(key),
        objectUrl: getImageObjectUrl(key),
        lastModified,
      };
};

export const getMediaUrl = (key: string) => {
  return !key ? null : getImageUrl(key);
};

export const getImageObjectUrl = (key: string) => {
  return `${process.env.S3_URL}/${process.env.S3_BUCKET}/${key}`;
};

export const getImageUrl = (key: string) => {
  return `${process.env.S3_IMAGE_HOST}/${key}`;
};

export const getImageNameFromKey = (key: string) => {
  return key.split('/').pop().trim();
};

export const getOriginalNameFromKey = (key: string) => {
  const name = key.split('/').pop().trim();

  return name ? getOriginalFileName(name) : '';
};

export const listMedia = async (folder: string) => {
  let isTruncated = true;

  const prefix = folder ? `${folder.toLocaleLowerCase()}/` : '';

  let params: aws.S3.ListObjectsV2Request = {
    Bucket: process.env.S3_BUCKET,
    MaxKeys: 1000,
    Prefix: prefix,
    StartAfter: prefix,
  };

  const mediaList: MediaS3Type[] = [];

  while (isTruncated) {
    const response = await s3.listObjectsV2(params).promise();

    response.Contents.forEach((content) => {
      const mediaDetails: MediaS3Type = getMediaDetails(
        content.Key,
        content.LastModified
      );

      mediaList.push(mediaDetails);
    });

    isTruncated = response.IsTruncated;

    if (isTruncated) {
      params.ContinuationToken = response.NextContinuationToken;
    }
  }

  // Sort by last Modified DESC.
  mediaList.sort((a, b) => b.lastModified.getTime() - a.lastModified.getTime());

  return mediaList;
};
