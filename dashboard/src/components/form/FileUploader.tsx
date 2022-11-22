import { useState } from 'react';

type SelectedFile = {file: File | null, base64: string};

const FileUploader = () => {
    const [selectedFile, setSelectedFile] = useState<SelectedFile>({file: null, base64: ""});

    async function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const retreiveFile = event.target.files![0];
        setSelectedFile({file: retreiveFile, base64: retreiveFile ? await getBase64(retreiveFile) : ""});
    }

    async function getBase64(file: File): Promise<string> {
        return await new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    }

    const fileData = () => {
        return selectedFile.file ? (
            <div>
                <h2>File Details:</h2> 
                <p>File Name: <small>{selectedFile.file?.name}</small></p>
                <p>File Type: <small>{selectedFile.file?.type}</small></p>
                <p>File Size: <small>{selectedFile.file?.size}</small></p>
                <br />
                <p>Base64: <small>{selectedFile.base64}</small></p>
            </div>
        ) : (
            <div>
                <br />
                <h4>Choose before Pressing the Upload button</h4>
            </div>
        );
    }

    return (
        <div>
            <input type="file" onChange={onFileChange} />
            <button>
                Upload!
            </button>
            { fileData() }
        </div>
)
}

export default FileUploader