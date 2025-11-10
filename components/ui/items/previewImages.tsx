import Image, { StaticImageData } from "next/image";

type PreviewImagesProp = {
  images: string[];
  setActiveImage: (index: number) => void;
  className: string;
};

export default function PreviewImages({
  images,
  setActiveImage,
  className,
}: PreviewImagesProp) {
  return (
    <div
      className={
        className +
        " opacity-100 group-hover:opacity-100 transition-all duration-300"
      }
    >
      <div className="flex flex-1 first:rounded-l-2xl last:rounded-r-2xl ">
        {images.map((src, index) => (
          <button
            className="border-2 border-border first:rounded-l-2xl last:rounded-r-2xl bg-text-subtle/10"
            key={index}
            onClick={() => setActiveImage(index)}
          >
            <Image
              src={src}
              alt={`thumbnail-${index}`}
              className="object-contain p-1 h-20 w-20"
              width={40}
              height={40}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
