import { useRef } from "react";
import { X, Upload } from "lucide-react";

const ProfilePicUpload = ({ value, onChange, size = 100 }) => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      onChange({ file, previewUrl });
    }
  };

  const handleRemove = () => {
    onChange(null);
    fileInputRef.current.value = null;
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="relative cursor-pointer"
        style={{ width: size, height: size }}
        onClick={!value ? handleClick : undefined}
      >
        {value ? (
          <>
            <img
              src={value.previewUrl}
              alt="Preview"
              className="w-full h-full object-cover rounded-full border border-border"
            />
            <button
              type="button"
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              onClick={handleRemove}
            >
              <X size={14} />
            </button>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted rounded-full border border-border">
            <Upload size={24} className="text-muted-foreground" />
          </div>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ProfilePicUpload;
