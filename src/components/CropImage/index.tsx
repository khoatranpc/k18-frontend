import React, { useRef, useState } from 'react';
import { Button, Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Cropper, { ReactCropperElement } from "react-cropper";
import styles from '@/styles/CropImage.module.scss';

interface Props {
    src: string;
    getFile?: (file: Blob) => void;
    width?: number;
    height?: number;
    className?: string;
};
const CropImage = (props: Props) => {
    const [image, setImage] = useState(props.src ?? "");
    console.log(image);
    const cropperRef = useRef<ReactCropperElement>();
    const [imagePreview, setImagePreview] = useState<string>(props.src ?? "");
    const [acceptImage, setAcceptImage] = useState(true);
    const inputRef = useRef<HTMLInputElement>(null);

    const onChange = (e: any) => {
        e.preventDefault();

        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const maxSizeInBytes = 5 * 1024 * 1024;
        if (files[0]?.size > maxSizeInBytes) {
            alert('Kích thước file không được quá 5MB');
            return;
        }
        else if (!String(files[0]?.type).includes("image")) {
            alert('Chỉ chấp nhận các định dạng hình ảnh');
            return;
        } else {
            if (files[0]) {
                const reader = new FileReader();
                reader.onload = () => {
                    setImage(reader.result as any);
                };
                (reader as any).readAsDataURL(files[0]);
            }
        }
    };
    const getCropData = () => {
        if (typeof cropperRef.current?.cropper !== "undefined") {
            const getCanvas = cropperRef.current?.cropper.getCroppedCanvas();
            if (getCanvas) {
                setImage(getCanvas?.toDataURL("image/webp"));
                (getCanvas.toBlob((blob) => {
                    if (blob) {
                        props.getFile?.(blob);
                    }
                }, "image/webp", 0.95));
            }
        }
    };
    return (
        <div className={`${styles.cropImage} ${props.className ?? ''}`}>
            {(imagePreview) ?
                <Image className={styles.image} src={imagePreview ?? image} width={props.width ?? 200} height={props.height ?? 200} style={{ borderRadius: "50%" }} /> :
                (<div className={styles.cropping}>
                    <input style={{ display: "none" }} ref={inputRef} type="file" onChange={onChange} />
                    <Button icon={<UploadOutlined />} size="small" onClick={() => {
                        inputRef.current?.click();
                    }}>Chọn ảnh</Button>
                    <Cropper
                        width={100}
                        size={100}
                        ref={cropperRef as any}
                        style={{ height: 200 }}
                        zoomTo={0}
                        aspectRatio={1}
                        src={image as string}
                        viewMode={2}
                        minCropBoxHeight={5}
                        minCropBoxWidth={5}
                        cropBoxResizable={true}
                        background={false}
                        responsive={true}
                        autoCropArea={1}
                        checkOrientation={false}
                        guides={true}
                    />
                </div>)
            }
            {/* {(!acceptImage) && 
            } */}
            <Button className={styles.btnHandle} onClick={() => {
                getCropData();
                if (acceptImage) {
                    setImagePreview("");
                }
                setAcceptImage(!acceptImage);
            }}>{!acceptImage ? "Duyệt" : "Đổi"}</Button>
            <Button onClick={() => {
                setImagePreview(props.src as string);
                setAcceptImage(true);
            }}>Reset</Button>
        </div>
    )
}

export default CropImage;