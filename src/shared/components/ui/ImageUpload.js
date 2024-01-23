import React, { useRef, useState, useEffect } from 'react'

const ImageUpload = props => {
    const filePickerRef = useRef();
    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        if (!file) {
            return;
        }
        else {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                setPreviewUrl(fileReader.result);
            }
            fileReader.readAsDataURL(file);
        }
    }, [file])


    const pickedhandeler = event => {
        console.log(event.target);
        let pickedFile;
        let fileIsValid = isValid;
        if (event.target.files || event.target.files.length === 1) {
            pickedFile = event.target.files[0];
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid = true;
        }
        else {
            setIsValid(false);
            fileIsValid = false;
        }

        props.onInput(props.id, pickedFile, fileIsValid);
    }

    const pickImageHandeler = () => {
        filePickerRef.current.click();
    }

    return (
        <div className='flex flex-col items-center'>
            <input type="file"
                id="props.id"
                ref={filePickerRef}
                onChange={pickedhandeler}
                className='hidden'
                accept='.jpg, .png, .jpeg'
            />
            <div className='flex flex-col items-center'>
                <div className='h-40 w-40 border border-4 rounded-md border-indigo-700 mb-5'>
                    {previewUrl && <img className="h-full w-full overflow-hidden" src={previewUrl} alt="preview" />}
                    {!previewUrl && <p>Please picke a image</p>}
                </div>
                <button className='btn-red' type="button" onClick={pickImageHandeler}>Pick Image</button>
            </div>
            {!isValid && <p>{props.errorText}</p>}
        </div>
    )
}

export default ImageUpload