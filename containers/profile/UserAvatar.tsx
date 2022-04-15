import { ChangeEvent, useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import { FaCameraRetro } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { authCurrentUser } from 'store/authSlice';
import { useAppSelector } from 'store/hooks';

interface UserAvatarProps {
    setFieldValue: (field: string, value: File) => void;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ setFieldValue }) => {
    const currentUser = useAppSelector(authCurrentUser);
    const [changeInput, setChangeInput] = useState<boolean>(false);
    const [preview, setPreview] = useState<string>(currentUser?.avatar || '');

    const handlePreview = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file || !file.type.includes('image')) {
            toast.error('Please select an image!');
            return;
        }

        if (file.size > 1000000) {
            toast.error('Image file size must be less than 1MB!');
            return;
        }

        if (file) {
            setPreview(URL.createObjectURL(file));
            setFieldValue('avatarFie', file);
        }
    };

    useEffect(() => {
        currentUser?.avatar && setPreview(currentUser.avatar);
    }, [currentUser?.avatar]);

    useEffect(() => {
        return () => {
            preview && URL.revokeObjectURL(preview);
        };
    }, [preview]);

    return (
        <div
            className="d-flex justify-content-center my-3 position-relative"
            onMouseOver={() => setChangeInput(true)}
            onMouseLeave={() => setChangeInput(false)}
        >
            <Image
                src={preview}
                alt="avatar"
                roundedCircle
                width={148}
                height={148}
                className="border-white-image p-1 object-fit-cover"
            />
            {changeInput && (
                <>
                    <label
                        htmlFor="upload-photo"
                        className="postion-absolute text-center position-absolute bottom-0 cursor-pointer"
                        style={{
                            color: '#ff8c2d',
                            width: '148px',
                            background: 'hsla(0,0%,100%,.53)',
                        }}
                    >
                        <FaCameraRetro />
                        <p>Change</p>
                    </label>
                    <input
                        type="file"
                        id="upload-photo"
                        className="visually-hidden"
                        onChange={handlePreview}
                    />
                </>
            )}
        </div>
    );
};

export default UserAvatar;
