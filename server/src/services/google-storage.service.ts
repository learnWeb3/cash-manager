import { Storage, GetSignedUrlConfig } from "@google-cloud/storage";
import { join } from "path";

export class GoogleStorage {
  public storage: Storage;

  constructor(projectId: string, clientEmail: string, privateKey: string) {
    this.storage = new Storage({
      projectId: projectId,
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
    });
  }

  async generateV4UploadSignedUrl(
    bucketName: string = "my-bucket",
    fileKey: string,
    fileName: string = "test.txt",
    expires: number = Date.now() + 15 * 60 * 1000,
    contentType: string = "image/jpg"
  ) {
    const options: GetSignedUrlConfig = {
      version: "v4",
      action: "write",
      expires,
      contentType,
    };

    // Get a v4 signed URL for uploading file
    return this.storage
      .bucket(bucketName)
      .file(join(fileKey, fileName))
      .getSignedUrl(options);
  }

  async generateV4DownloadSignedUrl(
    bucketName: string = "my-bucket",
    fileKey: string,
    fileName: string = "test.txt",
    expires: number = Date.now() + 15 * 60 * 1000
  ) {
    const options: GetSignedUrlConfig = {
      version: "v4",
      action: "read",
      expires,
    };

    // Get a v4 signed URL for downloading a file
    return this.storage
      .bucket(bucketName)
      .file(join(fileKey, fileName))
      .getSignedUrl(options);
  }
}
