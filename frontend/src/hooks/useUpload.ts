import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { uploadImage } from '../api';

export const useUpload = () => {
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onSuccess: (url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsUploading(true);
    try {
      const { url } = await uploadImage(file);
      onSuccess(url);
      toast.success('Image uploaded!');
    } catch (error) {
      toast.error('Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  return { isUploading, handleImageUpload };
};
