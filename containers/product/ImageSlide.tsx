import Image from 'next/image';

interface ImageSlideProps {
    slideImages: string[];
    setImageActive: (index: number) => void;
    active: number;
}

const ImageSlide: React.FC<ImageSlideProps> = ({
    slideImages,
    setImageActive,
    active,
}) => {
    const isActive = (index: number) => {
        return index === active ? 'image-active' : '';
    };

    return (
        <div className="d-flex">
            {slideImages.map((img, index) => (
                <div
                    key={img}
                    className="position-relative mx-0 cursor-pointer"
                    style={{
                        height: '80px',
                        width: '20%',
                    }}
                    onClick={() => setImageActive(index)}
                >
                    <Image
                        src={img}
                        alt="Sub-image's product"
                        layout="fill"
                        className={`img-thumbnail rounded border-white-image object-fit-cover p-1 ${isActive(
                            index
                        )}`}
                        priority={false}
                    />
                </div>
            ))}
        </div>
    );
};

export default ImageSlide;
